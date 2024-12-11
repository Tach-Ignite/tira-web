import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetOrganizationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  orgFriendlyId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  addressLine1?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  city?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  state?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  country?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  zipCode?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  websiteURL?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  linkedInURL?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  companyEmail?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  companyPhone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  contactName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  updatedAt?: Date;
}
