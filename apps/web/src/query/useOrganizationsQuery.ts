import {
  GetAllOrganizationsArgs,
  OrganizationsEntity,
  OrganizationsService,
} from '@services';
import { Pagination } from '@src/types/modules/pagination';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllOrganizations = (request: GetAllOrganizationsArgs) => {
  const keys = [
    ApiKeysEnum.GetAllOrganizations,
    request.page,
    request.searchTerm,
    request,
  ];
  const fetchFn = async () => {
    const data = await OrganizationsService.getAllOrganizations(request);
    if (data.error) {
      throw data;
    }
    return data;
  };
  return useBaseQuery<Pagination<OrganizationsEntity>>(keys, fetchFn, {});
};

export const useGetSingleOrganization = (orgId: string) => {
  const keys = [ApiKeysEnum.GetSingleOrganization, orgId];
  const fetchFn = async () => {
    const data = await OrganizationsService.getSingleOrganization(orgId);
    return data;
  };
  return useBaseQuery<OrganizationsEntity>(keys, fetchFn);
};

export const useDeleteOrgUser = (request: UseBaseMutationConfig) => {
  const mutationFn = async ({
    orgId,
    userId,
  }: {
    orgId: string;
    userId: string;
  }) => {
    const mutation = await OrganizationsService.deleteOrgUser(orgId, userId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllAdminConsoleUsers],
  });
};
