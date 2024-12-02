/* eslint-disable no-unused-vars */

'use client';

import { Drawer } from '@src/flowbite';
import { CrossIcon } from '@src/icons';
import { TachLogo } from '../common';
import SideNavLinks from './SideNavLinks';

function MobileSideNav({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}) {
  const handleMobileMenu = () => setIsOpen(!isOpen);

  return (
    <Drawer
      position="left"
      open={isOpen}
      onClose={handleMobileMenu}
      className="!p-0 bg-white dark:bg-gray-800"
    >
      <div className="p-4 xl:px-[120px] px-[15px]">
        <div className="flex gap-5 items-center">
          <TachLogo />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 !pl-[10px] !pt-[15px] pb-2">
        <div className="bg-gray-200 dark:bg-gray-200 text-indigo-600 dark:!text-yellow-400 w-fit md:!hidden block rounded-md px-3 py-2.5">
          <CrossIcon onClick={handleMobileMenu} className="rotate-180" />
        </div>
      </div>
      <div className="p-4">
        <SideNavLinks />
      </div>
    </Drawer>
  );
}

export default MobileSideNav;
