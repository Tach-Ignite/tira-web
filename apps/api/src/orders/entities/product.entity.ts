import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Products } from '@prisma/client';

export class ProductEntity implements Partial<Products> {
  constructor(partial: Partial<Products>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional({ isArray: true })
  productImageUrl?: string[];
}
