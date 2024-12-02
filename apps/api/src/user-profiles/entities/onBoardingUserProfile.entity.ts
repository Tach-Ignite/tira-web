import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  CompletionStatusEnum,
  GenderIdentity,
  ThemeModeEnum,
  UseCaseTypes,
  BusinessTypes,
} from '@prisma/client';
import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class OnBoardingUserProfileEntity {
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
  useCaseType?: UseCaseTypes;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  profileImageUrl?: string;

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
  postalCode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  countryRegion?: string;

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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  themeMode?: ThemeModeEnum;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessType?: BusinessTypes;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessCity?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessState?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessCountryRegion?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessPostalCode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  addressLine1?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessLinkedInURL?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessUrl?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  onboardingCompleted?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  onboardingStep?: number;
}
