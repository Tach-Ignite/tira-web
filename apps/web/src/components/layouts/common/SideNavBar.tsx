/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React, { useEffect, useState } from 'react';
import { Drawer, DrawerItems } from '@src/flowbite';
import { usePathname } from 'next/navigation';
import { MenuIcon, CrossIcon } from '@src/icons';
import SideBarContent from './SideBarContent';
import { SideBarContentProps } from '../type';

function MobileSideNavBar(props: SideBarContentProps) {
  const { navLinks, headerContent } = props;

  const [isOpenMenu, setIsOpenSideMenu] = useState(false);

  const onHandleMenuIcon = () => {
    setIsOpenSideMenu(!isOpenMenu);
  };

  const pathname = usePathname();

  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isOpenMenu]);

  const onCloseMenu = () => {
    setIsOpenSideMenu(false);
  };

  const isAuthPage = pathname?.includes('auth');

  return (
    <div
      className={`min-[655px]:hidden fixed top-16 z-50 w-full ${!isAuthPage && 'max-[390px]:top-[103px]'}`}
    >
      <div
        className="pl-10 py-5 bg-white dark:bg-gray-800"
        onClick={onHandleMenuIcon}
      >
        <MenuIcon className="cursor-pointer text-gray-800 dark:text-gray-50" />
      </div>
      <Drawer
        backdrop={false}
        open={isOpenMenu}
        onClose={onCloseMenu}
        theme={{
          root: {
            base: 'fixed z-50 overflow-y-auto bg-white p-4 dark:bg-gray-800 rounded-2xl shadow-3xl',
            position: {
              left: {
                on: 'left-0 top-36 max-[380px]:top-44 max-[348px]:top-48 h-max w-screen transform-none',
              },
            },
          },
        }}
      >
        <CrossIcon
          className="text-gray-800 cursor-pointer dark:text-gray-200 mb-5"
          size={20}
          onClick={onHandleMenuIcon}
        />
        <DrawerItems>
          <SideBarContent navLinks={navLinks} headerContent={headerContent} />
        </DrawerItems>
      </Drawer>
    </div>
  );
}

export default MobileSideNavBar;
