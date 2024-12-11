import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrganizationDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  logoUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  addressLine1?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  city?: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  state?: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  country?: string;

  @IsString()
  @ApiProperty({ required: false })
  @IsOptional()
  zipCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  websiteURL?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  linkedInURL?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  companyEmail?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  companyPhone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  contactName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  contactPhone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  contactEmail?: string;
}
