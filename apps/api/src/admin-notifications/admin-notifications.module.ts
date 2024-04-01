import { Module } from '@nestjs/common';
import { AdminNotificationsService } from './admin-notifications.service';
import { AdminNotificationsController } from './admin-notifications.controller';
import { PrismaModule } from '@prisma_/prisma.module';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminNotificationsController],
  providers: [AdminNotificationsService, LoggerService],
})
export class AdminNotificationsModule {}
