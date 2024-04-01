import { ApiProperty } from '@nestjs/swagger';
import {
  AdminNotificationEnum,
  AdminNotifications,
  Prisma,
} from '@prisma/client';

export class AdminNotificationEntity implements Partial<AdminNotifications> {
  constructor(partial: Partial<AdminNotifications>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  notificationId?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  data?: Prisma.JsonValue;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  read?: boolean;

  @ApiProperty()
  type?: AdminNotificationEnum;
}
