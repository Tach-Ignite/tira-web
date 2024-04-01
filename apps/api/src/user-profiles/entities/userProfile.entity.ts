import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CompletionStatusEnum, GenderIdentity } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UserProfileEntity {
  @ApiPropertyOptional()
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
  @IsOptional()
  linkedInURL?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  websiteURL?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  githubURL?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  mediumURL?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  stackOverflowURL?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  calendarLink?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  completedSteps?: string;
}
