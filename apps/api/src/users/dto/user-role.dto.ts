import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserRoleDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  orgId?: string;
}
