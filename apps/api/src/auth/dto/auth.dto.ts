import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @ApiProperty()
  inviteId?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @ApiProperty()
  inviteCode?: string;
}
