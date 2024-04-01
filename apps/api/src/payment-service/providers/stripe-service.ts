import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@prisma_/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'));
  }

  async createOrderSession(order: any) {
    const { total, orderId } = order;
    const res = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata: {
        orderId: orderId,
      },
      expires_at: Math.floor(Date.now() / 1000) + 1800, // 5 minutes
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Products',
            },
            unit_amount: total * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.config.get('APP_URL')}/checkout/orders/${orderId}/success`,
      cancel_url: `${this.config.get('APP_URL')}/checkout/orders/${orderId}/failed`,
    });
    await this.prisma.payments.create({
      data: {
        amount: res.amount_total,
        paymentSessionId: res.id,
        status: 'Pending',
        order: {
          connect: {
            orderId: orderId,
          },
        },
      },
    });
    return { payment_session_id: res.id, ...order };
  }

  async createBookingSession(booking: any) {
    const { bookingId } = booking;
    const res = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      metadata: {
        bookingId: bookingId,
      },
      expires_at: Math.floor(Date.now() / 1000) + 1800, // 5 minutes
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Booking',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      /**
       * // TODO:Need to update the success and cancel URL.
       */

      // success_url: `${this.config.get('APP_URL')}/bookings/${bookingId}/success`,
      // cancel_url: `${this.config.get('APP_URL')}/bookings/${bookingId}/failed`,
      success_url: `${this.config.get('APP_URL')}/services/booknow/${bookingId}?currentStep=3`,
      cancel_url: `${this.config.get('APP_URL')}/services/booknow/${bookingId}`,
    });
    await this.prisma.payments.create({
      data: {
        amount: res.amount_total,
        paymentSessionId: res.id,
        status: 'Pending',
        Bookings: {
          connect: {
            bookingId: bookingId,
          },
        },
      },
    });
    return { payment_session_id: res.id, ...booking };
  }

  async stripeWebhookListen(body: any, req: any) {
    const stripeSecret = this.config.getOrThrow('STRIPE_WEBHOOK_SECRET');
    const signature = req.headers['stripe-signature'];
    try {
      const events = <
        | Stripe.CheckoutSessionCompletedEvent
        | Stripe.CheckoutSessionExpiredEvent
      >await this.stripe.webhooks.constructEvent(body, signature, stripeSecret);

      const sessionId = events.data.object?.id;
      if (events.type === 'checkout.session.completed' && sessionId) {
        const status =
          events.data.object.payment_status === 'paid' ? 'Succeeded' : 'Failed';

        const payment = await this.prisma.payments.findFirst({
          where: { paymentSessionId: sessionId },
          include: {
            order: true,
          },
        });
        if (payment?.paymentId) {
          await this.prisma.payments.update({
            where: { paymentId: payment.paymentId },
            data: {
              transactionDetails: JSON.stringify(events.data?.object),
              transactionId: events.data.object.payment_intent as string,
              status,
              order: {
                update: {
                  paymentStatus: status,
                },
              },
            },
          });
        }
        return null;
      }
      if (events.type === 'checkout.session.expired') {
        const payment = await this.prisma.payments.findFirst({
          where: { paymentSessionId: sessionId },
          include: {
            order: true,
          },
        });
        if (payment?.paymentId) {
          await this.prisma.payments.update({
            where: { paymentId: payment.paymentId },
            data: {
              transactionDetails: JSON.stringify(events.data?.object),
              transactionId: events.data.object.payment_intent as string,
              status: 'Failed',
              order: {
                update: {
                  paymentStatus: 'Failed',
                },
              },
            },
          });
        }
        return null;
      }
    } catch (e) {
      throw e;
    }
  }
}
