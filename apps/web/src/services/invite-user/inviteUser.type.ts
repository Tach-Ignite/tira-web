import { OrganizationsEntity } from '@services/organizations/organization.type';
import { TeamsEntity } from '@services/teams/team.type';
import { UserRole } from '@services/users/users.type';

export interface InviteUserEntityArgs {
  email: string;
  teamId?: string;
  orgId: string;
  isOrgTeamAdmin?: boolean;
}

export interface InviteEntity {
  id: string;
  email: string;
  teamId?: string;
  team?: TeamsEntity;
  orgId: string;
  organization?: OrganizationsEntity;
  inviteType: string;
  roleId: string;
  role?: UserRole;
  error?: string;
}
