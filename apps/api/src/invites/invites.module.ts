import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma_/prisma.module';
import { EmailModule } from '@src/email/email.module';
import { LoggerService } from '@common/logger/logger.service';
import { EmailService } from '@src/email/email.service';

@Module({
  imports: [ConfigModule, PrismaModule, EmailModule],
  controllers: [InvitesController],
  providers: [InvitesService, EmailService, LoggerService],
})
export class InvitesModule {}
