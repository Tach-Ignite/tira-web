/* eslint-disable import/no-cycle */

import { OrganizationsEntity } from '@services/organizations/organization.type';
import { Role } from '@services/users/users.type';

export interface GetAllTeamsArgs {
  page: number;
  perPage: number;
  searchTerm: string;
}

export interface TeamEntity {
  name: string;
  orgId: string;
  organization: OrganizationsEntity;
}

export interface TeamsEntity {
  id: string;
  name: string;
  highlights?: { id?: number; label: string; content: string }[];
  organization: OrganizationsEntity;
}

export interface TeamUsers {
  id: string;
  teamId: string;
  team: TeamEntity;
  userId: string;
  role: Role;
  roleId: string;
}
