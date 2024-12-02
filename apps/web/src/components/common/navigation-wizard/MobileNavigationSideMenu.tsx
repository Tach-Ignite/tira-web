'use client';

import { Drawer } from '@src/flowbite';
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
        {getSideBarContent(steps, currentStepIndex, onChangeWizardTab, setShow)}
      </div>
    </Drawer>
  );
}

export default MobileNavigationSideMenu;
