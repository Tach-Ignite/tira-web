import { ApiProperty } from '@nestjs/swagger';
import { FavoriteUserProducts } from '@prisma/client';

export class FavoriteEntity implements Partial<FavoriteUserProducts> {
  constructor(partial: Partial<FavoriteUserProducts>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  productId?: string;

  @ApiProperty()
  userId?: string;
}
