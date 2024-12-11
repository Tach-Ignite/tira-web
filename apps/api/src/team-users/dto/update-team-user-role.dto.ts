import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateTeamUserRoleDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  role: string;
}
