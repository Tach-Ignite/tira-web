import { SearchFavoritePaginationDto } from './dto/search-favorite-product.dto';

export interface CreateFavoriteArgs {
  userId: string;
  productId: string;
}
export interface FavoritesFindAllArgs {
  query: SearchFavoritePaginationDto;
  userId?: string;
}

export type RemoveFavoriteArgs = CreateFavoriteArgs;
