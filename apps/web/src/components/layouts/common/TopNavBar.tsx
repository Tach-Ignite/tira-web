/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  DarkThemeToggle,
  MegaMenu,
  MegaMenuDropdown,
} from '@src/flowbite';
import { SolidBellIcon, HeartSolidIcon, ShoppingCartIcon } from '@src/icons';
import Link from 'next/link';
import { useFetchCartDetails } from '@queries';
import { useAuthContext } from '@context/AuthContext';
import { usePathname } from 'next/navigation';
import { useGetUnReadNotificationsCount } from '@queries/useAdminNotificationsQuery';
import { getInitials } from '@src/lib/string';
import logout from '../../../services/logout';
import { customerNavLinks, accountNavLinks } from '../navLinks';
import TachLogo from './TachLogo';

function TopNavBar() {
  const { isAuthenticated, authenticatedUser } = useAuthContext() || {};
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const pathname = usePathname() || '';

  const { data: { cartItems = [] } = {} } = useFetchCartDetails();

  const { data: { data: { unReadNotificationsCount = 0 } = {} } = {} } =
    useGetUnReadNotificationsCount();

  const {
    name = '',
    profileImage,
    firstName = '',
    lastName = '',
  } = authenticatedUser || {};

  const cartItemsCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems],
  );

  const isAdmin = pathname?.includes('admin') || false;

  const adminInitial = name ? getInitials(name || '') : '';
  const customerInitial =
    firstName || lastName ? getInitials(`${firstName} ${lastName}` || '') : '';

  const userInitial = isAdmin ? adminInitial : customerInitial;

  const profileNavLinks = useMemo(
    () =>
      isAdmin
        ? accountNavLinks?.filter(({ customerOnly }) => !customerOnly)
        : accountNavLinks,
    [isAdmin],
  );

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const imageUrl = profileImage
    ? `${process.env.BUCKET_PREFIX}${profileImage}`
    : undefined;

  const onLogout = () => {
    logout();
  };

  return (
    <div className="sticky top-0 z-50">
      <MegaMenu
        fluid
        theme={{
          root: {
            base: 'bg-white px-8 py-4 text-gray-900 dark:bg-gray-800 dark:text-white',
            inner: {
              base: `mx-auto flex flex-wrap min-[390px]:items-center justify-between ${isAuthenticated && 'max-[390px]:flex-col'} gap-y-3`,
            },
          },
        }}
      >
        <div className="flex items-center justify-between">
          <TachLogo />
          {!isAdmin && (
            <div className="ml-6 md:flex gap-6 font-medium text-base max-[655px]:hidden">
              {customerNavLinks?.map(({ url, name }) => (
                <Link key={name} href={url}>
                  {name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 max-xs:mt-4">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link href="/admin/notifications" className="relative mr-2">
                  {unReadNotificationsCount ? (
                    <div className="font-small absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
                      {unReadNotificationsCount}
                    </div>
                  ) : null}
                  <SolidBellIcon className="w-6 h-6" color="gray" />
                </Link>
              )}
              {isAdmin ? null : (
                <Link href="/account/favorites" className="relative mr-2">
                  <HeartSolidIcon className="w-6 h-6" color="gray" />
                </Link>
              )}
              {isAdmin ? null : (
                <Link href="/cart" className="relative mr-2">
                  {cartItemsCount ? (
                    <div className="font-small absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
                      {cartItemsCount}
                    </div>
                  ) : null}
                  <ShoppingCartIcon className="w-6 h-6" color="gray" />
                </Link>
              )}
              {isPageLoaded ? (
                <div className="hidden tab:!block z-50">
                  <MegaMenuDropdown
                    toggle={
                      <Avatar
                        size="sm"
                        img={profileImage ? imageUrl : undefined}
                        placeholderInitials={userInitial}
                        rounded
                        title="profile"
                        theme={{
                          root: {
                            initials: {
                              text: 'font-medium text-gray-900',
                              base: 'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-400',
                            },
                          },
                        }}
                      />
                    }
                  >
                    <div className="flex flex-col">
                      {profileNavLinks?.map(
                        ({ name, iconClass, icon: Icon, url = '' }) => {
                          const isActive = pathname === url;
                          return (
                            <div
                              key={name}
                              className={`flex gap-2 items-center px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white ${isActive ? '!text-indigo-600 dark:!text-yellow-400' : ''}`}
                            >
                              <Icon className={iconClass} />
                              {url ? (
                                <Link href={url}>{name}</Link>
                              ) : (
                                <div onClick={onLogout}>{name}</div>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </MegaMenuDropdown>
                </div>
              ) : (
                <Avatar
                  size="sm"
                  className="hidden tab:!block"
                  placeholderInitials={isPageLoaded ? userInitial : ''}
                  rounded
                  theme={{
                    root: {
                      initials: {
                        text: 'font-medium text-gray-900',
                        base: 'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-400',
                      },
                    },
                  }}
                  title="profile"
                />
              )}
            </>
          ) : null}
          <DarkThemeToggle />
        </div>
      </MegaMenu>
    </div>
  );
}

export default TopNavBar;
