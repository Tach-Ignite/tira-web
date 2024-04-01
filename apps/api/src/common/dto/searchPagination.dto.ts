import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchPaginationDto {
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
}
