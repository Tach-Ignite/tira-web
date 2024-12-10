/* eslint-disable no-unused-vars */

'use client';

import { ReactElement, useMemo, useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import {
  OrganizationsEntity,
  CurrentTeamEntity,
  UserRole,
  UserType,
} from '@services';
import { AuthContext } from '@context/AuthContext';
import { useThemeMode } from '@src/flowbite';
import { ToastProvider } from '../context/ToastContext';
import ReactQueryProvider from './QueryProvider';
import { Toast } from './common/components';
import {
  CURRENT_ORG_COOKIE,
  CURRENT_TEAM_COOKIE,
  CURRENT_USER_COOKIE,
  CURRENT_USER_ROLE_COOKIE,
  CURRENT_SINGLE_PAGE_NAME,
} from '../services/auth-cookie';

interface ProviderProps {
  children: ReactElement[];
  authenticated: boolean;
}

enum themeModes {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

export default function Providers({ children, authenticated }: ProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<UserType>(
    JSON.parse(getCookie(CURRENT_USER_COOKIE) || '{}'),
  );

  const [currentOrg, setCurrentOrg] = useState<OrganizationsEntity>(
    JSON.parse(getCookie(CURRENT_ORG_COOKIE) || '{}'),
  );

  const [currentTeam, setCurrentTeam] = useState<CurrentTeamEntity>(
    JSON.parse(getCookie(CURRENT_TEAM_COOKIE) || '{}'),
  );

  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(
    JSON.parse(getCookie(CURRENT_USER_ROLE_COOKIE) || '{}'),
  );

  const onSetAuthenticatedUser = (user: UserType) => {
    setCookie(CURRENT_USER_COOKIE, JSON.stringify(user));
    setAuthenticatedUser(JSON.parse(getCookie(CURRENT_USER_COOKIE) || '{}'));
  };

  const onSetAuthenticatedUserRole = (userRole: UserRole) => {
    setCookie(CURRENT_USER_ROLE_COOKIE, JSON.stringify(userRole));
    setCurrentUserRole(JSON.parse(getCookie(CURRENT_USER_ROLE_COOKIE) || '{}'));
  };

  const onSetCurrentOrg = (org: OrganizationsEntity) => {
    setCookie(CURRENT_ORG_COOKIE, JSON.stringify(org));
    setCurrentOrg(JSON.parse(getCookie(CURRENT_ORG_COOKIE) || '{}'));
  };

  const onSetCurrentTeam = (team: CurrentTeamEntity) => {
    setCookie(CURRENT_TEAM_COOKIE, JSON.stringify(team));
    setCurrentTeam(JSON.parse(getCookie(CURRENT_TEAM_COOKIE) || '{}'));
  };

  const [singlePageName, setSinglePageName] = useState<string>(
    getCookie(CURRENT_SINGLE_PAGE_NAME) || '-',
  );

  const onSetSinglePageName = (pageName: string) => {
    setCookie(CURRENT_SINGLE_PAGE_NAME, pageName);
    setSinglePageName(getCookie(CURRENT_SINGLE_PAGE_NAME) || '-');
  };

  const CurrentUserContext = useMemo(
    () => ({
      authenticatedUser,
      setAuthenticatedUser: onSetAuthenticatedUser,
      currentUserRole,
      currentOrg,
      setCurrentOrg: onSetCurrentOrg,
      currentTeam,
      setCurrentTeam: onSetCurrentTeam,
      setAuthenticatedUserRole: onSetAuthenticatedUserRole,
      isAuthenticated: authenticated,
      singlePageName,
      setSinglePageName: onSetSinglePageName,
    }),
    [
      authenticatedUser,
      currentUserRole,
      currentOrg,
      currentTeam,
      authenticated,
      singlePageName,
    ],
  );

  const { setMode } = useThemeMode();

  // Function to apply the theme based on system preferences
  // eslint-disable-next-line no-unused-vars
  const handleSystemThemeChange = (event: MediaQueryListEvent) => {
    const currentTheme = window.localStorage.getItem('flowbite-theme-mode');
    if (currentTheme === themeModes.AUTO) {
      setMode(themeModes.AUTO);
    }
  };

  // update the theme dynamically
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = window.localStorage.getItem('flowbite-theme-mode');

    // Initial theme setting based on current system preference
    // setMode(mediaQuery.matches ? themeModes.DARK : themeModes.LIGHT);
    if (currentTheme === themeModes.AUTO) {
      setMode(themeModes.AUTO);
    }

    // Add listener for theme changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup the event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactQueryProvider>
      <AuthContext.Provider value={CurrentUserContext}>
        <ToastProvider>
          <Toast />
          {children}
        </ToastProvider>
      </AuthContext.Provider>
    </ReactQueryProvider>
  );
}
