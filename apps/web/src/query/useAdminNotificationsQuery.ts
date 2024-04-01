import { Pagination, PaginationArgs } from '@src/types/modules/pagination';
import {
  AdminNotificationService,
  AdminNotificationType,
  AdminNotificationsUnReadCount,
  UpdateAdminNotificationArgs,
} from '@services';
import { ApiResponse } from '@src/types/modules/apiResponseType';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllNotifications = (request: PaginationArgs) => {
  const keys = [ApiKeysEnum.GetAllAdminNotifications, request];
  const fetchFn = async () => {
    const data =
      await AdminNotificationService.fetchAdminNotifications(request);
    return data;
  };
  return useBaseQuery<ApiResponse<Pagination<AdminNotificationType>>>(
    keys,
    fetchFn,
  );
};

export const useGetUnReadNotificationsCount = () => {
  const keys = [ApiKeysEnum.GetAllUnreadNotificationCount];
  const fetchFn = async () => {
    const data = await AdminNotificationService.getAllUnreadNotificationCount();
    return data;
  };
  return useBaseQuery<ApiResponse<AdminNotificationsUnReadCount>>(
    keys,
    fetchFn,
    { refetchInterval: 10 * 1000 },
  );
};

export const useUpdateAdminNotifications = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UpdateAdminNotificationArgs) => {
    const mutation =
      await AdminNotificationService.updateAdminNotification(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [
      ApiKeysEnum.GetAllAdminNotifications,
      ApiKeysEnum.GetAllUnreadNotificationCount,
    ],
  });
};
