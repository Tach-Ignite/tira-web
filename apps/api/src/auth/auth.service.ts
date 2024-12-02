import { Response } from 'express';
import ms from 'ms';
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerService } from '@common/logger/logger.service';
import { UserEntity } from '@src/users/entities/user.entity';
import { AdminNotificationEnum } from '@prisma/client';
import { PrismaService } from '@prisma_/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateAdminNotificationEvent } from '@src/admin-notifications/events/create-admin-notification.event';
import { SignUpDto } from './dto/signup.dto';
import { CognitoService } from './services/cognito.service';
import { AuthDto } from './dto/auth.dto';
import { PassportService } from './services/passport.service';
import { AbstractApiResponse } from '../utils/general-response';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ChangePassWordType } from './change-password-type';
import { EmailService } from '@src/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';
import { Roles } from '@src/utils/roles.enums';
import { UsersService } from '@src/users/users.service';
import { UserType } from '@src/utils/userType.enum';

@Injectable()
export class AuthService {
  private service: PassportService | CognitoService;
  constructor(
    @Optional() private cognitoService: CognitoService,
    @Optional() private passportService: PassportService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
    private readonly prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private readonly emailService: EmailService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    config.getOrThrow('AUTH_PROVIDER') === 'cognito'
      ? (this.service = cognitoService)
      : (this.service = passportService);
  }

  async createOAuthSession(user: UserEntity, res: Response) {
    const expiration = this.config.getOrThrow<string>('JWT_EXPIRATION');
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(this.config.getOrThrow<string>('JWT_EXPIRATION')),
    );

    const tokenPayload: TokenPayload = {
      userId: user.userId,
      email: user.email,
    };
    const token = this.jwtService.sign(tokenPayload, {
      expiresIn: expiration,
      secret: this.config.getOrThrow<string>('JWT_SECRET'),
    });
    const baseUrl = this.config.getOrThrow('APP_URL');

    const userProfile = await this.prisma.userProfiles.findFirst({
      where: { userId: user?.userId },
      include: { user: true },
    });

    const redirectUrl = userProfile?.onboardingCompleted
      ? '/announcement'
      : '/onboarding';

    const redirecturl =
      user?.role?.name === Roles.SUPER_ADMIN
        ? '/tach-color-shop/admin-console'
        : redirectUrl;

