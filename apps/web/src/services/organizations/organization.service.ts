'use server';

import { get, remove } from '@services/fetch';
import { GetAllOrganizationsArgs } from './organization.type';

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

export const deleteOrgUser = async (orgId: string, userId: string) => {
  const organizationDetails = await remove(
    `org-users/${orgId}/remove-user/${userId}`,
  );
  return organizationDetails;
};
