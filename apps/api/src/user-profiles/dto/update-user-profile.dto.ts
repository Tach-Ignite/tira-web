import { ApiProperty } from '@nestjs/swagger';
import { CompletionStatusEnum, GenderIdentity } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({
    enum: CompletionStatusEnum,
    default: CompletionStatusEnum.Pending,
  })
  @IsEnum(CompletionStatusEnum)
  @IsOptional()
  status?: CompletionStatusEnum;

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
  emailAddress?: string;

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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  completedSteps?: string;

  constructor(partial: Partial<UpdateUserProfileDto>) {
    Object.assign(this, partial);
  }
}
