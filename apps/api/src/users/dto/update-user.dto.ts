import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @ApiProperty()
  @IsDateString()
  emailVerifiedAt?: Date;

  @IsOptional()
  @ApiProperty()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  profileImage?: string;
}
