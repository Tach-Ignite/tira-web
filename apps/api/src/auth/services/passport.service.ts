import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import ms from 'ms';
import * as bcrypt from 'bcryptjs';
import { EmailService } from '@src/email/email.service';
import { PrismaService } from '@prisma_/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from '../dto/signup.dto';
import { TokenPayload } from '../token-payload.interface';
import { AuthDto } from '../dto/auth.dto';
import { SignupResponse } from './interface';
import { AbstractApiResponse } from '../../utils/general-response';
import { UsersService } from '../../users/users.service';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { ChangePassWordType } from '../change-password-type';

@Injectable()
export class PassportService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  async sendVerificationEmail(userId: string, email: string) {
    const tokenPayload: TokenPayload = {
      userId: userId,
      email: email,
    };

    const confirmationToken = this.jwtService.sign(tokenPayload, {
      expiresIn: '1d',
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
    });

    await this.emailService.sendEmail({
      from: this.configService.getOrThrow('EMAIL_SOURCE'),
      to: email,
      subject: '[Action Required] Welcome to Tach Color Store!',
      body: `Please verify your email address by clicking this link: <a href="${this.configService.getOrThrow('APP_URL')}/auth/signup?token=${confirmationToken}" target="_blank">Verify Email</a>`,
    });
  }

  async sendForgotPasswordEmail(userId: string, email: string) {
    const tokenPayload: TokenPayload = {
      userId: userId,
      email: email,
    };

    const user = await this.prisma.users?.findUnique({ where: { userId } });

    const resetPasswordToken = this.jwtService.sign(tokenPayload, {
      expiresIn: '1d',
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
    });

    await this.emailService.sendEmail({
      from: this.configService.getOrThrow('EMAIL_SOURCE'),
      to: email,
      subject: 'Password Reset Request',
      body: `Dear ${user?.email}, We received a request to reset your password. Click the link below to reset your password. If you did not request this, please contact support immediately. <a href="${this.configService.getOrThrow('APP_URL')}/auth/reset-password?token=${resetPasswordToken}&userId=${userId}" target="_blank">Verify Email</a>`,
    });
  }

  async login(
    payload: AuthDto,
  ): Promise<{ token: string; expires?: Date; user: UserEntity }> {
    const user = await this.verifyUser(payload);
    const expiration = this.configService.getOrThrow<string>('JWT_EXPIRATION');
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(this.configService.getOrThrow<string>('JWT_EXPIRATION')),
    );

    const tokenPayload: TokenPayload = {
      userId: user.userId,
      email: user.email,
    };
    const token = this.jwtService.sign(tokenPayload, {
      expiresIn: expiration,
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
    });

    return { token, expires, user };
  }
  async signup(dto: SignUpDto): Promise<SignupResponse> {
    const { email, password } = dto;
    const hash = await this.hashData(password);
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user)
      throw new HttpException('Email Already Exist', HttpStatus.BAD_REQUEST);
    const role = await this.prisma.userRoles.upsert({
      where: { name: 'customer' },
      create: { name: 'customer' },
      update: { name: 'customer' },
      select: { name: true, id: true },
    });
    const newUser = await this.usersService.createUser({
      email,
      hash,
      roleId: role.id,
    });
    await this.sendVerificationEmail(newUser.userId, newUser.email);

    return {
      success: true,
      data: {
        email: newUser.email,
      },
    };
  }

  async resendEmail(userId: string, email: string) {
    await this.sendVerificationEmail(userId, email);
    return AbstractApiResponse.success({}, 'Email Send Successfully');
  }

  async forgotPassword(userId: string, email: string) {
    await this.sendForgotPasswordEmail(userId, email);
    return AbstractApiResponse.success(
      {},
      'Password Reset Email Send Successfully',
    );
  }

  async resetPassword(userId: string, password: string) {
    await this.prisma.users.update({
      where: { userId },
      data: {
        hash: this.hashData(password),
      },
    });
    return AbstractApiResponse.success({}, 'Password Reset Successfully');
  }

  async changePassword(changePasswordDto: ChangePassWordType) {
    const { userId, newPassword, currentPassword } = changePasswordDto;

    const currentUser = await this.prisma.users.findUnique({
      where: { userId },
    });

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      currentUser?.hash || '',
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'The current password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (currentPassword === newPassword) {
      throw new HttpException(
        'Previous password is similar to new password',
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      await this.prisma.users.update({
        where: { userId },
        data: {
          hash: this.hashData(newPassword),
        },
      });
      return AbstractApiResponse.success(
        {},
        'Your password has been successfully changed.',
      );
    }
  }

  async removeUser(userId: string) {
    try {
      const user = await this.prisma.users.findFirstOrThrow({
        where: { userId: userId },
      });
      await this.usersService.deleteUser(user.userId);
      return AbstractApiResponse.success(
        {},
        'User has been deleted successfully',
      );
    } catch (e) {
      throw new HttpException(
        AbstractApiResponse.failure(
          e,
          'User deletion failed',
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.users.findFirstOrThrow({
        where: { userId: userId },
      });
      const updatedUser = await this.usersService.update(
        user.userId,
        updateUserDto,
        false,
      );
      return AbstractApiResponse.success(
        new UserEntity(updatedUser),
        'User has been updated successfully',
      );
    } catch (e) {
      throw new HttpException(
        AbstractApiResponse.failure(
          e,
          'User updating failed',
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyUser(payload: AuthDto) {
    const user = await this.usersService.getUser({ email: payload.email });

    const authenticated = await bcrypt.compare(payload.password, user.hash);
    if (!authenticated) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    if (!user.emailVerifiedAt) {
      throw new HttpException(
        'User is not confirmed yet. Please Check Email for confirmation',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
