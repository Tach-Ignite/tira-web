import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { ServiceFindAllArgs } from './services.type';
import { Prisma } from '@prisma/client';
import { ServiceEntity } from './entities/service.entity';
import { SearchSlotsDto } from './dto/search-slots.dto';
import {
  DateSpecificAvailability,
  TimeSlot,
  WeeklyHours,
} from '@src/bookings/bookings.type';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    const { categoryIds, ...restCreateServiceDto } = createServiceDto;
    return await this.prisma.services.create({
      data: {
        ...restCreateServiceDto,
        categories: {
          connect: categoryIds?.map((categoryId) => ({ categoryId })),
        },
      },
    });
  }

  findAll({ query }: ServiceFindAllArgs) {
    const {
      page = '1',
      perPage = '10',
      searchTerm = '',
      categoryIds,
      sortField,
      sortOrder,
      maxPrice,
      minPrice,
    } = query;

    const paginate = createPaginator({
      page,
      perPage,
    });

    const orderBy: Record<string, Prisma.SortOrder> = {};
    if (sortField && sortOrder) {
      orderBy[sortField] = sortOrder;
    }

    const parsedCategoryIds = categoryIds?.split(',').map(String);

    return paginate<ServiceEntity, Prisma.ServicesFindManyArgs>(
      this.prisma.services,
      {
        where: {
          AND: [
            {
              OR: [
                {
                  serviceName: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
            maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
            categoryIds
              ? {
                  categories: {
                    some: {
                      categoryId: {
                        in: parsedCategoryIds,
                      },
                    },
                  },
                }
              : {},
          ],
        },
        orderBy,
        include: { categories: true },
      },
      {
        perPage,
        page,
      },
    );
  }

  findOne(serviceId: string) {
    return this.prisma.services.findUniqueOrThrow({
      where: {
        serviceId,
      },
      include: {
        categories: true,
      },
    });
  }

  update(serviceId: string, updateServiceDto: UpdateServiceDto) {
    const { categoryIds, ...restUpdateServiceDto } = updateServiceDto;
    return this.prisma.services.update({
      where: { serviceId },
      data: {
        ...restUpdateServiceDto,
        categories: {
          set: categoryIds?.map((categoryId) => ({ categoryId })),
        },
      },
    });
  }

  remove(serviceId: string) {
    return this.prisma.services.delete({ where: { serviceId } });
  }

  async getSlots({ date, serviceId }: SearchSlotsDto) {
    const queryDate = dayjs(date);
    if (!queryDate.isValid()) {
      throw new HttpException('Invalid date', HttpStatus.BAD_REQUEST);
    }
    const queryDateTime = queryDate?.toDate();

    const service = await this.findOne(serviceId);
    const availability: WeeklyHours = service.weeklyHours as WeeklyHours;

    const specialDayAvailability =
      service.dateSpecificAvailability as DateSpecificAvailability;

    const day = queryDate.format('dddd').toLowerCase();

    const availabilityDay: TimeSlot = availability[day];

    if (
      !availabilityDay ||
      service.saleStartDate > queryDateTime ||
      service.saleEndDate < queryDateTime
    ) {
      throw new HttpException(
        'Service not available on this day',
        HttpStatus.BAD_REQUEST,
      );
    }

    const formattedQueryDate = queryDate.format('YYYY-MM-DD');
    const specialDay = specialDayAvailability[formattedQueryDate];

    if (specialDay) {
      const specialDaySlots = await Promise.all(
        specialDay.map(async (slotTiming: TimeSlot) => {
          return await this.generateSlots({
            availabilityDay: slotTiming,
            duration: service.duration,
            queryDate,
            serviceId,
          });
        }),
      );

      return { slots: specialDaySlots.flat() };
    }

    const slots = await this.generateSlots({
      availabilityDay,
      duration: service.duration,
      queryDate,
      serviceId,
    });
    return { slots };
  }

  async generateSlots({
    availabilityDay,
    duration,
    queryDate,
    serviceId,
  }: {
    availabilityDay: TimeSlot;
    queryDate: dayjs.Dayjs;
    serviceId: string;
    duration: number;
  }) {
    const startTime = dayjs()
      .set('hour', parseInt(availabilityDay?.startTime?.split(':')[0]))
      .set('minute', parseInt(availabilityDay?.startTime?.split(':')[1]))
      .format();
    const endTime = dayjs()
      .set('hour', parseInt(availabilityDay?.endTime?.split(':')[0]))
      .set('minute', parseInt(availabilityDay?.endTime?.split(':')[1]))
      .format();

    let slots = [];
    let currentTime = dayjs(startTime);

    const startOfDay = queryDate.startOf('day').toDate();
    const endOfDay = queryDate.endOf('day').toDate();
    const gte = startOfDay;
    const lt = endOfDay;
    const bookings = await this.prisma.bookings.findMany({
      where: {
        serviceId: serviceId,
        bookingDate: {
          gte,
          lt,
        },
      },
    });

    const bookedSlots = bookings.map((booking) =>
      dayjs(booking.startTime).utc().format('hh:mm A'),
    );

    while (currentTime.isBefore(dayjs(endTime))) {
      const time = currentTime.format('hh:mm A');
      const isAvailable = !bookedSlots.includes(time);
      slots = [
        ...slots,
        {
          time,
          isAvailable,
        },
      ];

      currentTime = currentTime.add(duration, 'minute');
    }
    return slots;
  }
}
