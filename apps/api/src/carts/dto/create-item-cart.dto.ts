import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class AddCartItemDto {
  @IsString()
  @ApiProperty()
  productId: string;

  @IsNumber()
  @ApiProperty({ example: 2 })
  quantity: number;
}
