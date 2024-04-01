import { ApiProperty } from '@nestjs/swagger';

export class AdminUnreadNotificationCount {
  @ApiProperty()
  unReadNotificationsCount: number;
}
