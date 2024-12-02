'use client';

import { useAuthContext } from '@context/AuthContext';
import Footer from '@src/components/tira-landing/components/Footer';
import { TopNavBar } from '../common';
import UnAuthenticateTopNavBar from '../unAuthenticated/UnAuthenticatedTopNavBar';
import CustomerAccountSideBar from './CustomerAccountSideBar';

function CustomerAccountLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="h-full">
      {isAuthenticated ? (
        <TopNavBar showCustomerSideNav />
      ) : (
        <UnAuthenticateTopNavBar />
      )}
      <div className="bg-gray-50 dark:bg-gray-900 w-full tab:!mt-0 min-h-comp-calc-content">
        <div className="flex mx-3 sm:mx-10 pt-10 pb-64 gap-8">
          <CustomerAccountSideBar />
          <div className="w-full overflow-x-auto">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CustomerAccountLayout;
