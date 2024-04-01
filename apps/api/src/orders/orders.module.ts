import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '@prisma_/prisma.module';
import { CheckoutController } from './checkout.controller';
import { EmailService } from '@src/email/email.service';
import { LoggerService } from '@common/logger/logger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [OrdersController, CheckoutController],
  providers: [OrdersService, EmailService, LoggerService],
})
export class OrdersModule {}
