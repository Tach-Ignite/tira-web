import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsArray()
  @ApiProperty()
  @ApiPropertyOptional({ isArray: true, type: String })
  productImageUrl: string[];

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  description: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  shippingDetails: string;

  @IsString()
  @ApiProperty()
  brand: string;

  @IsString()
  @ApiProperty()
  friendlyId: string;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @ApiProperty()
  msrpPrice: number;

  @IsNumber()
  @ApiProperty()
  salePrice: number;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  saleEndDate: Date;

  @IsOptional()
  @ApiProperty()
  @IsDateString()
  saleStartDate: Date;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({ isArray: true, type: String })
  categoryIds?: string[];
}
