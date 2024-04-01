import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterFriendlyIdProductsDto {
  @IsOptional()
  @ApiPropertyOptional()
  friendlyIds?: string;
}
