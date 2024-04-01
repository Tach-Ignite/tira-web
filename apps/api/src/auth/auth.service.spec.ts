import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@prisma_/prisma.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '@common/logger/logger.service';
import { CognitoService } from './services/cognito.service';
import { PassportService } from './services/passport.service';
import { CognitoStrategy } from './strategies/cognito.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailService } from '@src/email/email.service';
import { VerifyEmail } from './strategies/verifyEmail.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        VerifyEmail,
        process.env.AUTH_PROVIDER === 'local' ? JwtStrategy : CognitoStrategy,
        process.env.AUTH_PROVIDER === 'local'
          ? PassportService
          : CognitoService,
        JwtService,
        ConfigService,
        UsersService,
        LoggerService,
        EmailService,
        PrismaService,
        EventEmitter2,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
