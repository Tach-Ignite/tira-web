/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import {
  IconType,
  OrganizationIcon,
  TeamsIcon,
  UsersIcon,
  ViewListIcon,
} from '@src/icons';
import { AdminConsoleRoutes } from '@src/routes';
import Link from 'next/link';
import { useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { adminConsoleSettingNavLinks } from '../navLinks';

interface SuperAdminNavOptions {
  url?: string;
  name?: string;
  isActive?: boolean;
  icon?: IconType;
}

const activeClass =
  '!px-2 shadow-3xl border border-gray-50 !text-indigo-600 dark:border-gray-500 dark:!text-yellow-400 dark:shadow-none';

const hoverClass =
  '!px-2 hover:shadow-3xl hover:outline-1 dark:hover:outline hover:outline-gray-50 hover:!text-indigo-600 dark:hover:outline-gray-500 dark:hover:!text-yellow-400 dark:hover:shadow-none';

const linkClass =
  'flex items-center rounded-lg p-1 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer capitalize gap-3';

function SideNavLinks() {
  const currentPath = usePathname();
  const { organizationId, teamId, userId } = useParams() || {};

  const getUserUrl = () => {
    if (organizationId && teamId) {
      return `${AdminConsoleRoutes.Organizations}/${organizationId}/teams/${teamId}/users`;
    }
    if (organizationId && !teamId) {
      return `${AdminConsoleRoutes.Organizations}/${organizationId}/users`;
    }
    return AdminConsoleRoutes.Users;
  };

  const superAdminNavLinks = useMemo(() => {
    if (organizationId && teamId) {
      return [
        {
          name: 'Overview',
          url: AdminConsoleRoutes.Overview,
          icon: ViewListIcon,
          isActive:
            Boolean(organizationId) &&
            Boolean(teamId) &&
            !currentPath?.includes('users') &&
            !userId,
        },

        {
          name: 'Users',
          url: getUserUrl(),
          icon: UsersIcon,
          isActive: currentPath?.includes('users') && !userId,
        },
      ];
    } else if (organizationId && !teamId) {
      return [
        {
          name: 'Overview',
          url: AdminConsoleRoutes.Overview,
          icon: ViewListIcon,
          isActive:
            Boolean(organizationId) &&
            !teamId &&
            !currentPath?.includes('teams') &&
            !currentPath?.includes('users'),
        },
        {
          name: 'Teams',
          url: `${AdminConsoleRoutes.Organizations}/${organizationId}/teams`,
          icon: TeamsIcon,
          isActive: currentPath?.includes('teams') && Boolean(organizationId),
        },
        {
          name: 'Users',
          url: getUserUrl(),
          icon: UsersIcon,
          isActive:
            currentPath?.includes('users') &&
            !userId &&
            Boolean(organizationId),
        },
      ];
    } else
      return [
        {
          name: 'Overview',
          url: AdminConsoleRoutes.Overview,
          icon: ViewListIcon,
          isActive: currentPath === AdminConsoleRoutes.Overview,
        },
        {
          name: 'Organizations',
          url: AdminConsoleRoutes.Organizations,
          icon: OrganizationIcon,
          isActive: currentPath === AdminConsoleRoutes.Organizations,
        },
        {
          name: 'Users',
          url: getUserUrl(),
          icon: UsersIcon,
          isActive: currentPath === AdminConsoleRoutes.Users,
        },
      ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId, teamId, currentPath]);

  return (
    <div className="pt-4 space-y-5">
      {superAdminNavLinks?.map((navOption: SuperAdminNavOptions) => {
        const { icon: Icon, name, url = '', isActive } = navOption || {};

        const renderLinks = () => (
          <Link
            href={url}
            key={name}
            className={`mx-5 ${linkClass} ${hoverClass} ${isActive ? activeClass : ''}`}
          >
            {Icon && <Icon className="h-6 w-6" />}
            {name}
          </Link>
        );

        return name && renderLinks();
      })}
      <div className="flex-1 h-px !mt-24 !mb-4 bg-gray-200 dark:bg-gray-700" />
      <div className="px-5 space-y-5">
        {adminConsoleSettingNavLinks?.map(
          ({ url, name, icon: Icon, onClick }) => {
            const isActive = url === currentPath;

            const onLogout = () => {
              onClick?.();
            };

            return typeof onClick === 'function' ? (
              <div
                key={name}
                onClick={onLogout}
                className={`${linkClass} ${isActive ? activeClass : ''} ${hoverClass}`}
              >
                {Icon && <Icon className="h-6 w-6" />}
                {name}
              </div>
            ) : (
              <Link
                href={url}
                key={name}
                className={`${linkClass} ${hoverClass} ${isActive ? activeClass : ''}`}
              >
                {Icon && <Icon className="h-6 w-6" />}
                {name}
              </Link>
            );
          },
        )}
      </div>
    </div>
  );
}

export default SideNavLinks;
