import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiAbstractResponse } from '@common/decorators';
import { CategoryEntity } from './entities/category.entity';
import { AbstractApiResponse } from '@src/utils/general-response';
import { ApiAbstractPaginationResponse } from '@common/decorators/abstractPaginationResponse.decorator';
import { SearchCategoryDto } from './dto/search-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { Roles } from '@src/utils/roles.enums';
import { Public } from '@common/decorators/public.decorators';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @RoleAccess([Roles.ORG_ADMIN])
  @Post()
  @ApiAbstractResponse({ model: CategoryEntity, statusCode: 'CREATED' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<AbstractApiResponse<CategoryEntity>> {
    const category = await this.categoriesService.create(createCategoryDto);
    return AbstractApiResponse.created(category, 'Category has been created!');
  }

  @Get()
  @Public()
  @ApiAbstractPaginationResponse(CategoryEntity)
  async findAll(@Query() query: SearchCategoryDto) {
    const { data, meta } = await this.categoriesService.findAll(query);
    const categories = data.map((val) => new CategoryEntity(val));
    return AbstractApiResponse.success({ data: categories, meta });
  }

  @RoleAccess([Roles.ORG_ADMIN])
  @Patch(':categoryId')
  @ApiAbstractResponse({ model: CategoryEntity })
  async update(
    @Param('categoryId') categoryId: string,
    @Body() data: UpdateCategoryDto,
  ): Promise<AbstractApiResponse<CategoryEntity>> {
    const category = await this.categoriesService.update({ categoryId, data });
    return AbstractApiResponse.success(category, 'Category has been updated!');
  }

  @RoleAccess([Roles.ORG_ADMIN])
  @Delete(':categoryId')
  @ApiAbstractResponse({ model: CategoryEntity })
  async remove(
    @Param('categoryId') categoryId: string,
  ): Promise<AbstractApiResponse<CategoryEntity>> {
    const category = await this.categoriesService.remove(categoryId);
    return AbstractApiResponse.success(category, 'Category has been deleted!');
  }

  @RoleAccess([Roles.ORG_ADMIN])
  @Get(':categoryId')
  @ApiAbstractResponse({ model: CategoryEntity })
  async findOne(
    @Param('categoryId') categoryId: string,
  ): Promise<AbstractApiResponse<CategoryEntity>> {
    const category = await this.categoriesService.findOne(categoryId);
    return AbstractApiResponse.success(category);
  }
}
