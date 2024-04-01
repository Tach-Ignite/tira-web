import { CartItems } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ProductEntity } from '../../products/entities/product.entity';

export class CartItemsEntity implements Partial<CartItems> {
  constructor(partial: Partial<CartItems>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  cartId: string;

  @ApiProperty({ type: ProductEntity })
  @Transform(({ value }) => new ProductEntity(value))
  product: ProductEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
