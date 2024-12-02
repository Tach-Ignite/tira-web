import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OrgUserSearchPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  page?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  perPage?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  orgId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  searchTerm?: string;

  @IsOptional()
  @ApiPropertyOptional()
  filters?: Record<string, any>;
}
