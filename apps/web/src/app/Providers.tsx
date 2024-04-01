/* eslint-disable no-unused-vars */

'use client';

import { ReactElement, useMemo, useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { UserType } from '@services';
import { AuthContext } from '@context/AuthContext';
import { useThemeMode } from '@src/flowbite';
import { ToastProvider } from '../context/ToastContext';
import ReactQueryProvider from './QueryProvider';
import { Toast } from './common/components';
import { CURRENT_USER_COOKIE } from '../services/auth-cookie';

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

  const onSetAuthenticatedUser = (user: UserType) => {
    setCookie(CURRENT_USER_COOKIE, JSON.stringify(user));
    setAuthenticatedUser(JSON.parse(getCookie(CURRENT_USER_COOKIE) || '{}'));
  };

  const CurrentUserContext = useMemo(
    () => ({
      authenticatedUser,
      setAuthenticatedUser: onSetAuthenticatedUser,
      isAuthenticated: authenticated,
    }),
    [authenticated, authenticatedUser],
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

  // console.log('provider mode :: ', mode);

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
