/* eslint-disable react/require-default-props */

'use client';

import React from 'react';
import { Card } from '@src/flowbite';
import SideBarContent from '../common/SideBarContent';
import { adminSideBarNavLinks } from '../navLinks';

function AdminSideBar({ isMobileView }: { isMobileView?: boolean }) {
  return (
    <Card
      className="rounded-2xl max-[655px]:w-[256px] max-[655px]:m-auto "
      theme={{
        root: { children: 'flex h-full flex-col justify-center gap-4 pt-6' },
      }}
    >
      <SideBarContent
        isMobileView={false}
        navLinks={adminSideBarNavLinks}
        headerContent={
          <div
            className={`font-semibold text-xl leading-[30px] bg-white pl-5 pb-6 dark:bg-gray-800 text-gray-600  border-b border-b-gray-200 dark:border-b-gray-700 ${isMobileView ? 'dark:text-gray-300' : 'dark:text-gray-400'}`}
          >
            Admin Console
          </div>
        }
      />
      <div className="h-64 rounded-b-2xl bg-white dark:bg-gray-800" />
    </Card>
  );
}

export default AdminSideBar;
