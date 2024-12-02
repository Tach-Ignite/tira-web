'use server';

import { get, remove } from '@services/fetch';
import { GetAllTeamsArgs } from './team.type';

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

export const getSingleTeam = async (teamId: string) => {
  const teamData = await get(`teams/${teamId}`);
  return teamData;
};

export const deleteTeamUser = async (teamId: string, userId: string) => {
  const teamUsersData = await remove(
    `team-users/${teamId}/remove-user/${userId}`,
  );
  return teamUsersData;
};
