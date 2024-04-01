import { SearchProductPaginationDto } from './dto/get-product.dto';

export interface ProductFindAllArgs {
  query: SearchProductPaginationDto;
  userId?: string;
}

export interface ProductsFindOneArgs {
  productId: string;
  userId?: string;
}
