import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  orgId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  teamId: string;

  @IsString()
  @ApiProperty({ required: true })
  roleId: string;
}
