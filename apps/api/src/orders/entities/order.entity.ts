import { OrderStatus, Orders, ShippingTypeEnum } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { OrderItemsEntity } from './order-items.entity';
import { UserEntity } from './user.entity';

export class OrderEntity implements Partial<Orders> {
  constructor(partial: Partial<Orders>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  orderId?: string;

  @ApiProperty()
  orderStatus?: OrderStatus;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  state?: string;

  @ApiProperty()
  zipCode?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  discount?: number;

  @ApiProperty()
  shippingType?: ShippingTypeEnum;

  @ApiProperty()
  shippingCost?: number;

  @ApiProperty()
  shippingNotes?: string;

  @ApiProperty()
  subTotal?: number;

  @ApiProperty()
  total?: number;

  @ApiProperty()
  userId?: string;

  @ApiPropertyOptional({ type: UserEntity })
  @Transform(({ value }) => new UserEntity(value))
  user?: UserEntity;

  @ApiPropertyOptional({ type: OrderItemsEntity, isArray: true })
  @Transform(({ value }) => value.map((val) => new OrderItemsEntity(val)))
  orderItems?: OrderItemsEntity[];
}
