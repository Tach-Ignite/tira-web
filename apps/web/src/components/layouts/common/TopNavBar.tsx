/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Avatar,
  MegaMenu,
  MegaMenuDropdown,
  useThemeMode,
} from '@src/flowbite';
import {
  SolidBellIcon,
  ShoppingCartIcon,
  GithubIcon,
  ChevronUpRight,
  MenuIcon,
  CrossIcon,
} from '@src/icons';
import Link from 'next/link';
import { useFetchCartDetails, useGetUserProfile } from '@queries';
import { useAuthContext } from '@context/AuthContext';
import { UnAuthenticatedRoutes, TachColorAuthPages } from '@src/routes';
import { usePathname } from 'next/navigation';
import { useGetUnReadNotificationsCount } from '@queries/useAdminNotificationsQuery';
import { ThemeModesEnum } from '@src/types/modules/themeModeEnum';
import { getInitials } from '@src/lib/string';
import logout from '../../../services/logout';
import { customerNavLinks, accountNavLinks } from '../navLinks';
import TachIgniteLogo from '../../../../public/assets/tach-ignite-logo.svg';
import RootMobileSideNav from './RootMobileSideNav';
import { getLinkClassNames } from './geLinkClassNames';
import { CustomerMobileSideNav } from '../customerAccount';

