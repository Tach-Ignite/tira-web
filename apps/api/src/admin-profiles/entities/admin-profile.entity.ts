import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdminProfile, NotificationScheduleEnum } from '@prisma/client';

export class AdminProfileEntity implements Partial<AdminProfile> {
  constructor(partial: Partial<AdminProfile>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  adminProfileId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  lowInventoryEmail?: boolean;

  @ApiPropertyOptional()
  lowInventorySms?: boolean;

  @ApiPropertyOptional()
  orderCancelEmail?: boolean;

  @ApiPropertyOptional()
  orderCancelSms?: boolean;

  @ApiPropertyOptional()
  orderCancelEmailSchedule?: NotificationScheduleEnum;

  @ApiPropertyOptional()
  orderCancelSmsSchedule?: NotificationScheduleEnum;

  @ApiPropertyOptional()
  lowInventoryEmailSchedule?: NotificationScheduleEnum;

  @ApiPropertyOptional()
  lowInventorySmsSchedule?: NotificationScheduleEnum;
}
