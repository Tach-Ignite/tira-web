import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CheckoutController } from './checkout.controller';
import { PrismaService } from '@prisma_/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '@src/email/email.service';
import { LoggerService } from '@common/logger/logger.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('CheckoutController', () => {
  let controller: CheckoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        PrismaService,
        OrdersService,
        EmailService,
        ConfigService,
        OrdersService,
        LoggerService,
        EventEmitter2,
      ],
    }).compile();

    controller = module.get<CheckoutController>(CheckoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
