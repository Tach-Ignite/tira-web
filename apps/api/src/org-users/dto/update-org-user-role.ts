import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrgUserRoleDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  role: string;
}
