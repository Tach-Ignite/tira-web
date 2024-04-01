import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { SortOrder } from '@src/products/enums/product.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum SortFields {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  BOOKING_DATE = 'bookingDate',
  STATUS = 'status',
}

export class SearchBookingPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  page?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  perPage?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  searchTerm?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESCENDING })
  sortOrder?: Prisma.SortOrder;

  @IsOptional()
  @IsEnum(SortFields)
  @ApiPropertyOptional({ enum: SortFields, default: SortFields.CREATED_AT })
  sortField?: SortFields = SortFields.CREATED_AT;
}
