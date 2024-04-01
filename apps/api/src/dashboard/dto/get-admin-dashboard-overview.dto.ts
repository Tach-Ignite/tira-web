import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetAdminDashboardOverviewDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  earningsFilterYear?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  categoryFilterMonth?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  categoryFilterYear?: number;
}
