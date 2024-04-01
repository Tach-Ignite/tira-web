import {
  OrdersEntity,
  OrderService,
  GetAllOrdersArgs,
  OrderResponseType,
  UpdateOrderArgs,
} from '@services';
import { Pagination } from '@src/types/modules/pagination';
import { ApiResponse } from '@src/types/modules/apiResponseType';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';

export const useCreateOrders = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: OrdersEntity) => {
    const mutation = await OrderService.createOrders(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.CreateOrders, ApiKeysEnum.GetCartItems],
  });
};

export const useGetAllOrders = (request: GetAllOrdersArgs) => {
  const keys = [ApiKeysEnum.GetAllOrders, request.page, request];
  const fetchFn = async () => {
    const data = await OrderService.getAllOrders(request);
    return data;
  };
  return useBaseQuery<ApiResponse<Pagination<OrdersEntity>>>(keys, fetchFn);
};

export const useGetSingleOrder = (orderId: string) => {
  const keys = [ApiKeysEnum.GetSingleOrders, orderId];
  const fetchFn = async () => {
    const data = await OrderService.getSingleOrder(orderId);
    return data;
  };
  return useBaseQuery<OrderResponseType>(keys, fetchFn);
};

export const useUpdateOrder = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UpdateOrderArgs) => {
    const mutation = await OrderService.updateOrder(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleOrders],
  });
};

export const useCancelOrder = (request: UseBaseMutationConfig) => {
  const mutationFn = async (orderId: string) => {
    const mutation = await OrderService.cancelOrder(orderId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleOrders],
  });
};
