/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { BackArrowIcon, ConsoleIcon, CrossIcon, MenuIcon } from '@src/icons';
import { useRouter } from 'next/navigation';
import { BreadcrumbWithActions } from '@components/common/breadcrumb';
import { useState } from 'react';
import Link from 'next/link';
import { TachColorShopConsoleRoutes } from '@src/routes';
import { NavigationWizardPageHeaderProps } from './types';
import MobileNavigationSideMenu from './MobileNavigationSideMenu';

export default function NavigationWizardPageHeader(
  props: NavigationWizardPageHeaderProps,
) {
  const {
    steps,
    currentStepIndex = 0,
    showGoBack = false,
    fullBreadcrumbs,
    onChangeWizardTab,
    onHandleBack,
    showBreadcrumbDivider = false,
  } = props || {};

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const router = useRouter();

  const goBack = () => {
    typeof onHandleBack === 'function' ? onHandleBack() : router.back();
  };

  return (
    <div className="w-full lg:!grid lg:!grid-cols-[1fr_5fr] !space-y-5 lg:!place-content-center mb-5">
      <div
        className="ml-5 md:!hidden block w-fit rounded-md cursor-pointer p-2 !text-white dark:!text-black text-[20px] !bg-primary2 dark:!bg-primaryDark"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <CrossIcon className="rotate-180" /> : <MenuIcon />}
      </div>
      {showMobileMenu ? (
        <MobileNavigationSideMenu
          show={showMobileMenu}
          setShow={toggleMobileMenu}
          steps={steps}
          onChangeWizardTab={onChangeWizardTab}
          currentStepIndex={currentStepIndex}
        />
      ) : null}
      <div className="space-y-5 gap-x-5 lg:!min-w-[300px] pl-5 md:pl-0 flex items-center lg:!justify-center w-full break-all sm:!flex-nowrap !flex-wrap">
        <Link className="lg:!w-full" href={TachColorShopConsoleRoutes.Overview}>
          <ConsoleIcon className="w-12 h-12  md:!mb-5 !mb-0 dark:!text-white" />
        </Link>
        <div className="lg:!hidden md:!w-max md:!ml-5 !flex gap-2 lg:!items-center relative">
          {showGoBack ? (
            <BackArrowIcon
              onClick={goBack}
              className="w-[20px] lg:!pb-5 lg!mt-0 -mt-1 h-full mx-1 text-black dark:!text-white cursor-pointer"
            />
          ) : null}
          <div className="w-full lg!mt-0 -mt-3">
            <BreadcrumbWithActions
              breadcrumbs={fullBreadcrumbs || []}
              className="!pb-0"
            />
            {showBreadcrumbDivider ? (
              <div className="flex-1 h-px !mb-4 bg-black dark:bg-white" />
            ) : null}
          </div>
        </div>
      </div>
      <div className="!hidden w-full lg:!grid lg:!grid-cols-[1fr_49fr] md:!place-content-start md:!self-center">
        <div className="md:!w-max ml-5 flex gap-2 items-center relative">
          {showGoBack ? (
            <BackArrowIcon
              onClick={goBack}
              className="w-[20px] pb-5 h-full mx-1 text-black dark:!text-white cursor-pointer"
            />
          ) : null}
          <div className="w-full">
            <BreadcrumbWithActions
              breadcrumbs={fullBreadcrumbs || []}
              className="pb-0"
            />
            {showBreadcrumbDivider ? (
              <div className="flex-1 h-px !mb-4 bg-black dark:bg-white" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
