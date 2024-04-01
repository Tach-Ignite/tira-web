import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { SortFields, SortOrder } from '@src/products/enums/product.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class SearchFavoritePaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  page?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  perPage?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESCENDING })
  sortOrder?: Prisma.SortOrder;

  @IsOptional()
  @IsEnum(SortFields)
  @ApiPropertyOptional({ enum: SortFields, default: SortFields.CREATED_AT })
  sortField?: SortFields = SortFields.CREATED_AT;
}
