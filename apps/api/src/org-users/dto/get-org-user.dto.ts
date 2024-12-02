import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetOrgUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  orgId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  userId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  roleId?: string;

  @IsOptional()
  @ApiPropertyOptional()
  joinedAt?: Date;

  @IsOptional()
  @ApiPropertyOptional()
  createdAt?: Date;

  @IsOptional()
  @ApiPropertyOptional()
  updatedAt?: Date;
}
