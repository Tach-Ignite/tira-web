import { Injectable } from '@nestjs/common';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { InquiryEntity } from './entities/inquiry.entity';
import { AdminNotificationEnum, Prisma } from '@prisma/client';
import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateAdminNotificationEvent } from '@src/admin-notifications/events/create-admin-notification.event';

@Injectable()
export class InquiriesService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createInquiryDto: CreateInquiryDto) {
    try {
      const res = await this.prisma.inquiries.create({
        data: createInquiryDto,
      });
      const inquiryRequest = new CreateAdminNotificationEvent();
      inquiryRequest.message = `New Inquiry Request from: ${res?.email}`;
      inquiryRequest.type = AdminNotificationEnum.Inquiry;
      inquiryRequest.data = {
        ...res,
        createdAt: res.createdAt.toString(),
        updatedAt: res.updatedAt.toString(),
      };
      this.eventEmitter.emit('adminNotification.create', inquiryRequest);
      return res;
    } catch (error) {
      throw new Error('Failed to create inquiry');
    }
  }

  async findAll({ page, perPage, searchTerm = '' }: SearchPaginationDto) {
    const paginate = createPaginator({
      page,
      perPage,
    });

    return paginate<InquiryEntity, Prisma.InquiriesFindManyArgs>(
      this.prisma.inquiries,
      {
        orderBy: { createdAt: 'desc' },
        where: {
          OR: [
            {
              firstName: { contains: searchTerm, mode: 'insensitive' },
            },
            {
              lastName: { contains: searchTerm, mode: 'insensitive' },
            },
            {
              email: { contains: searchTerm, mode: 'insensitive' },
            },
            {
              reason: { contains: searchTerm, mode: 'insensitive' },
            },
          ],
        },
      },
      {
        page,
        perPage,
      },
    );
  }

  async findOne(inquiryId: string): Promise<InquiryEntity> {
    return await this.prisma.inquiries.findUniqueOrThrow({
      where: { inquiryId },
    });
  }

  async update(
    inquiryId: string,
    updateInquiryDto: UpdateInquiryDto,
  ): Promise<InquiryEntity> {
    return await this.prisma.inquiries.update({
      where: { inquiryId },
      data: updateInquiryDto,
    });
  }
}
