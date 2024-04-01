import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'John' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Doe' })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, example: '2B' })
  apartment?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'New Work' })
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Ohio' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ZB1292' })
  zipCode: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  primary?: boolean;
}
