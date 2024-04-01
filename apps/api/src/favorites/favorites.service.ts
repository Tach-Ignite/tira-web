import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma_/prisma.service';
import {
  CreateFavoriteArgs,
  FavoritesFindAllArgs,
  RemoveFavoriteArgs,
} from './favorites.type';

import { createPaginator } from 'prisma-pagination';
import { FavoriteUserProducts, Prisma } from '@prisma/client';
import { ProductEntity } from '@src/products/entities/product.entity';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(createFavoriteArgs: CreateFavoriteArgs) {
    return await this.prisma.favoriteUserProducts.create({
      data: createFavoriteArgs,
    });
  }

  async remove(removeFavoriteArgs: RemoveFavoriteArgs) {
    return await this.prisma.favoriteUserProducts.delete({
      where: { userId_productId: removeFavoriteArgs },
    });
  }

  async findAll({
    query: { page, perPage, sortField, sortOrder },
    userId,
  }: FavoritesFindAllArgs) {
    const paginate = createPaginator({
      page,
      perPage,
    });

    const orderBy: Record<string, Prisma.SortOrder> = {};
    if (sortField && sortOrder) {
      orderBy[sortField] = sortOrder;
    }

    return paginate<
      FavoriteUserProducts & { product: ProductEntity },
      Prisma.FavoriteUserProductsFindManyArgs
    >(
      this.prisma.favoriteUserProducts,
      {
        where: { userId: { equals: userId } },
        orderBy: {
          product: orderBy,
        },
        include: {
          product: {
            include: {
              categories: true,
              favoriteUsers: { where: { userId: userId } },
            },
          },
        },
      },
      {
        page,
        perPage,
      },
    );
  }
}
