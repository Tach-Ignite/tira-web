import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServiceController } from './payment-service.controller';
import { PaymentServiceService } from './payment-service.service';
import { StripeService } from './providers/stripe-service';
import { PrismaService } from '@prisma_/prisma.service';
import { ConfigService } from '@nestjs/config';
import { OrdersService } from '@src/orders/orders.service';
import { EmailService } from '@src/email/email.service';
import { LoggerService } from '@common/logger/logger.service';
import { CartsService } from '@src/carts/carts.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BookingsService } from '@src/bookings/bookings.service';

describe('PaymentServiceController', () => {
  let controller: PaymentServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentServiceController],
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

    controller = module.get<PaymentServiceController>(PaymentServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
