import {
  AdminDashboardOverviewType,
  DashboardService,
  GetDashboardOverviewArgs,
} from '@services';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';

export const useGetAdminDashboardOverview = (
  request: GetDashboardOverviewArgs,
) => {
  const keys = [ApiKeysEnum.GetAdminDashboardOverview, request];
  const fetchFn = async () => {
    const data = await DashboardService.getAdminDashboardData(request);
    return data;
  };
  return useBaseQuery<AdminDashboardOverviewType>(keys, fetchFn);
};
