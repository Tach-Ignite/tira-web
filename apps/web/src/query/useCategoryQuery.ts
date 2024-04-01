import {
  CategoryService,
  CategoryType,
  CreateCategoryArgs,
  GetAllCategoryArgs,
  UpdateCategoryArgs,
} from '@services';
import { ApiResponse } from '@src/types/modules/apiResponseType';
import { Pagination } from '@src/types/modules/pagination';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllCategories = (request: GetAllCategoryArgs) => {
  const keys = [ApiKeysEnum.GetAllCategories, request];
  const fetchFn = async () => {
    const data = await CategoryService.getAllCategories(request);
    return data;
  };
  return useBaseQuery<ApiResponse<Pagination<CategoryType>>>(keys, fetchFn);
};

export const useGetCategory = (categoryId: string) => {
  const keys = [ApiKeysEnum.GetCategory, categoryId];
  const fetchFn = async () => {
    const data = await CategoryService.getCategory(categoryId);
    return data;
  };
  return useBaseQuery<ApiResponse<CategoryType>>(keys, fetchFn);
};

export const useUpdateCategory = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UpdateCategoryArgs) => {
    const mutation = await CategoryService.updateCategory(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllCategories, ApiKeysEnum.GetCategory],
  });
};

export const useCreateCategory = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: CreateCategoryArgs) => {
    const mutation = await CategoryService.createCategory(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllCategories],
  });
};

export const useDeleteCategory = (request: UseBaseMutationConfig) => {
  const mutationFn = async ({ categoryId }: { categoryId: string }) => {
    const mutation = await CategoryService.deleteCategory(categoryId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllCategories],
  });
};
