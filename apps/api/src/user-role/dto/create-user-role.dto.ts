import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  @ApiProperty()
  name: string;
}
