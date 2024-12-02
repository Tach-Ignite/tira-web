import {
  Controller,
  Post,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

import { ApiAbstractResponse, GetCurrentUserId } from '@common/decorators';
import { AbstractApiResponse } from '@src/utils/general-response';
import { BookingEntity } from './entities/booking.entity';
import { ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '@src/utils/roles.enums';
import { BookingStatusEnum } from '@prisma/client';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiPaginatedResponse } from '@common/decorators/pagination.decorator';
import { SearchBookingPaginationDto } from './dto/search-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiAbstractResponse({ model: BookingEntity, statusCode: 'CREATED' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @GetCurrentUserId() userId: string,
  ) {
    try {
      const booking = await this.bookingsService.create(
        createBookingDto,
        userId,
      );
      return AbstractApiResponse.created(booking, 'Booking has been created!');
    } catch (error) {
      return AbstractApiResponse.failure(
        error,
        error.message || 'Failed to create booking!',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @RoleAccess([Roles.ORG_ADMIN])
  @ApiPaginatedResponse(BookingEntity)
  async findAll(@Query() query: SearchBookingPaginationDto) {
    const bookings = await this.bookingsService.findAll({ query });
    return AbstractApiResponse.success(bookings);
  }

  @Get('user')
  async findAllUsers(
    @Query() query: SearchBookingPaginationDto,
    @GetCurrentUserId() userId: string,
  ) {
    const bookings = await this.bookingsService.findAll({ query, userId });
    return AbstractApiResponse.success(bookings);
  }

  @Get(':bookingId')
  @RoleAccess([Roles.ORG_ADMIN])
  @ApiAbstractResponse({ model: BookingEntity })
  async findOne(@Param('bookingId') bookingId: string) {
    const booking = await this.bookingsService.findOne(bookingId);
    return AbstractApiResponse.success(booking);
  }

  @Get(':bookingId/user')
  @ApiAbstractResponse({ model: BookingEntity })
  async findOneUser(
    @Param('bookingId') bookingId: string,
    @GetCurrentUserId() userId: string,
  ) {
    const booking = await this.bookingsService.findOne(bookingId, userId);
    return AbstractApiResponse.success(booking);
  }

  @Patch(':bookingId')
  @RoleAccess([Roles.ORG_ADMIN])
  @ApiAbstractResponse({ model: BookingEntity })
  async updateBooking(
    @Param('bookingId') bookingId: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const booking = await this.bookingsService.update(
      bookingId,
      updateBookingDto,
    );
    return AbstractApiResponse.success(booking);
  }

  @Patch(':bookingId/cancel')
  @RoleAccess([Roles.ORG_ADMIN])
  @ApiAbstractResponse({ model: BookingEntity })
  async cancelBooking(@Param('bookingId') bookingId: string) {
    const booking = await this.bookingsService.update(bookingId, {
      status: BookingStatusEnum.Cancelled,
    });
    return AbstractApiResponse.success(booking);
  }

  @Delete(':bookingId')
  @RoleAccess([Roles.ORG_ADMIN])
  @ApiAbstractResponse({ model: BookingEntity })
  remove(@Param('bookingId') bookingId: string) {
    const booking = this.bookingsService.remove(bookingId);
    return AbstractApiResponse.success(booking, 'Booking has been deleted!');
  }
}
