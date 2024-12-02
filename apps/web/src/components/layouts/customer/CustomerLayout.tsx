/* eslint-disable react/require-default-props */

'use client';

import React from 'react';
import { useAuthContext } from '@context/AuthContext';
import Footer from '@src/components/tira-landing/components/Footer';
import TopNavBar from '../common/TopNavBar';
import { SideNavBar } from '../common';
import { customerNavLinks } from '../navLinks';
import UnAuthenticateTopNavBar from '../unAuthenticated/UnAuthenticatedTopNavBar';

function CustomerLayout({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="h-full">
      {isAuthenticated ? <TopNavBar /> : <UnAuthenticateTopNavBar />}
      <SideNavBar navLinks={customerNavLinks} />
      <div
        className={`bg-white dark:bg-gray-900 ${isAuthenticated ? 'min-h-comp-calc-content' : 'min-h-auth-calc-content'}`}
      >
        <div className={`w-full px-10 pt-20 pb-14 h-full ${className}`}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CustomerLayout;
