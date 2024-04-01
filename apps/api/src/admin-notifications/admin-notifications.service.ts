import { Injectable } from '@nestjs/common';
import { CreateAdminNotificationEvent } from './events/create-admin-notification.event';
import { UpdateAdminNotificationDto } from './dto/update-admin-notification.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@prisma_/prisma.service';
import { LoggerService } from '@common/logger/logger.service';
import { createPaginator } from 'prisma-pagination';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { AdminNotificationEntity } from './entities/admin-notification.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminNotificationsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
  ) {}

  create(createAdminNotificationDto: CreateAdminNotificationEvent) {
    return this.prisma.adminNotifications.create({
      data: createAdminNotificationDto,
    });
  }

  async findAll({ page, perPage }: SearchPaginationDto) {
    const totalCount = await this.prisma.adminNotifications.count();
    if (!perPage) perPage = `${totalCount}`;

    const paginate = createPaginator({
      page,
      perPage,
    });

    return paginate<
      AdminNotificationEntity,
      Prisma.AdminNotificationsFindManyArgs
    >(
      this.prisma.adminNotifications,
      {
        orderBy: {
          createdAt: 'desc',
        },
      },
      { page, perPage },
    );
  }

  findOne(notificationId: string) {
    return this.prisma.adminNotifications.findUniqueOrThrow({
      where: {
        notificationId,
      },
    });
  }

  update({ notificationIds }: UpdateAdminNotificationDto) {
    return this.prisma.adminNotifications.updateMany({
      where: {
        notificationId: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });
  }

  remove(notificationId: string) {
    return this.prisma.adminNotifications.delete({
      where: {
        notificationId,
      },
    });
  }

  getAllUnreadNotificationCount() {
    return this.prisma.adminNotifications.count({
      where: {
        read: false,
      },
    });
  }

  @OnEvent('adminNotification.create')
  async createAdminNotificationEvent(payload: CreateAdminNotificationEvent) {
    this.logger.log(`Admin notification created, for type ${payload.type}`);
    await this.create(payload);
  }
}
