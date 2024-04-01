import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { ProductEntity } from './entities/product.entity';
import { Prisma } from '@prisma/client';
import { ProductFindAllArgs, ProductsFindOneArgs } from './products.type';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryIds, ...restCreateProductDto } = createProductDto;
    return await this.prisma.products.create({
      data: {
        ...restCreateProductDto,
        categories: {
          connect: categoryIds.map((categoryId) => ({ categoryId })),
        },
      },
    });
  }

  async findAll({
    query: {
      page,
      perPage,
      searchTerm = '',
      sortOrder,
      sortField,
      categoryIds = '',
      minPrice,
      maxPrice,
    },
    userId,
  }: ProductFindAllArgs) {
    const paginate = createPaginator({
      page,
      perPage,
    });
    const orderBy: Record<string, Prisma.SortOrder> = {};
    if (sortField && sortOrder) {
      orderBy[sortField] = sortOrder;
    }

    const parsedCategoryIds = categoryIds.split(',').map(String);

    if (userId) {
      return paginate<ProductEntity, Prisma.ProductsFindManyArgs>(
        this.prisma.products,
        {
          where: {
            AND: [
              {
                OR: [
                  {
                    title: { contains: searchTerm, mode: 'insensitive' },
                  },
                  {
                    description: { contains: searchTerm, mode: 'insensitive' },
                  },
                ],
              },
              categoryIds
                ? {
                    categories: {
                      some: { categoryId: { in: parsedCategoryIds } },
                    },
                  }
                : {},
              minPrice ? { salePrice: { gte: parseFloat(minPrice) } } : {},
              maxPrice ? { salePrice: { lte: parseFloat(maxPrice) } } : {},
            ],
          },
          orderBy,
          include: { favoriteUsers: { where: { userId } }, categories: true },
        },
        {
          page,
          perPage,
        },
      );
    }

    return paginate<ProductEntity, Prisma.ProductsFindManyArgs>(
      this.prisma.products,
      {
        select: {
          productId: true,
          productImageUrl: true,
          title: true,
          description: true,
          categories: true,
          msrpPrice: true,
          salePrice: true,
          brand: true,
          quantity: true,
        },
        where: {
          AND: [
            {
              OR: [
                {
                  title: { contains: searchTerm, mode: 'insensitive' },
                },
                {
                  description: { contains: searchTerm, mode: 'insensitive' },
                },
              ],
            },
            categoryIds
              ? {
                  categories: {
                    some: { categoryId: { in: parsedCategoryIds } },
                  },
                }
              : {},
            minPrice ? { salePrice: { gte: parseFloat(minPrice) } } : {},
            maxPrice ? { salePrice: { lte: parseFloat(maxPrice) } } : {},
          ],
        },
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }

  async filterByFriendlyIds(friendlyIds?: string) {
    const parsedFriendlyIds = friendlyIds?.split(',').map(String) || [];
    return await this.prisma.products.findMany({
      select: {
        productId: true,
        productImageUrl: true,
        title: true,
        description: true,
        categories: true,
        msrpPrice: true,
        salePrice: true,
        brand: true,
        quantity: true,
      },
      where: { friendlyId: { in: parsedFriendlyIds } },
    });
  }

  async findOne({ productId, userId }: ProductsFindOneArgs) {
    if (!userId) {
      return await this.prisma.products.findUnique({
        where: { productId },
        select: {
          productId: true,
          productImageUrl: true,
          title: true,
          description: true,
          msrpPrice: true,
          salePrice: true,
          brand: true,
          categories: true,
        },
      });
    }
    return await this.prisma.products.findUnique({
      where: { productId },
      include: { favoriteUsers: { where: { userId } }, categories: true },
    });
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const { categoryIds, ...restUpdateProductDto } = updateProductDto || {};

    return await this.prisma.products.update({
      where: { productId },
      data: {
        ...restUpdateProductDto,
        categories: {
          set: categoryIds.map((categoryId) => ({ categoryId })),
        },
      },
    });
  }

  async remove(productId: string) {
    return await this.prisma.products.delete({ where: { productId } });
  }
}
