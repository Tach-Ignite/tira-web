import { ApiProperty } from '@nestjs/swagger';
import { ActiveStatus, GenderIdentity } from '@prisma/client';
import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

class UpdateProfileDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  genderIdentity: GenderIdentity;

  @ApiProperty({ required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  race: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  militaryVeteran?: string;

  @ApiProperty({
    required: false,
  })
  @IsUrl()
  @IsOptional()
  linkedInURL?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  websiteURL?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  githubURL?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  mediumURL?: string;

  @ApiProperty({
    required: false,
  })
  @IsUrl()
  @IsOptional()
  stackOverflowURL?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  @IsOptional()
  calendarLink?: string;

  constructor(partial: Partial<UpdateProfileDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateAnyUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  userProfile: UpdateProfileDto;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userStatus: ActiveStatus;
}
