import { Products } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { FavoriteEntity } from '@src/favorites/entities/favorite.entity';
import { Exclude, Expose } from 'class-transformer';
import { CategoryEntity } from '@src/categories/entities/category.entity';

export class ProductEntity implements Partial<Products> {
  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  productId: string;

  @ApiProperty()
  productImageUrl?: string[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  friendlyId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  msrpPrice: number;

  @ApiProperty()
  salePrice: number;

  @ApiProperty()
  categories?: CategoryEntity[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  saleStartDate: Date;

  @ApiProperty()
  saleEndDate: Date;

  @ApiProperty()
  shippingDetails: string;

  @Exclude()
  favoriteUsers?: FavoriteEntity[];

  @Expose({ name: 'isFavorite' })
  get isFavorite(): boolean {
    return Boolean(this.favoriteUsers?.length);
  }
}
