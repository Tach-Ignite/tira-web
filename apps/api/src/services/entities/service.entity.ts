import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Services } from '@prisma/client';

export class ServiceEntity implements Partial<Services> {
  constructor(partial: Partial<Services>) {
    Object.assign(this, partial);
  }
  @ApiProperty({ required: false })
  additionalDetails?: string;

  @ApiProperty({ required: false })
  adminNotes?: string;

  @ApiProperty({ required: false })
  bookingAvailability?: Prisma.JsonValue;

  @ApiProperty({ required: false })
  companyName?: string;

  @ApiProperty({ required: false, type: Date })
  createdAt?: Date;

  @ApiProperty({ required: false })
  dateSpecificAvailability?: Prisma.JsonValue;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  duration?: number;

  @ApiProperty({ required: false })
  friendlyId?: string;

  @ApiProperty({ required: false, type: [String] })
  imageUrls?: string[];

  @ApiProperty({ required: false })
  limitOfBookingsPerDay?: number;

  @ApiProperty({ required: false })
  msrp?: number;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false, type: Date })
  saleEndDate?: Date;

  @ApiProperty({ required: false, type: Date })
  saleStartDate?: Date;

  @ApiProperty({ required: false })
  serviceId?: string;

  @ApiProperty({ required: false })
  serviceName?: string;

  @ApiProperty({ required: false, type: Date })
  updatedAt?: Date;
}
