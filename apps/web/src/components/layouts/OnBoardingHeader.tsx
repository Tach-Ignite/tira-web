/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, MegaMenu, MegaMenuDropdown } from '@src/flowbite';
import { LogoutIcon } from '@src/icons';

// import { useGetUserProfile } from '@queries';
import { useAuthContext } from '@context/AuthContext';
import logout from '@services/logout';

function OnBoardingHeader() {
  const { isAuthenticated, authenticatedUser } = useAuthContext() || {};

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // const { data: userProfileData } = useGetUserProfile();

  const { profileImage, userProfile = {} } = authenticatedUser || {};

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const imageUrl = profileImage
    ? `${process.env.BUCKET_PREFIX}${profileImage}`
    : undefined;

  const onLogout = () => {
    logout();
  };

  return (
    <div className="dark:!bg-transparent sm:!px-8 !px-3 py-3.5 !bg-white sticky top-0 z-50 drop-shadow-sm">
      <MegaMenu
        fluid
        theme={{
          root: {
            base: '!bg-transparent dark:bg-textGray px-8 py-1 text-gray90 dark:text-white',
            inner: {
              base: `flex flex-wrap gap-2 min-[390px]:items-center justify-end ${isAuthenticated && 'max-[390px]:flex-col'} gap-y-3`,
            },
          },
        }}
      >
        <div className="flex items-center justify-end gap-4 max-xs:mt-4">
          {isPageLoaded ? (
            <div className="block tab:!block z-50">
              <MegaMenuDropdown
                theme={{
                  base: '',
                  toggle: {
                    arrowIcon: 'hidden',
                    content: 'py-1 focus:outline-none',
                    floating: {
                      animation: 'transition-opacity',
                      arrow: {
                        base: 'absolute z-10 h-2 w-2 rotate-45',
                        style: {
                          dark: 'bg-gray-900 dark:bg-gray-700',
                          light: 'bg-white',
                          auto: 'bg-white dark:bg-gray-700',
                        },
                        placement: '-4px',
                      },
                      base: 'z-10 w-fit mt-2 divide-y divide-gray-100 rounded shadow focus:outline-none',
                      content: 'py-1 text-sm text-gray-700 dark:text-gray-200',
                      divider: 'my-1 h-px bg-gray-100 dark:bg-gray-600',
                      header:
                        'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200',
                      hidden: 'invisible opacity-0',
                      item: {
                        container: '',
                        base: 'flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white',
                        icon: 'mr-2 h-4 w-4',
                      },
                      style: {
                        dark: 'bg-gray-900 text-white dark:bg-gray-700',
                        light: 'border border-gray-200 bg-white text-gray-900',
                        auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white',
                      },
                      target: 'w-fit',
                    },
                    inlineWrapper: 'flex items-center',
                  },
                }}
                toggle={
                  <Avatar
                    size="sm"
                    img={profileImage ? imageUrl : undefined}
                    // placeholderInitials={userProfile?.firstName || ''}
                    placeholderInitials=""
                    rounded
                    title="profile"
                    theme={{
                      root: {
                        initials: {
                          text: 'font-medium text-gray90',
                          base: 'relative inline-flex items-center justify-center overflow-hidden bg-lightGray dark:bg-gray55',
                        },
                      },
                    }}
                  />
                }
              >
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center px-4 py-2 cursor-pointer text-gray65 hover:bg-gray40 dark:text-lightGray dark:hover:bg-gray35 dark:hover:text-white">
                    <LogoutIcon className="ml-1" />
                    <div onClick={onLogout}>Logout</div>
                  </div>
                </div>
              </MegaMenuDropdown>
            </div>
          ) : (
            <Avatar
              size="sm"
              className="block tab:!block"
              placeholderInitials=""
              // placeholderInitials={
              //   isPageLoaded ? userProfile?.firstName || '' : ''
              // }
              rounded
              theme={{
                root: {
                  initials: {
                    text: 'font-medium text-gray90',
                    base: 'relative inline-flex items-center justify-center overflow-hidden bg-lightGray dark:bg-gray55',
                  },
                },
              }}
              title="profile"
            />
          )}
        </div>
      </MegaMenu>
    </div>
  );
}

export default OnBoardingHeader;
