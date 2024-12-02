import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetOrganizationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  orgFriendlyId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  website: string;
}
