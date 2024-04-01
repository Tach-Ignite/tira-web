import { SearchPaginationDto } from '@common/dto/searchPagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export enum SortFields {
  CREATED_AT = 'createdAt',
  ORDER_ID = 'orderId',
  STATUS = 'orderStatus',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class SearchOrderDto extends SearchPaginationDto {
  @IsOptional()
  @ApiPropertyOptional({
    enum: SortOrder,
    default: SortOrder.DESC,
  })
  sortOrder?: Prisma.SortOrder;

  @IsOptional()
  @IsEnum(SortFields)
  @ApiPropertyOptional({ enum: SortFields, default: SortFields.CREATED_AT })
  sortField?: SortFields = SortFields.CREATED_AT;
}
