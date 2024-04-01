import { GetAllServicesArgs, ServicesEntity, ServicesService } from '@services';
import { Pagination, PaginationMetaType } from '@src/types/modules/pagination';

import BookingServiceType from '@src/app/services/types';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllServices = (request: GetAllServicesArgs) => {
  const keys = [ApiKeysEnum.GetAllServices, request.page, request];
  const fetchFn = async () => {
    const { data } = await ServicesService.getAllServices({
      ...request,
    });

    return data;
  };
  return useBaseQuery<Pagination<ServicesEntity>>(keys, fetchFn);
};

export const useGetService = (serviceId: string) => {
  const keys = [ApiKeysEnum.GetService, serviceId];
  const fetchFn = async () => {
    const data = await ServicesService.getService(serviceId);

    return data?.data;
  };
  return useBaseQuery<ServicesEntity>(keys, fetchFn);
};

export const useCreateService = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: ServicesEntity) => {
    const mutation = await ServicesService.createServices(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetService],
  });
};

export const useUpdateService = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: ServicesEntity) => {
    const mutation = await ServicesService.updateServices(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetService],
  });
};

export const useDeleteService = (request: UseBaseMutationConfig) => {
  const mutationFn = async (serviceId: string) => {
    const mutation = await ServicesService.deleteService(serviceId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetService, ApiKeysEnum.GetAllServices],
  });
};

export const useGetServices = (request: GetAllServicesArgs) => {
  const keys = [ApiKeysEnum.GetServices, request];
  const fetchFn = async () => {
    const query = await ServicesService.getAllServices(request);
    return query.data;
  };
  return useBaseQuery<{ services: ServicesEntity[]; meta: PaginationMetaType }>(
    keys,
    fetchFn,
  );
};

export const useGetUniqueService = (serviceId: string) => {
  const keys = [ApiKeysEnum.GetUniqueService, serviceId];
  const fetchFn = async () => {
    const query = await ServicesService.getService(serviceId);
    return query.data;
  };
  return useBaseQuery<ServicesEntity>(keys, fetchFn);
};

export const useGetServiceSlots = (serviceId: string, date: string) => {
  const keys = [ApiKeysEnum.GetServiceSlots, serviceId, date];
  const fetchFn = async () => {
    const { data } = await ServicesService.getServiceSlots(serviceId, date);
    return data;
  };
  return useBaseQuery<any>(keys, fetchFn);
};

export const useCreateBookingService = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: BookingServiceType) => {
    const mutation = await ServicesService.createBookingServices(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetService],
  });
};
