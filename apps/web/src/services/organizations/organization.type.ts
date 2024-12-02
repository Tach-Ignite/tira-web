/* eslint-disable import/no-cycle */
/* eslint-disable import/export */

import { Role } from '@services/users/users.type';

export interface OrganizationsEntity {
  id: string;
  orgFriendlyId: string;
  organizationName: string;
  website: string;
  name: string;
  highlights: { id?: number; label: string; content: string }[];
}

export interface OrgUsers {
  id: string;
  orgId: string;
  userId?: string;
  organizations: OrganizationsEntity;
  role: Role;
  roleId: string;
}

export interface GetAllOrganizationsArgs {
  page: number;
  perPage: number;
  searchTerm: string;
}
