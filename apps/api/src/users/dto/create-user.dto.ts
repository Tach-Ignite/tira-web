import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  userId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  hash?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  userType?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  roleId: string;

  @IsOptional()
  @IsString()
  sub?: string; // Sub is id provided by third party like Cognito,OAuth methods
}
