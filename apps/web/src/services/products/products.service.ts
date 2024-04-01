'use server';

import { post, patch, remove, get } from '@services/fetch';
import {
  AddToFavoriteArgs,
  GetAllFavoriteProductArgs,
  GetAllProductArgs,
  ProductEntity,
  RemoveFromFavoriteArgs,
} from './products.type';

export const getAllProduct = async ({
  page,
  perPage,
  searchTerm,
  categoryIds,
  maxPrice,
  minPrice,
  sortField,
  sortOrder,
  path,
}: GetAllProductArgs) => {
  let query = `${path}?page=${page}`;
  if (perPage) {
    query += `&perPage=${perPage}`;
  }
  if (searchTerm) {
    query += `&searchTerm=${searchTerm}`;
  }
  if (categoryIds) {
    query += `&categoryIds=${categoryIds}`;
  }
  if (maxPrice) {
    query += `&maxPrice=${maxPrice}`;
  }
  if (minPrice) {
    query += `&minPrice=${minPrice}`;
  }
  if (sortField) {
    query += `&sortField=${sortField}`;
  }
  if (sortOrder) {
    query += `&sortOrder=${sortOrder}`;
  }
  return get(query);
};

export const getAllFavoriteProducts = async ({
  page,
  perPage,
  sortField,
  sortOrder,
}: GetAllFavoriteProductArgs) => {
  let query = `favorites?page=${page}`;
  if (perPage) {
    query += `&perPage=${perPage}`;
  }
  if (sortField) {
    query += `&sortField=${sortField}`;
  }
  if (sortOrder) {
    query += `&sortOrder=${sortOrder}`;
  }
  return get(query);
};

export const getProduct = (productId: string) => get(`products/${productId}`);

export const getPublicProduct = (productId: string) =>
  get(`public/products/${productId}`);

export const createProduct = async (data: ProductEntity) =>
  post('products', {
    ...data,
  });

export const updateProduct = async (data: ProductEntity) =>
  patch(`products/${data?.productId}`, data);

export const deleteProduct = async (productId?: string) =>
  remove(`products/${productId}`);

export const addToFavorite = async ({ productId }: AddToFavoriteArgs) =>
  post(`favorites/${productId}`, {});

export const removeFromFavorite = async ({
  productId,
}: RemoveFromFavoriteArgs) => remove(`favorites/${productId}`);

export const getFilterByFriendlyIds = async (friendlyIds: string) => {
  let query = `public/products/filter-by-friendly-ids`;
  if (friendlyIds?.length) {
    query += `?friendlyIds=${friendlyIds}`;
  }
  return get(query);
};
