'use server';

import { get, patch, post, remove } from '@services/fetch';
import { AddProductRequest, UpdateCartRequest } from './cart.type';

export const fetchCarts = async () => get(`carts`);

export const updateCart = async (data: UpdateCartRequest) =>
  patch(`carts/items`, data);

export const removeAllItemsFromCart = async () => remove('carts');

export const addToCart = async (request: AddProductRequest) =>
  post('carts/items', request);

export const deleteCart = async (productId?: string) =>
  remove(`carts/items/${productId}`);
