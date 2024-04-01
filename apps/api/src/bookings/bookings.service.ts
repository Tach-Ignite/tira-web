import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { BookingFindAllArgs } from './bookings.type';
import { BookingEntity } from './entities/booking.entity';
import { Prisma } from '@prisma/client';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, userId: string) {
    const { serviceId, bookingDate } = createBookingDto;

    const service = await this.prisma.services.findUnique({
      where: { serviceId },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (
      service.saleStartDate &&
      service.saleEndDate &&
      service.saleStartDate > bookingDate &&
      service.saleEndDate < bookingDate
    ) {
      throw new Error('Service not available for booking');
    }

    const bookedSlots = await this.prisma.bookings.findMany({
      where: { serviceId, bookingDate },
    });

    if (
      bookedSlots.some((slot) => slot.startTime === createBookingDto.startTime)
    ) {
      throw new Error('Slot already booked');
    }

    return this.prisma.bookings.create({
      data: { ...createBookingDto, status: 'Confirmed', userId },
    });
  }

  async findAll({
    query: { page, perPage, searchTerm, sortField, sortOrder },
    userId,
  }: BookingFindAllArgs) {
    const orderBy: Record<string, Prisma.SortOrder> = {};
    if (sortField && sortOrder) {
      orderBy[sortField] = sortOrder;
    }
    const paginate = createPaginator({
      page,
      perPage,
    });

    return paginate<BookingEntity, Prisma.BookingsFindManyArgs>(
      this.prisma.bookings,
      {
        where: {
          userId: { equals: userId || undefined },
          bookingId: { contains: searchTerm, mode: 'insensitive' },
          state: { contains: searchTerm, mode: 'insensitive' },
        },
        select: {
          bookingId: true,
          bookingDate: true,
          startTime: true,
          endTime: true,
          status: true,
          duration: true,
          firstName: true,
          lastName: true,
          service: {
            select: {
              serviceId: true,
              msrp: true,
              price: true,
            },
          },
          bookingNotes: true,
          adminNotes: userId ? false : true,
          user: {
            select: {
              name: true,
              userId: true,
            },
          },
        },
      },
      {
        page,
        perPage,
      },
    );
  }

  findOne(bookingId: string, userId?: string) {
    return this.prisma.bookings.findUnique({
      where: {
        bookingId,
        userId: {
          equals: userId || undefined,
        },
      },
      include: {
        service: true,
        user: true,
        payments: true,
      },
    });
  }

  update(bookingId: string, updateBookingDto: UpdateBookingDto) {
    return this.prisma.bookings.update({
      where: {
        bookingId,
      },
      data: updateBookingDto,
      select: { bookingId: true },
    });
  }

  remove(bookingId: string) {
    return this.prisma.bookings.delete({
      where: {
        bookingId,
      },
      select: {
        bookingId: true,
      },
    });
  }
}
