import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { SortOrder } from '@src/products/enums/product.enum';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export enum SortFields {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PRICE = 'price',
  SERVICE_NAME = 'serviceName',
}
export class SearchServiceDto {
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
  @ApiPropertyOptional()
  categoryIds?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  minPrice?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional()
  maxPrice?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESCENDING })
  sortOrder?: Prisma.SortOrder;

  @IsOptional()
  @IsEnum(SortFields)
  @ApiPropertyOptional({ enum: SortFields, default: SortFields.CREATED_AT })
  sortField?: SortFields = SortFields.CREATED_AT;
}
