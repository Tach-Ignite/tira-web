'use client';

import { Sidebar, SidebarItemGroup, SidebarItems } from '@src/flowbite';
import SideNavLinks from './SideNavLinks';

function AdminConsoleSideNav() {
  return (
    <Sidebar
      theme={{
        root: {
          inner:
            'shadow-md border border-gray-200 dark:border-gray-700 pb-16 pt-3 bg-white dark:bg-gray-800 h-full min-h-[550px] min-w-[255px] rounded-2xl max-[655px]:!w-[256px] max-[655px]:!m-auto',
        },
      }}
      className="lg:!block hidden"
    >
      <SidebarItems>
        <SidebarItemGroup>
          <div className="mt-6 font-semibold text-xl leading-[30px] bg-white pl-5 pb-6 dark:bg-gray-800 text-gray-600  border-b border-b-gray-200 dark:border-b-gray-700 dark:text-gray-400">
            Admin Console
          </div>
          <SideNavLinks />
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default AdminConsoleSideNav;
