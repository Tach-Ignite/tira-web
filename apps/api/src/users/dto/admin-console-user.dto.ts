import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AdminConsoleUserDto {
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
  @IsString()
  @ApiPropertyOptional()
  orgId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  teamId?: string;

  @IsOptional()
  @ApiPropertyOptional()
  filters?: Record<string, any>;
}
