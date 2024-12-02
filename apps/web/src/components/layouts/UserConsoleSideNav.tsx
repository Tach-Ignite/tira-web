/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */

'use client';

import {
  consoleNavLinks,
  consoleSettingsNavLinks,
} from '@src/constants/navLinks';
import { SidebarItems, Sidebar, SidebarItemGroup } from '@src/flowbite';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarCollapse } from 'flowbite-react';
// import { useGetCurrentUser } from '@queries/useProfileQuery';
import { UserConsoleSideNavType, UserConsoleSideNavProps } from './type';

const activeClass =
  '!text-black dark:!text-white dark:hover:!text-black border-l-[4px] border-primary';

const hoverClass = 'hover:!text-black hover:bg-info hover:shadow-2xl';

const linkClass =
  'flex items-center py-3 px-4 text-sm font-medium text-black dark:text-white cursor-pointer capitalize gap-3';

function UserConsoleSideNav(props: UserConsoleSideNavProps) {
  const { isAdmin = false } = props;
  const currentPath = usePathname();

  // const { data: user } = useGetCurrentUser();

  const renderNavLinks = (links: UserConsoleSideNavType[]) =>
    links?.map(({ links, title }, index) => {
      const isStringTitle = typeof title === 'string';

      const filteredLinks = links;

      return filteredLinks?.length ? (
        <div key={links?.[0]?.name || index}>
          {title ? (
            <div
              className={`mb-10 mt-0 ${isStringTitle ? 'font-semibold text-sm uppercase text-black dark:text-gray10 !mb-5' : ''}`}
            >
              {title}
            </div>
          ) : null}
          <div className="flex flex-col gap-1">
            {filteredLinks?.map(
              ({
                icon: Icon,
                name,
                url = '',
                subLinks,
                iconClassName = '',
                onClick,
              }) => {
                const isActive = currentPath.includes(url);

                const onLogout = () => {
                  onClick?.();
                };

                return subLinks?.length ? (
                  <SidebarCollapse
                    icon={Icon}
                    key={name}
                    label={name}
                    theme={{
                      button: `${linkClass}`,
                      icon: { base: 'h-6 w-6 text-black dark:text-white' },
                    }}
                    className={`px-4 ${hoverClass}`}
                  >
                    {subLinks?.map(({ name: subLinkName, url: subLinkUrl }) => (
                      <Link
                        href={subLinkUrl}
                        key={subLinkName}
                        className={`ml-9 ${linkClass} ${isActive ? activeClass : ''} ${hoverClass}`}
                      >
                        {subLinkName}
                      </Link>
                    ))}
                  </SidebarCollapse>
                ) : typeof onClick === 'function' ? (
                  <div
                    key={name}
                    onClick={onLogout}
                    className={`${linkClass} ${isActive ? activeClass : ''} ${hoverClass}`}
                  >
                    {Icon && <Icon className={`h-6 w-6 ${iconClassName}`} />}
                    {name}
                  </div>
                ) : (
                  <Link
                    href={url}
                    key={name}
                    className={`${linkClass} ${isActive ? activeClass : ''} ${hoverClass}`}
                  >
                    {Icon && <Icon className={`h-6 w-6 ${iconClassName}`} />}
                    {name}
                  </Link>
                );
              },
            )}
          </div>
        </div>
      ) : null;
    });

  return (
    <Sidebar
      theme={{
        root: {
          inner: 'px-8 pb-10 pt-0 !bg-transparent rounded-0 w-max',
        },
      }}
      className="lg:!block hidden"
    >
      <SidebarItems>
        <SidebarItemGroup>
          {renderNavLinks(consoleNavLinks)}
          <div className="flex-1 h-px !mt-24 !mb-4 bg-lightGray dark:bg-white" />
          {renderNavLinks(consoleSettingsNavLinks)}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default UserConsoleSideNav;