    res.redirect(
      `${baseUrl}/tach-color-shop/auth/oauth/callback?token=${token}&user=${JSON.stringify(user)}&redirect=${redirecturl}`,
    );
  }

  async login(userDto: AuthDto, response: Response) {
    const { token, expires, user } = await this.service.login(userDto);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires,
    });

    return {
      status: 'success',
      data: new UserEntity(user),
    };
  }

  async signUp(dto: SignUpDto) {
    try {
      const res = await this.service.signup(dto);
      this.logger.log(`New User created ${res?.data?.email}`);
      const signUpEvent = new CreateAdminNotificationEvent();
      signUpEvent.message = `New User Registered: ${res?.data?.email}`;
      signUpEvent.type = AdminNotificationEnum.UserSignUp;
      signUpEvent.data = res.data || {};
      this.eventEmitter.emit(
        'adminNotification.create',
        signUpEvent, // Remove the argument from the constructor call
      );
      return AbstractApiResponse.created(
        { email: res?.data?.email },
        `user ${res?.data?.email} created successfully`,
      );
    } catch (error) {
      return AbstractApiResponse.failure(
        error,
        error?.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async removeUser(userId: string) {
    return this.service.removeUser(userId);
  }

  async resendEmail(email: string) {
    const user = await this.prisma.users.findFirst({
      where: { email: email },
    });
    if (!user) {
      return {};
    }
    return this.service.resendEmail(user.userId, email);
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.users.findFirst({
      where: { email: email },
    });
    if (!user) {
      return {};
    }
    if (user?.userType !== this.config.getOrThrow('AUTH_PROVIDER')) {
      throw new NotFoundException(
        'Password update is not allowed with an external provider (e.g., Google, GitHub). Please use your external provider to manage your password.',
      );
    }
    return this.service.forgotPassword(user.userId, email);
  }

  async resetPassword(userId: string, password: string, token: string) {
    const user = await this.prisma.users.findFirst({
      where: { userId },
    });
    if (!user) {
      return {};
    }
    if (user?.userType !== UserType.LOCAL) {
      throw new NotFoundException(
        'Password update is not allowed with an external provider (e.g., Google, GitHub). Please use your external provider to manage your password.',
      );
    }
    try {
      const res = await this.service.resetPassword(userId, password, token);
      const resetEvent = new CreateAdminNotificationEvent();
      resetEvent.message = `Password Reset: ${user?.email}`;
      resetEvent.type = AdminNotificationEnum.PasswordReset;
      resetEvent.data = {
        ...user,
        createdAt: user?.createdAt?.toString(),
        updatedAt: user?.updatedAt?.toString(),
        emailVerifiedAt: user?.emailVerifiedAt?.toString(),
      };
      this.eventEmitter.emit('adminNotification.create', resetEvent);
      return res;
    } catch (error) {
      return AbstractApiResponse.failure(
        error,
        error?.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changePassword(dto: ChangePassWordType) {
    const { userId } = dto;
    const user = await this.prisma.users.findFirst({
      where: { userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ${userId} does not exist.`);
    }
    if (user?.userType !== UserType.LOCAL) {
      throw new NotFoundException(
        'Password update is not allowed with an external provider (e.g., Google, GitHub). Please use your external provider to manage your password.',
      );
    }
    const response = await this.service.changePassword(dto);
    if (response?.statusCode === 200) {
      await this.emailService.sendEmail({
        from: this.config.getOrThrow('EMAIL_SOURCE'),
        to: user?.email,
        subject: 'Password Changed Successfully',
        body: `Dear ${user?.email}, Your password was successfully changed on ${new Date().toLocaleString()}. If you did not authorize this change, please contact support immediately.`,
      });

      const passwordChangeEvent = new CreateAdminNotificationEvent();
      passwordChangeEvent.message = `Password Changed: ${user?.email}`;
      passwordChangeEvent.type = AdminNotificationEnum.PasswordChanged;
      passwordChangeEvent.data = {
        ...user,
        createdAt: user?.createdAt?.toString(),
        updatedAt: user?.updatedAt?.toString(),
        emailVerifiedAt: user?.emailVerifiedAt?.toString(),
      };
      this.eventEmitter.emit('adminNotification.create', passwordChangeEvent);
    }
    return response;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.service.updateUser(userId, updateUserDto);
  }

  async OAuthLogin(req: any, res: Response) {
    const user = req.user;
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const localUser = await this.prisma.users.findUnique({
      where: {
        email: user.email,
      },
      include: {
        role: true,
        userProfile: true,
      },
    });
    const baseUrl = this.config.getOrThrow('APP_URL');

    if (localUser) {
      if (localUser.userStatus === 'DeActive') {
        if (!user) {
          throw new ForbiddenException('User is not in  active status');
        }
      }
      if (localUser.userType !== user.provider) {
        res.redirect(`${baseUrl}/tach-color-shop/auth/login?error=forbidden`);
        throw new ForbiddenException(
          'User Already Logged In Using different Auth method ',
        );
      }
      return await this.createOAuthSession(new UserEntity(localUser), res);
    } else {
      const role = await this.prisma.userRoles.upsert({
        where: { name: 'user' },
        create: { name: 'user' },
        update: { name: 'user' },
        select: { name: true, id: true },
      });
      const newUser = await this.userService.createUser({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.provider,
        roleId: role.id,
        sub: user.id,
        name: user.firstName + user.lastName,
      });
      return await this.createOAuthSession(new UserEntity(newUser), res);
    }
  }

  async getAllUsersByRole(role: string) {
    const users = await this.prisma.users.findMany({
      where: { role: { name: role } },
    });
    if (!users?.length) {
      throw new NotFoundException('Cannot found any admins');
    }
    return users;
  }
}
