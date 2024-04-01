'use client';

import {
  UpdateCartRequest,
  CartService,
  AddProductRequest,
  RemoveFromCartRequest,
  CartEntity,
} from '@services';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useFetchCartDetails = () => {
  const keys = [ApiKeysEnum.GetCartItems];
  const fetchFn = async () => {
    const data = await CartService.fetchCarts();
    return data;
  };
  return useBaseQuery<CartEntity>(keys, fetchFn);
};

export const useUpdateCartItem = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UpdateCartRequest) => {
    const mutation = await CartService.updateCart(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetCartItems],
  });
};

export const useRemoveAllItemsFromCart = (request: UseBaseMutationConfig) => {
  const mutationFn = async () => {
    const mutation = await CartService.removeAllItemsFromCart();
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [
      ApiKeysEnum.RemoveAllItemsFromCart,
      ApiKeysEnum.GetCartItems,
    ],
  });
};

export const useAddToCart = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: AddProductRequest) => {
    const mutation = await CartService.addToCart(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetCartItems],
  });
};

export const useRemoveFromCart = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: RemoveFromCartRequest) => {
    const mutation = await CartService.deleteCart(request.productId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetCartItems],
  });
};
