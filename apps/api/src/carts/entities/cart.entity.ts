import { Carts } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { CartItemsEntity } from './cart-item.entity';
import { Transform } from 'class-transformer';

export class CartEntity implements Partial<Carts> {
  constructor(partial: Partial<Carts>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty({ type: [CartItemsEntity] })
  @Transform(({ value }) => value.map((val) => new CartItemsEntity(val)))
  cartItems?: CartItemsEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
