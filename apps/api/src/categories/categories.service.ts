import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '@prisma_/prisma.service';
import { CategoriesFindManyArgs, UpdateCategoryArgs } from './categories.type';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { CategoryEntity } from './entities/category.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll({
    page,
    perPage,
    searchTerm,
    categoryId,
    parentOnly,
  }: CategoriesFindManyArgs): Promise<PaginatedResult<CategoryEntity>> {
    const whereConditions: Prisma.CategoryWhereInput = {
      name: { contains: searchTerm, mode: 'insensitive' },
      categoryId: { not: categoryId },
      /**
       * If parentOnly is provided, return only ParentCategories
       */
      parentId:
        parentOnly === 'true'
          ? {
              equals: null,
            }
          : undefined,
    };
    const categoryCount = await this.prisma.category.count({
      where: whereConditions,
    });

    /**
     * If perPage is not provided, return all categories
     */

    const itemsPerPage = perPage || categoryCount;

    const paginate = createPaginator({
      page,
      perPage: itemsPerPage,
    });
    return paginate<CategoryEntity, Prisma.CategoryFindManyArgs>(
      this.prisma.category,
      {
        orderBy: { createdAt: 'desc' },
        where: whereConditions,
        include: { parent: true },
      },
      { page, perPage: itemsPerPage },
    );
  }

  async findOne(categoryId: string): Promise<CategoryEntity> {
    return await this.prisma.category.findUniqueOrThrow({
      where: { categoryId },
    });
  }

  async update({
    categoryId,
    data,
  }: UpdateCategoryArgs): Promise<CategoryEntity> {
    return await this.prisma.category.update({ where: { categoryId }, data });
  }

  async remove(categoryId: string): Promise<CategoryEntity> {
    return await this.prisma.category.delete({ where: { categoryId } });
  }
}
