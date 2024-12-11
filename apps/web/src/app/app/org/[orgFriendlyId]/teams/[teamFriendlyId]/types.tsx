/* eslint-disable no-unused-vars */

'use client';

import logout from '@services/logout';

import { TeamConsoleRoutes } from '@src/routes';

export enum TeamConsoleNavigationEnum {
  Overview = 'Overview',
  TeamMembers = 'Members',
  TeamSettings = 'Settings',
}

export const TeamConsoleNavigations = [
  {
    name: TeamConsoleNavigationEnum.Overview,
    url: TeamConsoleRoutes.Overview,
  },
  {
    name: TeamConsoleNavigationEnum.TeamMembers,
    url: TeamConsoleRoutes.TeamMembers,
    showCurrentPathBreadcrumb: false,
  },
  {},
  {
    name: TeamConsoleNavigationEnum.TeamSettings,
    url: TeamConsoleRoutes.TeamSettings,
    showCurrentPathBreadcrumb: false,
  },
  {
    name: 'Logout',
    onClick: logout,
    showCurrentPathBreadcrumb: false,
  },
];
