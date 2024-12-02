import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetTeamUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  teamId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  userId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  roleId?: string;
}
