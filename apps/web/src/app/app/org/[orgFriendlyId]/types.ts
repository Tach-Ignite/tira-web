/* eslint-disable no-unused-vars */

'use client';

import logout from '@services/logout';

import { OrgConsoleRoutes } from '@src/routes';

export enum OrgConsoleNavigationEnum {
  Overview = 'Overview',
  OrganizationProfile = 'Organization Profile',
  OrganizationTeams = 'Teams',
  OrganizationUsers = 'Users',
  OrganizationSettings = 'Settings',
}

export const orgConsoleNavigations = [
  {
    name: OrgConsoleNavigationEnum.Overview,
    url: OrgConsoleRoutes.Overview,
  },
  {
    name: OrgConsoleNavigationEnum.OrganizationProfile,
    url: OrgConsoleRoutes.OrganizationProfile,
    showCurrentPathBreadcrumb: false,
  },
  {
    name: OrgConsoleNavigationEnum.OrganizationTeams,
    url: OrgConsoleRoutes.OrganizationTeams,
    showCurrentPathBreadcrumb: false,
  },
  {
    name: OrgConsoleNavigationEnum.OrganizationUsers,
    url: OrgConsoleRoutes.OrganizationUsers,
    showCurrentPathBreadcrumb: false,
  },
  {},
  {
    name: OrgConsoleNavigationEnum.OrganizationSettings,
    url: OrgConsoleRoutes.OrganizationSettings,
    showCurrentPathBreadcrumb: false,
  },
  {
    name: 'Logout',
    onClick: logout,
    showCurrentPathBreadcrumb: false,
  },
];
