/* eslint-disable import/no-cycle */
/* eslint-disable import/export */
/* eslint-disable no-use-before-define */

import { Role, UserEntity } from '@services/users/users.type';
import { TeamsEntity } from '@services/teams/team.type';
import { PaginationMetaType } from '@src/types/modules/pagination';

export interface OrganizationsEntity {
  id?: string;
  name?: string;
  orgFriendlyId?: string;
  logoUrl?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  websiteURL?: string;
  linkedInURL?: string;
  companyEmail?: string;
  companyPhone?: string;
  contactName?: string;
  contactPhone?: string;
  updatedAt?: string;
  contactEmail?: string;
  createdAt?: string;
  orgUsers?: OrgUsers[];
  teams?: TeamsEntity[];
}

export interface OrgUsers {
  id: string;
  orgId: string;
  userId?: string;
  organizations: OrganizationsEntity;
  role: Role;
  roleId: string;
  users: UserEntity;
}

export interface GetAllOrganizationsArgs {
  page: number;
  perPage: number;
  searchTerm: string;
}

export interface GetAllUsersByOrgIdListsArgs {
  page: number;
  perPage: number;
  orgId?: string;
  teamId?: string;
  searchTerm: string;
}

export interface UserConsoleOrgUsersResponseType {
  data: [];
  meta: PaginationMetaType;
}

export interface OrgUserRoles {
  role: 'org-admin' | 'org-member' | 'remove';
}

export interface TeamUserRoles {
  role: 'team-admin' | 'team-member' | 'remove';
}
