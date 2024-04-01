import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  page: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  perPage: string;
}
