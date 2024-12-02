import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  ISignUpResult,
} from 'amazon-cognito-identity-js';
import {
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminUserGlobalSignOutCommand,
  ResendConfirmationCodeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ChangePasswordCommand,
  AdminInitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { AuthDto } from '../dto/auth.dto';
import { SignUpDto } from '../dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { SignupResponse } from './interface';
import { PrismaService } from '@prisma_/prisma.service';
import { UsersService } from '../../users/users.service';
import { AbstractApiResponse } from '../../utils/general-response';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { ChangePassWordType } from '../change-password-type';
import { InviteType, InviteStatus } from '@src/utils/invites.enum';
import { differenceInDays } from 'date-fns';

@Injectable()
export class CognitoService {
  private userPool: CognitoUserPool;
  private cognitoClient: CognitoIdentityProviderClient;
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {
    if (config.get('AUTH_PROVIDER') === 'cognito') {
      this.userPool = new CognitoUserPool({
        UserPoolId: config.getOrThrow('AWS_COGNITO_USER_POOL_ID'),
        ClientId: config.getOrThrow('AWS_COGNITO_CLIENT_ID'),
      });
      this.cognitoClient = new CognitoIdentityProviderClient({
        region: this.config.getOrThrow('AWS_REGION'),
        credentials: {
          accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
        },
      });
    }
  }

  async signup(authRegisterUserDto: SignUpDto): Promise<SignupResponse> {
    const { email, password } = authRegisterUserDto;

    const user = await this.prisma.users.findUnique({
      where: {
        email: authRegisterUserDto.email,
      },
    });
    if (user)
      throw new HttpException('Email Already Exist', HttpStatus.BAD_REQUEST);

    try {
      const result: ISignUpResult = await new Promise((resolve, reject) => {
        this.userPool.signUp(email, password, [], null, (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
      const role = await this.prisma.userRoles.upsert({
        where: { name: 'user' },
        create: { name: 'user' },
        update: { name: 'user' },
        select: { name: true, id: true },
      });
      const newUser = await this.usersService.createUser({
        userId: result.userSub,
        email,
        userType: 'cognito',
        sub: result?.userSub,
        roleId: role.id,
      });

      if (authRegisterUserDto?.inviteId && authRegisterUserDto?.inviteCode) {
        await this.verifyOrgOrTeamInvite(authRegisterUserDto, newUser);
      }

      return {
        success: true,
        data: {
          email: newUser.email,
        },
      };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.BAD_REQUEST);
    }
  }

  async resendEmail(userId: string) {
    const resendCommand = new ResendConfirmationCodeCommand({
      Username: userId,
      ClientId: this.config.getOrThrow('AWS_COGNITO_CLIENT_ID'),
    });
    await this.cognitoClient.send(resendCommand);
    return AbstractApiResponse.success({}, 'Email Send Successfully');
  }

  async forgotPassword(userId: string) {
    const resendCommand = new ForgotPasswordCommand({
      Username: userId,
      ClientMetadata: {
        APP_URL: this.config.getOrThrow('APP_URL') + '/tach-color-shop',
      },
      ClientId: this.config.getOrThrow('AWS_COGNITO_CLIENT_ID'),
    });
    await this.cognitoClient.send(resendCommand);
    return AbstractApiResponse.success({}, 'Email Send Successfully');
  }

  async resetPassword(userId: string, password: string, token: string) {
    const resendCommand = new ConfirmForgotPasswordCommand({
      Username: userId,
      ConfirmationCode: token,
      Password: password,
      ClientId: this.config.getOrThrow('AWS_COGNITO_CLIENT_ID'),
    });
    try {
      await this.cognitoClient.send(resendCommand);
      return AbstractApiResponse.success({}, 'Password Reset Successful.');
    } catch (e) {
      throw new HttpException(
        AbstractApiResponse.failure(
          e,
          e?.message || 'Password Reset failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async changePassword(changePasswordDto: ChangePassWordType) {
    const { userId, currentPassword, newPassword } = changePasswordDto;
    const adminAuthCommand = new AdminInitiateAuthCommand({
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      UserPoolId: this.config.getOrThrow('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.config.getOrThrow('AWS_COGNITO_CLIENT_ID'),
      AuthParameters: {
        USERNAME: userId,
        PASSWORD: currentPassword,
      },
    });

    try {
      const adminInitiateAuthResponse =
        await this.cognitoClient.send(adminAuthCommand);
      if (adminInitiateAuthResponse?.$metadata?.httpStatusCode === 200) {
        if (currentPassword === newPassword) {
          throw new HttpException(
            'Previous password is similar to new password',
            HttpStatus.NOT_ACCEPTABLE,
          );
        } else {
          const changePasswordParams = new ChangePasswordCommand({
            AccessToken:
              adminInitiateAuthResponse.AuthenticationResult.AccessToken,
            PreviousPassword: currentPassword,
            ProposedPassword: newPassword,
          });
          await this.cognitoClient?.send(changePasswordParams);
          return {
            message: 'Your password has been successfully changed.',
            statusCode: HttpStatus.OK,
          };
        }
      }
    } catch (error) {
      if (error?.message === 'Incorrect username or password.') {
        throw new HttpException(
          'The current password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      } else
        throw new HttpException(
          error?.message || 'An error occurred. Please try again',
          error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async login(authLoginUserDto: AuthDto): Promise<{
    token: string;
    user: UserEntity;
    refreshToken?: string;
    expires?: Date;
  }> {
    const { email, password } = authLoginUserDto;
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);
    try {
      const result: { token: string; refreshToken?: string; sub: string } =
        await new Promise((resolve, reject) => {
          userCognito.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
              resolve({
                token: result.getIdToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken(),
                sub: result.getAccessToken().decodePayload().sub,
              });
            },
            onFailure: (err) => {
              reject(err);
            },
          });
        });

      const user = await this.verifyUser({
        email: authLoginUserDto.email,
        sub: result?.sub,
      });
      return { ...result, user };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.findFirstOrThrow({
      where: { userId: userId },
    });

    try {
      if (user.name !== updateUserDto.email) {
        const params = {
          UserPoolId: this.config.getOrThrow('AWS_COGNITO_USER_POOL_ID'),
          Username: user.sub,
          UserAttributes: [
            {
              Name: 'email',
              Value: updateUserDto.email,
            },
            {
              Name: 'email_verified',
              Value: 'true',
            },
          ],
        };
        const updateCommand = new AdminUpdateUserAttributesCommand(params);
        await this.cognitoClient.send(updateCommand);

        const updatedUser = await this.usersService.update(
          user.userId,
          updateUserDto,
          false,
        );
        return AbstractApiResponse.success(
          new UserEntity(updatedUser),
          'User has been updated successfully',
        );
      }
    } catch (error) {
      throw new HttpException(
        AbstractApiResponse.failure(
          error,
          'User Update failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeUser(userId: string) {
    const user = await this.prisma.users.findFirstOrThrow({
      where: { userId: userId },
    });

    const cognitoClient = new CognitoIdentityProviderClient({
      region: this.config.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
    try {
      const params = {
        UserPoolId: this.config.getOrThrow('AWS_COGNITO_USER_POOL_ID'),
        Username: user.sub,
      };
      const logOutCommand = new AdminUserGlobalSignOutCommand(params);
      await cognitoClient.send(logOutCommand);
      await this.usersService.deleteUser(user.userId);
      const deleteCommand = new AdminDeleteUserCommand(params);
      await cognitoClient.send(deleteCommand);
      return AbstractApiResponse.success(
        {},
        'User has been deleted successfully',
      );
    } catch (error) {
      throw new HttpException(
        AbstractApiResponse.failure(
          error,
          'User deletion failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyUser(payload: { email: string; sub: string }) {
    try {
      const user = await this.usersService.getUser({
        email: payload.email,
        sub: payload.sub,
      });
      if (user.userStatus !== 'Active') {
        throw new HttpException(
          'User is not active status',
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  async verifyOrgOrTeamInvite(dto: SignUpDto, user: UserEntity) {
    const { inviteId, inviteCode } = dto;
    const invite = await this.prisma.invites.findUnique({
      where: { id: inviteId },
    });
    const createdAt = invite.createdAt;
    const currentDate = new Date();

    const daysDifference = differenceInDays(currentDate, createdAt);
    if (
      invite?.id &&
      invite?.status === InviteStatus.PENDING &&
      daysDifference < 6 &&
      inviteCode === invite?.inviteCode
    ) {
      if (invite?.inviteType === InviteType.ORGANIZATION && invite?.orgId) {
        const orgUser = await this.prisma.orgUsers.findFirst({
          where: {
            orgId: invite.orgId,
            userId: user.userId,
          },
        });
        if (orgUser?.id) {
          return;
        } else {
          await this.prisma.orgUsers.create({
            data: {
              orgId: invite.orgId,
              userId: user.userId,
              roleId: invite.roleId,
              joinedAt: new Date(),
            },
          });
        }
      }
      if (invite.inviteType === InviteType.TEAM && invite?.teamId) {
        const teamUser = await this.prisma.teamUsers.findFirst({
          where: {
            teamId: invite.teamId,
            userId: user.userId,
          },
        });
        if (teamUser?.id) {
          return;
        } else {
          await this.prisma.teamUsers.create({
            data: {
              teamId: invite.teamId,
              userId: user.userId,
              roleId: invite.roleId,
            },
          });
        }
      }
    }
  }
}
