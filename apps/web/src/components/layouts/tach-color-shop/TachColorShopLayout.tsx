/* eslint-disable react/require-default-props */

'use client';

import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { TopNavBar } from '@components/layouts/common';
import Footer from 'src/components/tira-landing/components/Footer';
import {
  AuthConsoleRoutesEnum,
  AuthWithoutSidebarRoutesEnum,
  TachColorAuthPages,
} from '@src/routes';
import { useAuthContext } from '@context/AuthContext';

const consoleRoutes = Object.values(AuthConsoleRoutesEnum);
const authWithoutSidebarRoutes = Object.values(AuthWithoutSidebarRoutesEnum);
const authRoutes = Object.values(TachColorAuthPages);

function TachColorShopLayout({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isAuthenticated } = useAuthContext();

  const pathName = usePathname();
  const { orgFriendlyId } = useParams() || {};

  const isAuthPage = authRoutes.some((route) => pathName.includes(route));

  const isAuthWithoutSidebar = authWithoutSidebarRoutes.some((route) =>
    pathName.includes(route),
  );

  const isConsoleRoute =
    consoleRoutes.some((route) => pathName.includes(route)) &&
    !isAuthWithoutSidebar;

  return (
    <div className="h-full">
      <TopNavBar />
      <div
        className={`bg-white ${isConsoleRoute ? 'dark:!bg-black' : 'dark:bg-neutral'} ${isAuthenticated && !isAuthPage ? 'min-h-comp-calc-content' : 'min-h-auth-calc-content'}`}
      >
        <div
          className={`w-full ${isConsoleRoute || isAuthWithoutSidebar || Boolean(orgFriendlyId) ? '' : 'pt-20'} pb-14 ${className}`}
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TachColorShopLayout;
