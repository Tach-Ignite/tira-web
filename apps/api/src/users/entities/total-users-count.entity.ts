import { ApiProperty } from '@nestjs/swagger';

export class TotalUsersCountEntity {
  @ApiProperty()
  totalUsersCount: number;
}
