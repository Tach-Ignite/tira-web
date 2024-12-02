import { ApiProperty } from '@nestjs/swagger';
import { ProfileRoles } from '@prisma/client';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateUserProfileRoleDto {
  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  profileRoles?: ProfileRoles[];
}
