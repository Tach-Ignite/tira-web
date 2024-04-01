import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '@common/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { PassportService } from './services/passport.service';
import { CognitoService } from './services/cognito.service';
import { CognitoStrategy } from './strategies/cognito.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service';
import { PrismaService } from '@prisma_/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { VerifyEmail } from './strategies/verifyEmail.strategy';
import { EmailService } from '@src/email/email.service';
import { GoogleStrategy } from './strategies/google.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        VerifyEmail,
        GoogleStrategy,
        process.env.AUTH_PROVIDER === 'local' ? JwtStrategy : CognitoStrategy,
        process.env.AUTH_PROVIDER === 'local'
          ? PassportService
          : CognitoService,
        JwtService,
        PrismaService,
        EmailService,
        ConfigService,
        UsersService,
        LoggerService,
        EventEmitter2,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
