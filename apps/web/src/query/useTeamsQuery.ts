import { GetAllOrganizationsArgs, TeamsEntity, TeamsService } from '@services';
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

export const useGetSingleTeam = (teamId: string) => {
  const keys = [ApiKeysEnum.GetSingleTeam, teamId];
  const fetchFn = async () => {
    const data = await TeamsService.getSingleTeam(teamId);
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
