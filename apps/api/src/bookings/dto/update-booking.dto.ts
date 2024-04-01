import { ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatusEnum } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateBookingDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  adminNotes?: string;

  @IsEnum(BookingStatusEnum)
  @ApiPropertyOptional()
  @IsOptional()
  status?: BookingStatusEnum;
}
