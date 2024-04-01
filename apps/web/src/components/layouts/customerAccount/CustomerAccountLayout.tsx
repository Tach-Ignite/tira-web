'use client';

import { useAuthContext } from '@context/AuthContext';
import { SideNavBar, TopNavBar } from '../common';
import UnAuthenticateTopNavBar from '../unAuthenticated/UnAuthenticatedTopNavBar';
import { customerAccountSideBarNavLinks } from '../navLinks';
import CustomerAccountSideBar from './CustomerAccountSideBar';

function CustomerAccountLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();

  return (
    <div>
      {isAuthenticated ? <TopNavBar /> : <UnAuthenticateTopNavBar />}
      <SideNavBar navLinks={customerAccountSideBarNavLinks} />
      <div className="bg-gray-50 dark:bg-gray-900 w-full mt-10 tab:!mt-0">
        <div className="flex pt-10 gap-8 mx-3 sm:mx-10 flex-row tab:flex-col pb-64">
          <div className="max-[655px]:hidden">
            <CustomerAccountSideBar />
          </div>
          <div className="w-full overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default CustomerAccountLayout;
