'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Navbar, useThemeMode } from '@src/flowbite';
import Link from 'next/link';
import { ChevronUpRight, GithubIcon } from '@src/icons';
import { useGetUserProfile } from '@queries';
import { useAuthContext } from '@context/AuthContext';
import { ThemeModesEnum } from '@src/types/modules/themeModeEnum';
import { UnAuthenticatedRoutes } from '@src/routes';
import { SideNavBar } from '../common';
import { notAuthenticatedNavLinks } from '../navLinks';
import TachIgniteLogo from '../../../../public/assets/tach-ignite-logo.svg';

function UnAuthenticateTopNavBar() {
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
    <div className="sticky top-0 z-50">
      <Navbar
        theme={{
          root: {
            base: 'bg-white px-8 py-4 text-gray-900 dark:bg-gray-800 dark:text-white',
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
          </div>
          <div className="ml-6 flex gap-6 font-medium text-sm max-[655px]:!hidden">
            {notAuthenticatedNavLinks?.map(({ name, url }) => (
              <Link
                key={name}
                href={url}
                target={name === 'About Tach' ? '_blank' : '_self'}
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="ml-6 flex gap-6 font-medium text-sm items-center max-[655px]:!hidden">
            <Link className="flex" href="/" target="_blank">
              <div className="flex">
                About TIRA
                <ChevronUpRight />
              </div>
            </Link>
            <Link
              target="_blank"
              href="https://github.com/Tach-Ignite/tira-web"
            >
              <GithubIcon size="24px" />
            </Link>
          </div>
          {/* <DarkThemeToggle /> */}
        </div>
      </Navbar>
      <SideNavBar navLinks={notAuthenticatedNavLinks} />
    </div>
  );
}

export default UnAuthenticateTopNavBar;
