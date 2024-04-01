import React from 'react';
import { SideNavBar, TopNavBar } from '../common';
import { adminSideBarNavLinks } from '../navLinks';

function AdminTopNavBar() {
  return (
    <>
      <TopNavBar />
      <SideNavBar
        navLinks={adminSideBarNavLinks}
        headerContent={
          <div className="font-semibold text-xl leading-[30px] bg-white pl-5 pb-6 dark:bg-gray-800 text-gray-600  border-b border-b-gray-200 dark:border-b-gray-700 dark:text-gray-300">
            Admin Console
          </div>
        }
      />
    </>
  );
}

export default AdminTopNavBar;
