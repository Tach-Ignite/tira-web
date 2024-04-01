import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class SearchSlotsDto {
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  serviceId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiPropertyOptional()
  date: Date;
}
