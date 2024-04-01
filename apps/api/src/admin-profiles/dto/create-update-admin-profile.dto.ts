import { ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationScheduleEnum } from '@prisma/client';
import { IsOptional, IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUpdateAdminProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  orderCancelEmail?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  orderCancelSms?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  lowInventoryEmail?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  lowInventorySms?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  orderCancelEmailSchedule?: NotificationScheduleEnum;

  @ApiPropertyOptional()
  @IsOptional()
  orderCancelSmsSchedule?: NotificationScheduleEnum;

  @ApiPropertyOptional()
  @IsOptional()
  lowInventoryEmailSchedule?: NotificationScheduleEnum;

  @ApiPropertyOptional()
  @IsOptional()
  lowInventorySmsSchedule?: NotificationScheduleEnum;
}
