import { Module } from '@nestjs/common';
import { LoggerService } from '@common/logger/logger.service';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService, LoggerService],
  exports: [EmailService],
})
export class EmailModule {}
