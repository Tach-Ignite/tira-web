import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryEntity implements Partial<Category> {
  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  parentId?: string;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  parent?: CategoryEntity;
}
