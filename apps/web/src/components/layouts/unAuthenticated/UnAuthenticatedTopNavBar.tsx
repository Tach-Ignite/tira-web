'use client';

import React from 'react';
import { Navbar, DarkThemeToggle } from '@src/flowbite';
import Link from 'next/link';
import { ChevronUpRight } from '@src/icons';
import { SideNavBar, TachLogo } from '../common';
import { notAuthenticatedNavLinks } from '../navLinks';

function UnAuthenticateTopNavBar() {
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
        <div className="flex items-center justify-between px-20 max-[860px]:px-3 flex-wrap">
          <div>
            <TachLogo className="flex" isNotAuthenticated />
          </div>
          <div className="ml-6 flex gap-6 font-medium text-base max-[655px]:!hidden">
            {notAuthenticatedNavLinks?.map(({ name, url }) => (
              <Link
                key={name}
                href={url}
                target={name === 'About Tach' ? '_blank' : '_self'}
              >
                {name}
              </Link>
            ))}
            <ChevronUpRight className="-ml-5" />
          </div>
          <DarkThemeToggle />
        </div>
      </Navbar>
      <SideNavBar navLinks={notAuthenticatedNavLinks} />
    </div>
  );
}

export default UnAuthenticateTopNavBar;
