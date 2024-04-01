import { Controller, Post, Body, Req, RawBody } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { CheckOutDto } from '@src/orders/dto/checkout.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '@common/decorators';
import { Public } from '@common/decorators/public.decorators';
import Stripe from 'stripe';
import { CreateBookingDto } from '@src/bookings/dto/create-booking.dto';

@Controller()
export class PaymentServiceController {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}

  @ApiTags('Payment Checkout')
  @Post('checkout-payments')
  createOrderSession(
    @Body() createPaymentServiceDto: CheckOutDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.paymentServiceService.createCheckoutSession(
      createPaymentServiceDto,
      userId,
    );
  }

  @ApiTags('Payment Checkout')
  @Post('booking-payments')
  createBookingSession(
    @Body() bookingDto: CreateBookingDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.paymentServiceService.createBookingSession(bookingDto, userId);
  }

  @ApiTags('Stripe Webhook')
  @Public()
  @Post('stripe/webhook')
  listenStripeWebhook(@RawBody() body: Stripe.Event, @Req() req) {
    return this.paymentServiceService.stripeWebhookListen(body, req);
  }
}
