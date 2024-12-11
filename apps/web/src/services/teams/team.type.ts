/* eslint-disable import/no-cycle */

import {
  OrganizationsEntity,
  OrgUsers,
} from '@services/organizations/organization.type';
import { Role } from '@services/users/users.type';
import { PaginationMetaType } from '@src/types/modules/pagination';

export interface GetAllTeamsArgs {
  page: number;
  perPage: number;
  searchTerm: string;
}

export interface CurrentTeamEntity {
  id?: string;
  teamFriendlyId?: string;
  name?: string;
  orgId?: string;
}

export interface TeamEntity {
  id?: string;
  teamFriendlyId: string;
  name: string;
  orgId: string;
  organization: OrganizationsEntity;
}

export interface TeamsEntity {
  id?: string;
  teamFriendlyId?: string;
  name?: string;
  highlights?: { id?: number; label: string; content: string }[];
  orgId?: string;
  organization?: OrganizationsEntity;
  teamUsers?: TeamUsers[];
  teamUsersCount?: number;
  _count?: {
    teamUsers?: number;
  };
}

export interface TeamUsers {
  id: string;
  teamId: string;
  team: TeamEntity;
  userId: string;
  role: Role;
  roleId: string;
}

export interface GetAllUsersByTeamIdListsArgs {
  page: number;
  perPage: number;
  teamId: string;
  searchTerm: string;
}

export interface UserConsoleTeamUsersResponseType {
  data: [];
  currentUser: {
    readAccess: boolean;
    writeAccess: boolean;
    role: Role;
  };
  meta: PaginationMetaType;
}
