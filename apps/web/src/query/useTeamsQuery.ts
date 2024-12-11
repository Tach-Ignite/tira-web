import {
  GetAllOrganizationsArgs,
  TeamsEntity,
  TeamsService,
  GetAllUsersByTeamIdListsArgs,
  UserConsoleTeamUsersResponseType,
} from '@services';
import { Pagination } from '@src/types/modules/pagination';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllTeamsByOrganizationId = (
  organizationId: string,
  paginationDto: GetAllOrganizationsArgs,
) => {
  const { page, perPage, searchTerm } = paginationDto || {};
  const keys = [
    ApiKeysEnum.GetAllTeamsByOrganizationId,
    page,
    perPage,
    searchTerm,
    paginationDto,
    organizationId,
  ];
  const fetchFn = async () => {
    try {
      const data = await TeamsService.getAllTeamsByOrganizationID(
        organizationId,
        paginationDto,
      );
      return data;
    } catch (e) {
      return e;
    }
  };
  return useBaseQuery<Pagination<TeamsEntity>>(keys, fetchFn);
};

export const useGetSingleTeam = (teamFriendlyId: string) => {
  const keys = [ApiKeysEnum.GetSingleTeam, teamFriendlyId];
  const fetchFn = async () => {
    const data = await TeamsService.getSingleTeam(teamFriendlyId);
    return data;
  };
  return useBaseQuery<TeamsEntity>(keys, fetchFn);
};

export const useDeleteTeamUser = (request: UseBaseMutationConfig) => {
  const mutationFn = async ({
    teamId,
    userId,
  }: {
    teamId: string;
    userId: string;
  }) => {
    const mutation = await TeamsService.deleteTeamUser(teamId, userId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllAdminConsoleUsers],
  });
};

export const useLeaveTeam = (request: UseBaseMutationConfig) => {
  const mutationFn = async ({ teamId }: { teamId: string }) => {
    const mutation = await TeamsService.leaveTeam(teamId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleTeam],
  });
};

export const useGetAllUsersByTeamId = (
  request: GetAllUsersByTeamIdListsArgs,
) => {
  const keys = [ApiKeysEnum.GetAllUsersByTeamId, request?.page, request];
  const fetchFn = async () => {
    const data = await TeamsService.getAllUsersByTeamId(request);
    if (data.error) {
      throw data.error;
    }
    return data;
  };
  return useBaseQuery<Pagination<UserConsoleTeamUsersResponseType>>(
    keys,
    fetchFn,
  );
};
