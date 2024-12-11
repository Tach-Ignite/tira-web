import {
  GetAllOrganizationsArgs,
  OrganizationsEntity,
  OrganizationsService,
  GetAllUsersByOrgIdListsArgs,
  UserConsoleOrgUsersResponseType,
  OrgUserRoles,
  OrgUsers,
  TeamUserRoles,
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

export const useGetSingleOrganizationByFriendlyId = (orgFriendlyId: string) => {
  const keys = [ApiKeysEnum.GetSingleOrganizationByFriendlyId, orgFriendlyId];
  const fetchFn = async () => {
    const data =
      await OrganizationsService.getSingleOrganizationByFriendlyId(
        orgFriendlyId,
      );
    if (data.error) {
      throw data;
    }
    return data;
  };
  return useBaseQuery<OrganizationsEntity>(keys, fetchFn);
};

export const useUpdateOrganizationProfile = (
  request: UseBaseMutationConfig,
) => {
  const mutationFn = async (request: OrganizationsEntity) => {
    const mutation = await OrganizationsService.updateOrganizationProfile(
      request?.orgFriendlyId || '',
      request,
    );
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleOrganizationByFriendlyId],
  });
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

export const useLeaveOrganizationUser = (request: UseBaseMutationConfig) => {
  const mutationFn = async (orgFriendlyId: string) => {
    const mutation =
      await OrganizationsService.leaveOrganizationUser(orgFriendlyId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleOrganizationByFriendlyId],
  });
};

export const useDeleteOrganization = (request: UseBaseMutationConfig) => {
  const mutationFn = async (orgFriendlyId: string) => {
    const mutation =
      await OrganizationsService.deleteOrganization(orgFriendlyId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleOrganizationByFriendlyId],
  });
};

export const useGetAllUsersByOrgIdOrTeamId = (
  request: GetAllUsersByOrgIdListsArgs,
) => {
  const keys = [ApiKeysEnum.GetAllUsersByOrgId, request?.page, request];
  const fetchFn = async () => {
    const data = await OrganizationsService.getAllUsersByOrgIdOrTeamId(request);
    if (data.error) {
      throw data.error;
    }
    return data;
  };
  return useBaseQuery<Pagination<UserConsoleOrgUsersResponseType>>(
    keys,
    fetchFn,
  );
};

export const useUpdateOrganizationUserRole = (
  request: UseBaseMutationConfig,
) => {
  const mutationFn = async (request: {
    orgId: string;
    userId: string;
    data: OrgUserRoles;
  }) => {
    const mutation = await OrganizationsService.updateOrganizationUserRole(
      request.orgId,
      request.userId,
      request.data,
    );
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllUsersByOrgId],
  });
};

export const useGetOrgUserData = (orgId: string, userId: string) => {
  const keys = [ApiKeysEnum.GetOrgUserData, orgId, userId];
  const fetchFn = async () => {
    const data = await OrganizationsService.getOrgUserData(orgId, userId);
    if (data.error) {
      throw data;
    }
    return data;
  };
  return useBaseQuery<OrgUsers>(keys, fetchFn);
};

export const useUpdateTeamUserRole = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: {
    orgId: string;
    teamId: string;
    userId: string;
    data: TeamUserRoles;
  }) => {
    const mutation = await OrganizationsService.updateTeamUserRole(
      request.orgId,
      request.teamId,
      request.userId,
      request.data,
    );
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllUsersByOrgId],
  });
};
