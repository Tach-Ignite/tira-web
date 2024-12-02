'use client';

import Link from 'next/link';
import {
  TachColorAuthPages,
  TachColorShopConsoleRoutes,
  AccountSettingsRoutes,
} from '@src/routes';
import {
  LogoutIcon,
  SettingsIcon,
  HomeIcon,
  ConsoleIcon,
  OrgIcon,
} from '@src/icons';
import logout from '@services/logout';

export const consoleNavLinks = [
  {
    title: (
      <Link className="md:-mt-8" href={TachColorShopConsoleRoutes.Overview}>
        <ConsoleIcon className="w-16 h-16 dark:!text-white" />
      </Link>
    ),
    links: [
      {
        icon: HomeIcon,
        name: 'Overview',
        url: TachColorShopConsoleRoutes.Overview,
      },
      {
        icon: OrgIcon,
        name: 'Organizations',
        url: TachColorShopConsoleRoutes.Organizations,
      },
      // {
      //   icon: HomeIcon,
      //   name: 'Profile',
      //   url: AuthConsoleRoutes.Profile,
      // },
    ],
  },
];

export const consoleSettingsNavLinks = [
  {
    links: [
      {
        icon: SettingsIcon,
        name: 'Settings',
        url: AccountSettingsRoutes.AccountSettings,
      },
      {
        icon: LogoutIcon,
        name: 'Logout',
        iconClassName: 'rotate-180',
        url: TachColorAuthPages.Login,
        onClick: logout,
      },
    ],
  },
];
