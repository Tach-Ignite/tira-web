import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiPaginatedResponse } from '@common/decorators/pagination.decorator';
import { ProductEntity } from './entities/product.entity';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@common/logger/logger.service';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { GetCurrentUserId } from '@common/decorators';
import { Roles } from '../utils/roles.enums';
import { SearchProductPaginationDto } from './dto/get-product.dto';
import { Public } from '@common/decorators/public.decorators';
import { FilterFriendlyIdProductsDto } from './dto/filterFriendlyId-product-dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Products')
@Controller()
@ApiCookieAuth()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post('products')
  @RoleAccess([Roles.ADMIN])
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get('products')
  @ApiPaginatedResponse(ProductEntity)
  async findAll(
    @Query() query: SearchProductPaginationDto,
    @GetCurrentUserId() userId: string,
  ) {
    const { data, meta } = await this.productsService.findAll({
      query,
      userId,
    });
    return { data: data.map((val) => new ProductEntity(val)), meta };
  }

  @Get('public/products/filter-by-friendly-ids')
  @Public()
  @ApiPaginatedResponse(ProductEntity)
  async filterByFriendlyIds(
    @Query() filterProductsDto: FilterFriendlyIdProductsDto,
  ) {
    const data = await this.productsService.filterByFriendlyIds(
      filterProductsDto.friendlyIds,
    );
    return { data: data.map((val) => new ProductEntity(val)) };
  }

  @Get('public/products')
  @Public()
  @UseInterceptors(CacheInterceptor)
  @ApiPaginatedResponse(ProductEntity)
  async getAll(@Query() query: SearchProductPaginationDto) {
    const { data, meta } = await this.productsService.findAll({
      query,
    });
    return { data: data.map((val) => new ProductEntity(val)), meta };
  }

  @Get('products/:productId')
  async findOne(
    @Param('productId') productId: string,
    @GetCurrentUserId() userId: string,
  ) {
    return new ProductEntity(
      await this.productsService.findOne({ productId, userId }),
    );
  }

  @Get('public/products/:productId')
  @Public()
  async findOnePublic(@Param('productId') productId: string) {
    return new ProductEntity(await this.productsService.findOne({ productId }));
  }

  @Patch('products/:productId')
  @RoleAccess([Roles.ADMIN])
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete('products/:productId')
  @RoleAccess([Roles.ADMIN])
  @ApiOkResponse({ type: ProductEntity })
  remove(@Param('productId') productId: string) {
    return this.productsService.remove(productId);
  }
}
