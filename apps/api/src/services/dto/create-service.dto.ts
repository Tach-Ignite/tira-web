import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JsonObject } from '@prisma/client/runtime/library';
export class CreateServiceDto {
  @IsString()
  @ApiProperty()
  companyName: string;

  @IsString()
  @ApiProperty()
  friendlyId: string;

  @IsString()
  @ApiProperty()
  serviceName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  imageUrls: string[];

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  msrp: number;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  saleStartDate: Date;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  saleEndDate: Date;

  @IsNumber()
  @ApiProperty()
  duration: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  limitOfBookingsPerDay: number;

  @IsNotEmpty()
  @ApiProperty()
  weeklyHours: JsonObject;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ isArray: true, type: String })
  categoryIds?: string[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  additionalDetails: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  adminNotes: string;

  @IsOptional()
  @ApiPropertyOptional()
  dateSpecificAvailability: JsonObject;
}
