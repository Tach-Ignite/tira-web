/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unsafe-optional-chaining */

'use client';

import {
  ChevronRightIcon,
  BackArrowIcon,
  ConsoleIcon,
  MenuIcon,
} from '@src/icons';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@context/AuthContext';
import { useEffect, useState } from 'react';
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
    isFullPage = false,
  } = props || {};

  const { singlePageName = '-' } = useAuthContext();

  const pathname = usePathname();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const router = useRouter();

  const goBack = () => {
    typeof onHandleBack === 'function' ? onHandleBack() : router.back();
  };

  useEffect(() => {
    if (showMobileMenu) {
      toggleMobileMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="w-full">
      {showMobileMenu ? (
        <MobileNavigationSideMenu
          show={showMobileMenu}
          setShow={toggleMobileMenu}
          steps={steps}
          onChangeWizardTab={onChangeWizardTab}
          currentStepIndex={currentStepIndex}
        />
      ) : null}
      <div className="bg-gray-400 !bg-opacity-30 flex gap-x-5 items-center sm:!px-5 !px-3 py-3">
        <div
          className="md:!hidden block w-fit rounded-md cursor-pointer p-2 !text-black border border-black text-[20px]"
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </div>
        <Link
          className={`${isFullPage ? 'md:!w-1/5 md:!h-12' : ''}`}
          href={TachColorShopConsoleRoutes.Overview}
        >
          <ConsoleIcon className="w-12 h-12 dark:!text-white" />
        </Link>

        <div
          className={`w-full flex gap-x-5 ${isFullPage ? 'md:!w-4/5 md:-ml-8' : ''}`}
        >
          {showGoBack || isFullPage ? (
            <BackArrowIcon
              onClick={goBack}
              className="w-[28px] h-full mt-1 text-black dark:!text-white cursor-pointer"
            />
          ) : null}
          {isFullPage ? (
            <div className="flex items-center gap-x-2">
              <p className="text-[24px] !font-semibold leading-[21px] !text-black dark:!text-gray-100">
                {singlePageName}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-x-2 mt-0.5">
              {fullBreadcrumbs?.map(({ name, url = '' }, index) => {
                const isActive = url === `${process.env.APP_URL}${pathname}`;

                return (
                  <div key={name} className="flex items-center gap-x-2">
                    <Link
                      key={name}
                      href={url}
                      className={`hover:bg-gray-50 dark:hover:!text-black hover:rounded-lg p-1.5 text-[16px] leading-[21px] !text-black dark:!text-gray-100 font-medium ${isActive ? 'text-[18px] !font-semibold' : ''}`}
                    >
                      {name}
                    </Link>
                    {fullBreadcrumbs?.length - 1 === index ? null : (
                      <ChevronRightIcon className="h-full text-[24px] leading-[21px] text-black dark:!text-white" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
