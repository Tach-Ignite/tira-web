/* eslint-disable no-unused-vars */
import { CategoryType } from '@services/category/category.type';
import { SortOrderEnum } from '@src/types/modules';

export interface ProductEntity {
  productId: string;
  productImageUrl?: string[];
  title?: string;
  description?: string;
  brand?: string;
  friendlyId?: string;
  quantity?: number;
  msrpPrice: number;
  salePrice: number;
  categories?: CategoryType[];
  createdAt?: Date;
  updatedAt?: Date;
  saleStartDate?: Date;
  saleEndDate?: Date;
  shippingDetails?: string;
  isFavorite?: boolean;
}

export interface FavoriteProductEntity {
  productId: string;
  userId: string;
  product: ProductEntity;
}

export enum ProductSortFields {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PRICE = 'salePrice',
  TITLE = 'title',
}

export interface GetAllProductArgs {
  page: number;
  perPage: number;
  searchTerm?: string;
  categoryIds?: string;
  path?: string;
  minPrice?: string;
  maxPrice?: string;
  sortOrder?: SortOrderEnum;
  sortField?: ProductSortFields;
}

export interface GetAllFavoriteProductArgs {
  page: number;
  perPage: number;
  sortOrder?: SortOrderEnum;
  sortField?: ProductSortFields;
}

export interface AddToFavoriteArgs {
  productId: string;
}

export interface RemoveFromFavoriteArgs {
  productId: string;
}
