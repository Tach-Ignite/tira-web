'use server';

import { get, remove, patch } from '@services/fetch';
import {
  GetAllOrganizationsArgs,
  OrganizationsEntity,
  GetAllUsersByOrgIdListsArgs,
  OrgUserRoles,
  TeamUserRoles,
} from './organization.type';

export const getAllOrganizations = async ({
  page,
  perPage,
  searchTerm,
}: GetAllOrganizationsArgs) => {
  const organizationsData = await get(
    `organizations?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`,
  );
  return organizationsData;
};

export const getSingleOrganization = async (orgId: string) => {
  const organizationDetails = await get(`organizations/${orgId}`);
  return organizationDetails;
};

export const getSingleOrganizationByFriendlyId = async (
  orgFriendlyId: string,
) => {
  const organizationDetails = await get(`organizations/${orgFriendlyId}`);
  return organizationDetails;
};

export const deleteOrgUser = async (orgId: string, userId: string) => {
  const organizationDetails = await remove(
    `org-users/${orgId}/remove-user/${userId}`,
  );
  return organizationDetails;
};

export const updateOrganizationProfile = async (
  orgFriendlyId: string,
  data: OrganizationsEntity,
) => patch(`organizations/${orgFriendlyId}`, data);

export const leaveOrganizationUser = async (orgFriendlyId?: string) =>
  remove(`organizations/leave/${orgFriendlyId}`);

export const deleteOrganization = async (orgFriendlyId?: string) =>
  remove(`organizations/delete/${orgFriendlyId}`);

export const getAllUsersByOrgIdOrTeamId = async ({
  page,
  perPage,
  searchTerm,
  orgId,
  teamId,
}: GetAllUsersByOrgIdListsArgs) => {
  let query = `org-users?page=${page}`;
  if (perPage) {
    query += `&perPage=${perPage}`;
  }
  if (searchTerm) {
    query += `&searchTerm=${searchTerm}`;
  }
  if (orgId) {
    query += `&orgId=${orgId}`;
  }
  if (teamId) {
    query += `&teamId=${teamId}`;
  }
  return get(query);
};

export const updateOrganizationUserRole = async (
  orgId: string,
  userId: string,
  data: OrgUserRoles,
) => patch(`org-users/${orgId}/assign-user-role/${userId}`, data);

export const updateTeamUserRole = async (
  orgId: string,
  teamId: string,
  userId: string,
  data: TeamUserRoles,
) => patch(`team-users/${orgId}/${teamId}/assign-user-role/${userId}`, data);

export const getOrgUserData = async (orgId: string, userId: string) => {
  const orgUserData = await get(`org-users/${orgId}/user/${userId}`);
  return orgUserData;
};
