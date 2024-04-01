import { ApiProperty } from '@nestjs/swagger';
import { OrderItems } from '@prisma/client';
import { ProductEntity } from './product.entity';
import { Transform } from 'class-transformer';

export class OrderItemsEntity implements Partial<OrderItems> {
  constructor(partial: Partial<OrderItems>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  price?: number;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  productId?: string;

  @ApiProperty({ type: ProductEntity })
  @Transform(({ value }) => new ProductEntity(value))
  products?: ProductEntity;
}
