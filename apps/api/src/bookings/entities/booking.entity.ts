import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Bookings } from '@prisma/client';

export class BookingEntity implements Partial<Bookings> {
  constructor(partial: Partial<Bookings>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ required: false })
  bookingId?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  bookingDate?: Date;

  @ApiProperty({ required: false })
  bookingNotes?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  contactAddress?: string;

  @ApiProperty({ required: false })
  contactCity?: string;

  @ApiProperty({ required: false })
  contactEmail?: string;

  @ApiProperty({ required: false })
  contactFirstName?: string;

  @ApiProperty({ required: false })
  contactLastName?: string;

  @ApiProperty({ required: false })
  contactPhone?: string;

  @ApiProperty({ required: false })
  contactState?: string;

  @ApiProperty({ required: false })
  contactZipCode?: string;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  endTime?: Date;

  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: false })
  paymentStatus?: $Enums.PaymentStatusEnum;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  serviceId?: string;

  @ApiProperty({ required: false })
  startTime?: Date;

  @ApiProperty({ required: false })
  state?: string;

  @ApiProperty({ required: false })
  status?: $Enums.BookingStatusEnum;

  @ApiProperty({ required: false })
  updatedAt?: Date;

  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty({ required: false })
  zipCode?: string;
}
