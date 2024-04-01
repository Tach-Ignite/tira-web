import { Injectable } from '@nestjs/common';
import { StripeService } from './providers/stripe-service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@prisma_/prisma.service';
import { CheckOutDto } from '@src/orders/dto/checkout.dto';
import { OrdersService } from '@src/orders/orders.service';
import { LoggerService } from '@common/logger/logger.service';
import { CartsService } from '@src/carts/carts.service';
import { CreateBookingDto } from '@src/bookings/dto/create-booking.dto';
import { BookingsService } from '@src/bookings/bookings.service';

@Injectable()
export class PaymentServiceService {
  private paymentService: StripeService;
  constructor(
    private stripeService: StripeService,
    private readonly config: ConfigService,
    private readonly orderSerivice: OrdersService,
    private logger: LoggerService,
    private cart: CartsService,
    private booking: BookingsService,
    private readonly prisma: PrismaService,
  ) {
    this.paymentService = stripeService;
  }

  async createCheckoutSession(createCheckout: CheckOutDto, userId: string) {
    const order = await this.orderSerivice.create(createCheckout, userId);
    return this.paymentService.createOrderSession(order);
  }
  async createBookingSession(createCheckout: CreateBookingDto, userId: string) {
    const booking = await this.booking.create(createCheckout, userId);
    return this.paymentService.createBookingSession(booking);
  }

  async stripeWebhookListen(body: any, req: any) {
    return this.paymentService.stripeWebhookListen(body, req);
  }
}
