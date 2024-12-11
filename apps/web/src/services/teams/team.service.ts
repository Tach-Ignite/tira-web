'use server';

import { get, remove } from '@services/fetch';
import { GetAllTeamsArgs, GetAllUsersByTeamIdListsArgs } from './team.type';

export const getAllTeamsByOrganizationID = async (
  organizationId: string,
  paginationDto: GetAllTeamsArgs,
) => {
  const { page, perPage, searchTerm } = paginationDto || {};

  const teamsData = await get(
    `teams/organization/${organizationId}?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`,
  );
  return teamsData;
};

export const getSingleTeam = async (teamFriendlyId: string) => {
  const teamData = await get(`teams/${teamFriendlyId}`);
  return teamData;
};

export const deleteTeamUser = async (teamId: string, userId: string) => {
  const teamUsersData = await remove(
    `team-users/${teamId}/remove-user/${userId}`,
  );
  return teamUsersData;
};

export const leaveTeam = async (teamId: string) => {
  const teamUsersData = await remove(`team-users/${teamId}/leave`);
  return teamUsersData;
};

export const getAllUsersByTeamId = async ({
  page,
  perPage,
  searchTerm,
  teamId,
}: GetAllUsersByTeamIdListsArgs) => {
  let query = `team-users?page=${page}`;
  if (perPage) {
    query += `&perPage=${perPage}`;
  }
  if (searchTerm) {
    query += `&searchTerm=${searchTerm}`;
  }
  if (teamId) {
    query += `&teamId=${teamId}`;
  }
  const usersData = await get(query);
  return usersData;
};
