import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckOutDto } from './dto/checkout.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { OrderEntity } from './entities/order.entity';
import { AdminNotificationEnum, Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersFindAllArgs, OrdersFindOneArgs } from './orders.type';
import { EmailService } from '@src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { CreateAdminNotificationEvent } from '@src/admin-notifications/events/create-admin-notification.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private readonly config: ConfigService,
    private emailService: EmailService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createOrderDto: CheckOutDto, userId: string) {
    const { products, ...rest } = createOrderDto;
    const shippingCost = 0;

    const productsDetails = await this.prisma.products.findMany({
      where: {
        productId: { in: products.map((product) => product.productId) },
      },
    });

    const subTotal = productsDetails.reduce((acc, product) => {
      const selectedProduct = products.find(
        (item) => item.productId === product.productId,
      );
      return acc + selectedProduct.quantity * product.salePrice;
    }, 0);

    /**
     *  //TODO: Update the total calculation to include shipping cost once it's implemented
     */
    const total = subTotal + shippingCost;

    const [order] = await this.prisma.$transaction([
      this.prisma.orders.create({
        data: {
          userId,
          orderItems: {
            createMany: {
              data: productsDetails.map((product) => ({
                productId: product.productId,
                quantity: products.find(
                  (val) => val.productId === product.productId,
                )?.quantity,
                price: product.salePrice,
              })),
            },
          },
          ...rest,
          shippingCost,
          subTotal,
          total,
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      }),
      ...products.map((product) => {
        return this.prisma.products.update({
          where: {
            productId: product.productId,
            quantity: { gte: product.quantity || 0 },
          },
          data: {
            quantity: {
              decrement: product.quantity,
            },
          },
        });
      }),
    ]);
    return order;
  }

  async findAll({
    query: { page = '1', perPage, searchTerm = '', sortField, sortOrder },
    userId,
  }: OrdersFindAllArgs) {
    const paginate = createPaginator({
      page,
      perPage,
    });

    const currentUserRole = await this.prisma.userRoles.findFirst({
      where: { users: { some: { userId } } },
    });

    const isAdmin = currentUserRole?.name === 'admin';

    const orderBy: Record<string, Prisma.SortOrder> = {};
    if (sortField && sortOrder) {
      orderBy[sortField] = sortOrder;
    }

    return paginate<OrderEntity, Prisma.OrdersFindManyArgs>(
      this.prisma.orders,
      {
        orderBy,
        where: {
          userId: !isAdmin ? userId : undefined,
          OR: [
            {
              orderId: { contains: searchTerm, mode: 'insensitive' },
            },
            {
              firstName: { contains: searchTerm, mode: 'insensitive' },
            },
            {
              lastName: { contains: searchTerm, mode: 'insensitive' },
            },
          ],
        },
        include: {
          payments: true,
          user: {
            select: {
              email: true,
              name: true,
            },
          },
          orderItems: {
            select: {
              price: true,
              quantity: true,
              product: {
                select: {
                  title: true,
                  description: true,
                  salePrice: true,
                  productImageUrl: true,
                },
              },
            },
          },
        },
      },
      { page, perPage },
    );
  }

  async findOne({ orderId, userId }: OrdersFindOneArgs) {
    const currentUserRole = await this.prisma.userRoles.findFirst({
      where: { users: { some: { userId } } },
    });

    const isAdmin = currentUserRole?.name === 'admin';

    const order = await this.prisma.orders.findUnique({
      where: {
        userId: !isAdmin ? userId : undefined,
        orderId,
      },
      include: {
        payments: true,
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        orderItems: {
          select: {
            price: true,
            quantity: true,
            productId: true,
            product: {
              select: {
                title: true,
                description: true,
                salePrice: true,
                productImageUrl: true,
              },
            },
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ${orderId} does not exist.`);
    }
    return order;
  }

  async sendOrderStatusMail(orderDetails: OrderEntity) {
    const {
      user,
      orderId: updatedOrderId,
      orderStatus: updatedOrderStatus,
    } = orderDetails;

    const adminUsers = await this.prisma.users?.findMany({
      where: { role: { name: 'admin' } },
    });

    const adminEmails = adminUsers?.map((user) => user?.email);

    if (updatedOrderId) {
      adminEmails?.map(async (mail) => {
        return await this.emailService.sendEmail({
          from: this.config.getOrThrow('EMAIL_SOURCE'),
          to: mail,
          subject: `Order Status Update: Order #${updatedOrderId}`,
          body: `Dear ${mail}, The status of your order #${updatedOrderId} has changed to ${updatedOrderStatus}.Product Link: ${this.config.getOrThrow('APP_URL')}/admin/orders/view/${updatedOrderId}`,
        });
      });
    }
    if (user?.email) {
      await this.emailService.sendEmail({
        from: this.config.getOrThrow('EMAIL_SOURCE'),
        to: user?.email,
        subject: `Order Status Update: Order #${updatedOrderId}`,
        body: `Dear ${user?.email}, The status of your order #${updatedOrderId} has changed to ${updatedOrderStatus}.Product Link: ${this.config.getOrThrow('APP_URL')}/account/orders/view/${updatedOrderId}`,
      });
    }
  }

  async update(orderId: string, updateOrderDto: UpdateOrderDto) {
    const { orderStatus: dtoOrderStatus } = updateOrderDto;

    const orderDetails = await this.prisma.orders.update({
      where: {
        orderId,
      },
      data: updateOrderDto,
      select: {
        orderId: true,
        orderStatus: true,
        shippingNotes: true,
        user: true,
      },
    });
    if (dtoOrderStatus) {
      await this.sendOrderStatusMail(orderDetails);
    }

    return orderDetails;
  }

  async cancelOrder(orderId: string, userId: string) {
    const user = await this.prisma.users.findFirst({
      where: { userId },
    });

    const orderDetails = await this.prisma.orders.update({
      where: { orderId },
      data: { orderStatus: 'Cancelled' },
      select: {
        orderId: true,
        orderStatus: true,
        shippingNotes: true,
        user: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (orderDetails?.orderId) {
      const orderStatusEvent = new CreateAdminNotificationEvent();
      orderStatusEvent.message = `Order Status Changed for ${orderDetails?.orderId}: ${user?.email}`;
      orderStatusEvent.type = AdminNotificationEnum.OrderStatusChanged;
      orderStatusEvent.data = {
        orderId: orderDetails?.orderId,
        OrderStatus: orderDetails?.orderStatus,
        createdAt: orderDetails.createdAt.toString(),
        updatedAt: orderDetails.createdAt.toString(),
      };
      this.eventEmitter.emit('adminNotification.create', orderStatusEvent);
    }

    await this.sendOrderStatusMail(orderDetails);

    return orderDetails;
  }
}
