import { AdminProfileService } from '@services';
import { ApiResponse } from '@src/types/modules/apiResponseType';
import { AdminProfileEntity } from '@services/adminProfile/adminProfile.type';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAdminProfile = () => {
  const keys = [ApiKeysEnum.GetSingleInquiry];
  const fetchFn = async () => {
    const data = await AdminProfileService.getAdminProfile();
    return data;
  };
  return useBaseQuery<ApiResponse<AdminProfileEntity>>(keys, fetchFn);
};

export const useUpdateAdminProfile = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: AdminProfileEntity) => {
    const mutation = await AdminProfileService.updateAdminProfile(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleInquiry],
  });
};
