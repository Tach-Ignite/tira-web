'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Navbar, useThemeMode, DarkThemeToggle } from '@src/flowbite';
import Link from 'next/link';
import { ChevronUpRight, GithubIcon } from '@src/icons';
import { useGetUserProfile } from '@queries';
import { useAuthContext } from '@context/AuthContext';
import { ThemeModesEnum } from '@src/types/modules/themeModeEnum';
import { SideNavBar, TachLogo } from '@src/components/layouts/common';
import { notAuthenticatedNavLinks } from '@src/components/layouts/navLinks';
import {
  UnAuthenticatedRoutes,
  CustomerRoutes,
  TachColorShopRoutes,
  TachColorAuthPages,
} from '@src/routes';
import TachIgniteLogo from '../../../../public/assets/tach-ignite-logo.svg';

const inactiveLinkClass = 'py-2';
const activeLinkClass = 'py-2 border-b-[4px] border-purple-900';

function TopNavbar({
  isHomePage,
  showThemeToggle = true,
}: {
  isHomePage: boolean;
  showThemeToggle: boolean;
}) {
  const pathName = usePathname();
  const { isAuthenticated, authenticatedUser } = useAuthContext() || {};
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

  return (
    <div className="sticky top-0 z-50 drop-shadow-sm">
      <Navbar
        theme={{
          root: {
            base: 'bg-white text-neutral-light px-8 py-4 dark:bg-neutral-800 dark:text-white ',
            inner: {
              base: '',
            },
          },
        }}
        fluid
        className="px-2"
      >
        <div className="flex items-center min-[630px]:justify-between px-20 max-[860px]:px-3 flex-wrap">
          <div>
            {isHomePage ? (
              <TachLogo className="flex" isNotAuthenticated />
            ) : (
              <Link href={UnAuthenticatedRoutes.TachColorShop} className="flex">
                <Image
                  alt="Tach-Ignite-Logo"
                  width="0"
                  height="0"
                  src={TachIgniteLogo}
                />
                <span className="font-semibold text-2xl leading-9 ml-3 dark:text-white  max-[760px]:hidden max-[655px]:block max-[350px]:hidden">
                  Tach Color Shop
                </span>
              </Link>
            )}
          </div>
          {isHomePage ? (
            <div className="ml-6 text-neutral-light dark:text-white flex gap-6 font-medium text-sm max-[655px]:!hidden">
              <Link
                className={
                  pathName === '#explore-tira-in-action'
                    ? `flex ${activeLinkClass}`
                    : `flex ${inactiveLinkClass}`
                }
                href="#explore-tira-in-action"
              >
                Demo
              </Link>
              <Link
                className={
                  pathName === '#features'
                    ? `flex ${activeLinkClass}`
                    : `flex ${inactiveLinkClass}`
                }
                href="#features"
              >
                Features
              </Link>
            </div>
          ) : (
            <div className="ml-6 flex gap-6 font-medium text-sm max-[655px]:!hidden">
              <Link
                className={
                  pathName?.includes(TachColorShopRoutes.Products) ||
                  pathName?.includes(TachColorShopRoutes.Service)
                    ? activeLinkClass
                    : inactiveLinkClass
                }
                href={TachColorShopRoutes.Products}
              >
                Marketplace
              </Link>
              <Link
                className={
                  pathName === CustomerRoutes.Announcement
                    ? `flex ${activeLinkClass}`
                    : `flex ${inactiveLinkClass}`
                }
                href={CustomerRoutes.Announcement}
              >
                Announcements
              </Link>
              <Link
                className={
                  pathName === CustomerRoutes.Contact
                    ? `flex ${activeLinkClass}`
                    : `flex ${inactiveLinkClass}`
                }
                href={CustomerRoutes.Contact}
              >
                Contact
              </Link>
            </div>
          )}
          <div className="ml-6 flex gap-6 font-medium text-neutral-light dark:text-white text-sm items-center max-[655px]:!hidden">
            {isHomePage ? null : (
              <Link
                className={
                  pathName === ''
                    ? `flex ${activeLinkClass}`
                    : `flex ${inactiveLinkClass}`
                }
                href="/"
                target="_blank"
              >
                <div className="flex">
                  About Tira
                  <ChevronUpRight />
                </div>
              </Link>
            )}
            {isHomePage ? (
              <div className="flex gap-6">
                <Link
                  className={inactiveLinkClass}
                  href="https://www.tachignite.com"
                  target="_blank"
                >
                  <div className="flex">
                    About Tach Ignite
                    <ChevronUpRight />
                  </div>
                </Link>
                <Link
                  className={inactiveLinkClass}
                  href="https://www.tachignite.com/contact"
                  target="_blank"
                >
                  <div className="flex">
                    Contact us
                    <ChevronUpRight />
                  </div>
                </Link>
              </div>
            ) : null}
            <Link
              className={inactiveLinkClass}
              target="_blank"
              href="https://github.com/Tach-Ignite/tira-web"
            >
              <GithubIcon size="24px" />
            </Link>
            {isHomePage || isAuthenticated ? null : (
              <Link
                href={TachColorAuthPages.Login}
                className="text-secondary font-semibold dark:text-warning"
              >
                Sign in
              </Link>
            )}
            {showThemeToggle ? <DarkThemeToggle /> : null}
          </div>
        </div>
      </Navbar>
      <SideNavBar navLinks={notAuthenticatedNavLinks} />
    </div>
  );
}

export default TopNavbar;
