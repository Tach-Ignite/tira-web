import { ApiProperty } from '@nestjs/swagger';

export class AdminNotificationUpdateResponseEntity {
  @ApiProperty()
  count: number;
}
