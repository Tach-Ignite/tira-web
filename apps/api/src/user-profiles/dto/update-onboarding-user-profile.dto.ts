import { ApiProperty } from '@nestjs/swagger';
import {
  CompletionStatusEnum,
  GenderIdentity,
  ThemeModeEnum,
  UseCaseTypes,
  BusinessTypes,
} from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateOnboardingUserProfileDto {
  @ApiProperty({
    enum: CompletionStatusEnum,
    default: CompletionStatusEnum.Pending,
  })
  @IsEnum(CompletionStatusEnum)
  @IsOptional()
  status?: CompletionStatusEnum;

  @ApiProperty({
    enum: UseCaseTypes,
  })
  @IsEnum(UseCaseTypes)
  @IsOptional()
  useCaseType?: UseCaseTypes;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  profileImageUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

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
  countryRegion?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  postalCode?: string;

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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  themeMode?: ThemeModeEnum;

  @ApiProperty({
    enum: BusinessTypes,
  })
  @IsEnum(BusinessTypes)
  @IsOptional()
  businessType?: BusinessTypes;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessName?: string;

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
  @IsString()
  @IsOptional()
  businessEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  businessIndustry?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  onboardingCompleted?: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  onboardingStep?: number;

  constructor(partial: Partial<UpdateOnboardingUserProfileDto>) {
    Object.assign(this, partial);
  }
}
