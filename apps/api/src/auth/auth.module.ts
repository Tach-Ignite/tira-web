import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from '@common/logger/logger.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CognitoService } from './services/cognito.service';
import { PassportService } from './services/passport.service';
import { JwtService } from '@nestjs/jwt';
import { EmailModule } from '@src/email/email.module';
import { EmailService } from '@src/email/email.service';
import { VerifyEmail } from './strategies/verifyEmail.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { MicrosoftStrategy } from './strategies/microsoft.strategy';
import { LinkedInStrategy } from './strategies/linkedIn.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'cognito' }),
    ConfigModule,
    UsersModule,
    PrismaModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    VerifyEmail,
    process.env.GOOGLE_CLIENT_ID ? GoogleStrategy : null,
    process.env.AZURE_CLIENT_ID ? MicrosoftStrategy : null,
    process.env.LINKEDIN_CLIENT_ID ? LinkedInStrategy : null,
    process.env.GIT_OAUTH_CLIENT_ID ? GithubStrategy : null,
    process.env.AUTH_PROVIDER === 'local' ? PassportService : CognitoService,
    JwtService,
    LoggerService,
  ].filter(Boolean),
})
export class AuthModule {}