function TopNavBar({
  showCustomerSideNav = false,
}: {
  showCustomerSideNav?: boolean;
}) {
  const { isAuthenticated, authenticatedUser } = useAuthContext() || {};

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showMobileSideNav, setShowMobileSideNav] = useState(false);
  const [showMobileUserSideNav, setShowMobileUserSideNav] = useState(false);

  const { data: userProfileData } = useGetUserProfile();
  const { setMode } = useThemeMode();

  // Type guard function
  const isThemeMode = (value: any): value is ThemeModesEnum =>
    Object.values(ThemeModesEnum).includes(value);

  useEffect(() => {
    const themeMode = userProfileData?.data?.themeMode;
    if (themeMode && isThemeMode(themeMode)) {
      setMode(themeMode);
    }
  }, [userProfileData, setMode, isAuthenticated, authenticatedUser]);

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
  const isAuthPage = pathname?.includes('auth');

  const adminInitial = name ? getInitials(name || '') : '';
  const customerInitial =
    firstName || lastName ? getInitials(`${firstName} ${lastName}` || '') : '';

  const userInitial = isAdmin ? adminInitial : customerInitial;
  const isSignInPage = pathname === TachColorAuthPages.Login;

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

  const handleMobileMenu = () => {
    setShowMobileUserSideNav(!showMobileUserSideNav);
    setShowMobileSideNav(false);
  };

  const imageUrl = profileImage
    ? `${process.env.BUCKET_PREFIX}${profileImage}`
    : undefined;

  const onLogout = () => {
    logout();
  };

  const toggleMobileSideNav = () => {
    setShowMobileSideNav(!showMobileSideNav);
    setShowMobileUserSideNav(false);
  };

  useEffect(() => {
    setShowMobileSideNav(false);
    setShowMobileUserSideNav(false);
  }, [pathname]);

  return (
    <>
      <div className="sticky top-0 z-50 drop-shadow-sm">
        <MegaMenu
          fluid
          theme={{
            root: {
              base: 'bg-white sm:!px-8 !px-3 py-4 text-neutral dark:bg-neutral-800 dark:text-white',
              inner: {
                base: `flex flex-wrap gap-2 items-center justify-between ${isAuthenticated && ''} gap-y-3`,
              },
            },
          }}
        >
          <div className="flex items-center min-[630px]:justify-between px-12 max-[860px]:px-1 flex-wrap">
            <div>
              <Link href={UnAuthenticatedRoutes.TachColorShop} className="flex">
                <Image
                  alt="Tach-Ignite-Logo"
                  width="0"
                  height="0"
                  src={TachIgniteLogo}
                />
                <span className="tab:!flex !hidden font-semibold text-2xl leading-9 ml-3 dark:text-white">
                  Tach Color Shop
                </span>
              </Link>
            </div>
          </div>
          {!isAdmin && !isAuthPage && (
            <div className="-ml-4 gap-6 font-medium text-sm lg:!flex !hidden">
              {customerNavLinks?.map(({ url, name }) => (
                <Link
                  key={name}
                  href={url}
                  className={getLinkClassNames(name || '', pathname)}
                >
                  {name}
                </Link>
              ))}
            </div>
          )}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className={isAuthPage || isAdmin ? '' : 'sm:!block !hidden'}
            >
              <div className="flex">
                About Tira
                <ChevronUpRight />
              </div>
            </Link>
            <Link
              className="py-1"
              target="_blank"
              href="https://github.com/Tach-Ignite/tira-web"
            >
              <GithubIcon size="24px" />
            </Link>
            {isAuthenticated || isSignInPage ? null : (
              <Link
                href={TachColorAuthPages.Login}
                className="text-secondary dark:text-warning"
              >
                Sign in
              </Link>
            )}
            {isAuthenticated && !isAuthPage ? (
              <>
                {isAdmin && (
                  <Link href="/admin/notifications" className="relative mr-2">
                    {unReadNotificationsCount ? (
                      <div className="font-small absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-danger border-2 border-white rounded-full -top-3 -end-3 dark:border-neutral-800">
                        {unReadNotificationsCount}
                      </div>
                    ) : null}
                    <SolidBellIcon className="w-6 h-6" color="neutral-light" />
                  </Link>
                )}
                {isAdmin ? null : (
                  <Link href="/cart" className="relative mr-2">
                    {cartItemsCount ? (
                      <div className="font-small absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-danger border-2 border-white rounded-full -top-3 -end-3 dark:border-neutral">
                        {cartItemsCount}
                      </div>
                    ) : null}
                    <ShoppingCartIcon
                      className="w-6 h-6"
                      color="neutral-light"
                    />
                  </Link>
                )}
                {isPageLoaded ? (
                  <div className="z-50">
                    <MegaMenuDropdown
                      theme={{
                        base: '',
                        toggle: {
                          arrowIcon: 'hidden',
                          content: 'py-1 focus:outline-none',
                          floating: {
                            animation: 'transition-opacity',
                            arrow: {
                              base: 'absolute z-10 h-2 w-2 rotate-45',
                              style: {
                                dark: 'bg-gray-900 dark:bg-gray-700',
                                light: 'bg-white',
                                auto: 'bg-white dark:bg-gray-700',
                              },
                              placement: '-4px',
                            },
                            base: 'z-10 w-fit mt-2 divide-y divide-gray-100 rounded shadow focus:outline-none',
                            content:
                              'py-1 text-sm text-gray-700 dark:text-gray-200',
                            divider: 'my-1 h-px bg-gray-100 dark:bg-gray-600',
                            header:
                              'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200',
                            hidden: 'invisible opacity-0',
                            item: {
                              container: '',
                              base: 'flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
                              icon: 'mr-2 h-4 w-4',
                            },
                            style: {
                              dark: 'bg-gray-900 text-white dark:bg-gray-700',
                              light:
                                'border border-gray-200 bg-white text-gray-900',
                              auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white',
                            },
                            target: 'w-fit',
                          },
                          inlineWrapper: 'flex items-center',
                        },
                      }}
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
                                text: 'font-medium text-neutral',
                                base: 'relative inline-flex items-center justify-center overflow-hidden bg-neutral-light/20 dark:bg-neutral-light',
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
                                className={`flex gap-2 items-center px-4 py-2 cursor-pointer text-neutral hover:bg-neutral-light/20 dark:text-white dark:hover:bg-neutral-800/40 dark:hover:text-white ${isActive ? '!text-secondary dark:!text-warning' : ''}`}
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
                    // className="hidden tab:!block"
                    placeholderInitials={isPageLoaded ? userInitial : ''}
                    rounded
                    theme={{
                      root: {
                        initials: {
                          text: 'font-medium text-neutral-800',
                          base: 'relative inline-flex items-center justify-center overflow-hidden bg-neutral-light dark:bg-neutral',
                        },
                      },
                    }}
                    title="profile"
                  />
                )}
              </>
            ) : null}
            <div className="">
              {showMobileSideNav ? (
                <div className="w-6 h-6 flex justify-center items-center cursor-pointer text-[24px] bg-neutral-light/10 dark:bg-neutral rounded-md p-1">
                  <CrossIcon
                    onClick={toggleMobileSideNav}
                    className="rotate-180 text-black dark:text-neutral-800"
                  />
                </div>
              ) : (
                !isAdmin &&
                !isAuthPage && (
                  <MenuIcon
                    className="cursor-pointer text-[24px]"
                    onClick={toggleMobileSideNav}
                  />
                )
              )}
            </div>
          </div>
        </MegaMenu>
        {showCustomerSideNav ? (
          <div className="md:!hidden pt-5 py-2 pl-3 flex gap-4 items-center bg-white dark:bg-neutral-800">
            <div
              onClick={handleMobileMenu}
              className="rounded-md ml-2 px-3 py-2.5"
            >
              {showMobileUserSideNav ? (
                <div className="-ml-1 w-8 h-8 flex justify-center items-center cursor-pointer text-[24px] bg-neutral-light/30 dark:bg-neutral/50 rounded-md p-1">
                  <CrossIcon
                    onClick={handleMobileMenu}
                    className="rotate-180 text-[18px] text-black dark:text-neutral-800"
                  />
                </div>
              ) : (
                <MenuIcon className="text-black dark:text-white text-[20px]" />
              )}
            </div>
          </div>
        ) : null}
      </div>
      {showMobileSideNav ? (
        <RootMobileSideNav
          height={showCustomerSideNav ? 170 : 120}
          show={showMobileSideNav}
          setShow={toggleMobileSideNav}
        />
      ) : null}
      {showMobileUserSideNav && showCustomerSideNav ? (
        <CustomerMobileSideNav
          show={showMobileUserSideNav}
          setShow={handleMobileMenu}
        />
      ) : null}
    </>
  );
}

export default TopNavBar;
