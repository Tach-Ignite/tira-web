import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateCartItemDto {
  @IsString()
  @ApiProperty()
  productId: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  quantity: number;
}
