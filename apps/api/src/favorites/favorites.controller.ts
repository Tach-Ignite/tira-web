import {
  Controller,
  Post,
  Param,
  Delete,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '@common/decorators';
import { AbstractApiResponse } from '@src/utils/general-response';
import { LoggerService } from '@common/logger/logger.service';
import { FavoriteEntity } from './entities/favorite.entity';
import { ApiAbstractResponse } from '@common/decorators';
import { SearchFavoritePaginationDto } from './dto/search-favorite-product.dto';
import { ProductEntity } from '@src/products/entities/product.entity';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private logger: LoggerService,
  ) {}

  @Get()
  async findAll(
    @Query() query: SearchFavoritePaginationDto,
    @GetCurrentUserId() userId: string,
  ) {
    try {
      const { data, meta } = await this.favoritesService.findAll({
        query,
        userId,
      });
      const favorites = data.map((favorite) => {
        favorite.product = new ProductEntity(favorite.product);
        return favorite;
      });
      return AbstractApiResponse.success({ favorites, meta });
    } catch (error) {
      this.logger.error('Error Fetching to favorites', error);
      return AbstractApiResponse.failure(
        error,
        'Error Fetching favorites. Please try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':productId')
  @ApiAbstractResponse({ model: FavoriteEntity, statusCode: 'CREATED' })
  async create(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    try {
      const favorite = await this.favoritesService.create({
        productId,
        userId,
      });
      return AbstractApiResponse.created<FavoriteEntity>(
        favorite,
        'Added to Favorites!',
      );
    } catch (error) {
      this.logger.error('Error adding to favorites', error);
      return AbstractApiResponse.failure(
        error,
        'Error adding to favorites. Please try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':productId')
  @ApiAbstractResponse({ model: FavoriteEntity, statusCode: 'OK' })
  async remove(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    try {
      const favorite = await this.favoritesService.remove({
        productId,
        userId,
      });
      return AbstractApiResponse.success(favorite, 'Removed from Favorites!');
    } catch (error) {
      this.logger.error('Error removing from favorites', error);
      return AbstractApiResponse.failure(
        error,
        'Error removing from favorites. Please try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
