/* eslint-disable no-unused-vars */
export enum UserRoles {
  SuperAdmin = 'super-admin',
  SystemAdmin = 'system-admin',
  OrgAdmin = 'org-admin',
  OrgMember = 'org-member',
  TeamAdmin = 'team-admin',
  TeamMember = 'team-member',
  User = 'user',
}

export enum UserTypeEnum {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export const RoleLabels = {
  'super-admin': 'Super Admin',
  'system-admin': 'System Admin',
  'org-admin': 'Org Admin',
  'org-member': 'Org Member',
  'team-admin': 'Team Admin',
  'team-member': 'Team Member',
  user: 'User',
};
