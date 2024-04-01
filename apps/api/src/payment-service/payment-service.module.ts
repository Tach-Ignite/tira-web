import { Module } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { PaymentServiceController } from './payment-service.controller';
import { StripeService } from './providers/stripe-service';
import { PrismaService } from '@prisma_/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '@src/email/email.service';
import { LoggerService } from '@common/logger/logger.service';
import { OrdersService } from '@src/orders/orders.service';
import { CartsService } from '@src/carts/carts.service';
import { BookingsService } from '@src/bookings/bookings.service';

@Module({
  controllers: [PaymentServiceController],
  providers: [
    PaymentServiceService,
    StripeService,
    PrismaService,
    ConfigService,
    EmailService,
    OrdersService,
    CartsService,
    LoggerService,
    BookingsService,
  ],
})
export class PaymentServiceModule {}
