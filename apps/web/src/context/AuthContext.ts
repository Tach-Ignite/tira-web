/* eslint-disable no-unused-vars */

'use client';

import { OrganizationsEntity, UserRole, UserType } from '@services';
import { createContext, useContext } from 'react';

type AuthContextType = {
  authenticatedUser?: UserType | null;
  isAuthenticated?: boolean;
  currentOrg?: OrganizationsEntity | null;
  setCurrentOrg?: (org: OrganizationsEntity) => void;
  setAuthenticatedUser?: (user: UserType) => void;
  currentUserRole?: UserRole;
  setAuthenticatedUserRole?: (user: UserRole) => void;
};

export const AuthContext = createContext<AuthContextType>({});

export const useAuthContext = () => useContext(AuthContext);
