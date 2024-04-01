import {
  AddToFavoriteArgs,
  FavoriteProductEntity,
  GetAllFavoriteProductArgs,
  GetAllProductArgs,
  ProductEntity,
  ProductService,
  RemoveFromFavoriteArgs,
} from '@services';
import { Pagination, PaginationMetaType } from '@src/types/modules/pagination';
import { useAuthContext } from '@context/AuthContext';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllProducts = (request: GetAllProductArgs) => {
  const { isAuthenticated } = useAuthContext();
  const keys = [
    ApiKeysEnum.GetAllProducts,
    request.page,
    request,
    isAuthenticated,
  ];
  const fetchFn = async () => {
    const data = await ProductService.getAllProduct({
      ...request,
      path: isAuthenticated ? 'products' : 'public/products',
    });
    return data;
  };
  return useBaseQuery<Pagination<ProductEntity>>(keys, fetchFn);
};

export const useGetAllFavoriteProducts = (
  request: GetAllFavoriteProductArgs,
) => {
  const keys = [ApiKeysEnum.GetAllFavoriteProducts, request.page, request];
  const fetchFn = async () => {
    const data = await ProductService.getAllFavoriteProducts({
      ...request,
    });
    return data.data;
  };
  return useBaseQuery<{
    favorites: FavoriteProductEntity[];
    meta: PaginationMetaType;
  }>(keys, fetchFn);
};

export const useGetFilteredFriendlyIdProducts = (friendlyIds: string) => {
  const keys = [ApiKeysEnum.GetAllFriendlyIdProducts, friendlyIds];
  const fetchFn = async () => {
    const data = await ProductService.getFilterByFriendlyIds(friendlyIds);
    return data;
  };
  return useBaseQuery<{ data: ProductEntity[] }>(keys, fetchFn);
};

export const useGetProduct = (productId: string) => {
  const { isAuthenticated } = useAuthContext();
  const keys = [ApiKeysEnum.GetProduct, productId, isAuthenticated];
  const fetchFn = async () => {
    const data = isAuthenticated
      ? await ProductService.getProduct(productId)
      : await ProductService.getPublicProduct(productId);
    return data;
  };
  return useBaseQuery<ProductEntity>(keys, fetchFn);
};

export const useCreateProduct = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: ProductEntity) => {
    const mutation = await ProductService.createProduct(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetProduct],
  });
};

export const useUpdateProduct = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: ProductEntity) => {
    const mutation = await ProductService.updateProduct(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetProduct],
  });
};

export const useDeleteProduct = (request: UseBaseMutationConfig) => {
  const mutationFn = async (productId: string) => {
    const mutation = await ProductService.deleteProduct(productId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetProduct, ApiKeysEnum.GetAllProducts],
  });
};

export const useAddToFavoriteProduct = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: AddToFavoriteArgs) => {
    const mutation = await ProductService.addToFavorite(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [
      ApiKeysEnum.GetAllProducts,
      ApiKeysEnum.GetProduct,
      ApiKeysEnum.GetAllFavoriteProducts,
      ApiKeysEnum.GetCartItems,
    ],
  });
};

export const useRemoveFromFavoriteProduct = (
  request: UseBaseMutationConfig,
) => {
  const mutationFn = async (request: RemoveFromFavoriteArgs) => {
    const mutation = await ProductService.removeFromFavorite(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [
      ApiKeysEnum.GetAllProducts,
      ApiKeysEnum.GetProduct,
      ApiKeysEnum.GetCartItems,
      ApiKeysEnum.GetAllFavoriteProducts,
    ],
  });
};
