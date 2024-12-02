import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateInviteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  orgId: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @ApiProperty()
  teamId?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsBoolean()
  @ApiProperty()
  isOrgTeamAdmin?: boolean;
}
