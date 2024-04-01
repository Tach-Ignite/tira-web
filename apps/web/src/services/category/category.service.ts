'use server';

import { Pagination } from '@src/types/modules/pagination';
import { ApiResponse } from '@src/types/modules/apiResponseType';
import { post, patch, remove, get } from '@services/fetch';
import {
  CategoryResponseType,
  CategoryType,
  CreateCategoryArgs,
  GetAllCategoryArgs,
  UpdateCategoryArgs,
} from './category.type';

export const getAllCategories = async ({
  page = 1,
  perPage,
  searchTerm,
  categoryId,
  parentOnly,
}: GetAllCategoryArgs): Promise<ApiResponse<Pagination<CategoryType>>> => {
  let query = `categories?page=${page}`;
  if (perPage) {
    query += `&perPage=${perPage}`;
  }
  if (searchTerm) {
    query += `&searchTerm=${searchTerm}`;
  }
  if (categoryId) {
    query += `&categoryId=${categoryId}`;
  }
  if (parentOnly) {
    query += `&parentOnly=true`;
  }
  return get(query);
};

export const createCategory = async (
  request: CreateCategoryArgs,
): Promise<CategoryResponseType> => post('categories', request);

export const updateCategory = async ({
  categoryId,
  name,
  parentId,
}: UpdateCategoryArgs): Promise<CategoryResponseType> =>
  patch(`categories/${categoryId}`, { name, parentId });

export const getCategory = async (
  categoryId: string,
): Promise<CategoryResponseType> => get(`categories/${categoryId}`);

export const deleteCategory = async (
  categoryId: string,
): Promise<CategoryResponseType> => remove(`categories/${categoryId}`);
