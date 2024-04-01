import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateAdminNotificationDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  @ApiProperty({ type: [String] })
  notificationIds: string[];
}
