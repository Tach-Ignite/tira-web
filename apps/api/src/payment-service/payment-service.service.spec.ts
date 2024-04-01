import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServiceService } from './payment-service.service';
import { StripeService } from './providers/stripe-service';
import { ConfigService } from '@nestjs/config';
import { OrdersService } from '@src/orders/orders.service';
import { LoggerService } from '@common/logger/logger.service';
import { PrismaService } from '@prisma_/prisma.service';
import { CartsService } from '@src/carts/carts.service';
import { EmailService } from '@src/email/email.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BookingsService } from '@src/bookings/bookings.service';

describe('PaymentServiceService', () => {
  let service: PaymentServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentServiceService,
        StripeService,
        EmailService,
        ConfigService,
        OrdersService,
        LoggerService,
        CartsService,
        PrismaService,
        EventEmitter2,
        BookingsService,
      ],
    }).compile();

    service = module.get<PaymentServiceService>(PaymentServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
