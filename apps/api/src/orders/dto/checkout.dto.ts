import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShippingTypeEnum } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CheckOutDto {
  @ApiProperty({ type: [ProductDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ enum: ShippingTypeEnum })
  @IsNotEmpty()
  @IsEnum(ShippingTypeEnum)
  shippingType: ShippingTypeEnum;

  @IsOptional()
  @ApiPropertyOptional()
  billingAddress: JsonObject;

  @ApiProperty()
  @IsOptional()
  isSameAsShippingInformation: boolean;
}
