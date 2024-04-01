import { ApiResponse } from '@src/types/modules/apiResponseType';
import { PaginationArgs } from '@src/types/modules/pagination';

export interface CategoryType {
  categoryId: string;
  name: string;
  parentId?: string;
  parent?: CategoryType;
}

export type CategoryResponseType = ApiResponse<CategoryType>;

export interface GetAllCategoryArgs extends PaginationArgs {
  categoryId?: string;
  parentOnly?: boolean;
}

export interface CreateCategoryArgs {
  name: string;
  parentId?: string;
}

export interface UpdateCategoryArgs {
  categoryId: string;
  name?: string;
  parentId?: string;
}
