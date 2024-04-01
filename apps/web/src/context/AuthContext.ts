/* eslint-disable no-unused-vars */

'use client';

import { UserType } from '@services';
import { createContext, useContext } from 'react';

type AuthContextType = {
  authenticatedUser?: UserType | null;
  isAuthenticated?: boolean;
  setAuthenticatedUser?: (user: UserType) => void;
};

export const AuthContext = createContext<AuthContextType>({});

export const useAuthContext = () => useContext(AuthContext);
