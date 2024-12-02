/* eslint-disable no-nested-ternary */

'use client';

// import OnBoardingHeader from '@src/components/layouts/OnBoardingHeader';

import {
  AuthConsoleRoutesEnum,
  AuthWithoutSidebarRoutesEnum,
} from '@src/routes';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@context/AuthContext';
import UserConsoleSideNav from './UserConsoleSideNav';

const consoleRoutes = Object.values(AuthConsoleRoutesEnum);
const authWithoutSidebarRoutes = Object.values(AuthWithoutSidebarRoutesEnum);

function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const { isAuthenticated } = useAuthContext();

  const isAuthWithoutSidebar = authWithoutSidebarRoutes.some((route) =>
    pathName.includes(route),
  );

  const isConsoleRoute =
    consoleRoutes.some((route) => pathName.includes(route)) &&
    !isAuthWithoutSidebar;

  const consoleNav = !isAuthenticated ? null : <UserConsoleSideNav />;

  return (
    <div
      className={`!bg-white dark:!bg-black ${isConsoleRoute || isAuthWithoutSidebar ? '!h-full' : 'min-h-calc-content'} ${isAuthWithoutSidebar ? 'md:!pt-[-1rem]' : ''}`}
    >
      <div
        className={`w-full ${isConsoleRoute || isAuthWithoutSidebar ? '' : 'mt-[100px] pb-9'}`}
      >
        {isConsoleRoute ? (
          <div className="flex mx-10 py-2 gap-10">
            {consoleNav}
            <div className="w-full">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default ConsoleLayout;
