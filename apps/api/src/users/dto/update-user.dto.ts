import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsString, IsArray } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ProfileRoles } from '@prisma/client';

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

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  profileRoles?: ProfileRoles[];
}
