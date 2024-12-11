/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { Drawer } from '@src/flowbite';
import { CrossIcon } from '@src/icons';
import { getSideBarContent } from './getSideBarContent';
import { MobileNavigationSideMenuProps } from './types';

function MobileNavigationSideMenu(props: MobileNavigationSideMenuProps) {
  const { currentStepIndex, setShow, show, steps, onChangeWizardTab } = props;

  return (
    <Drawer
      position="left"
      open={show}
      onClose={setShow}
      className="!pt-[80px] bg-white dark:bg-gray-800"
    >
      <div className="space-y-5">
        <div
          className="md:!hidden block w-fit rounded-md cursor-pointer p-2 !text-black border border-black text-[20px]"
          onClick={setShow}
        >
          <CrossIcon />
        </div>
        {getSideBarContent(steps, currentStepIndex, onChangeWizardTab, setShow)}
      </div>
    </Drawer>
  );
}

export default MobileNavigationSideMenu;
