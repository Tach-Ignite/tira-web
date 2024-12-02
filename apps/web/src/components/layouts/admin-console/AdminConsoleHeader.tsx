/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useAuthContext } from '@context/AuthContext';
import { FlowBiteDropdown, Avatar, DarkThemeToggle } from '@src/flowbite';
import { getInitials } from '@src/lib/string';
import { useEffect, useState } from 'react';
import { MenuIcon } from '@src/icons';
import { useParams } from 'next/navigation';
import MobileSideNav from './MobileSideNav';

function AdminConsoleHeader() {
  const { authenticatedUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { userId } = useParams() || {};

  const handleMobileMenu = () => setIsOpen(!isOpen);

  const { name = '', email = '', profileImage } = authenticatedUser || {};

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initial = getInitials(name?.toUpperCase() || email?.toUpperCase());

  const imageUrl = profileImage
    ? `${process.env.BUCKET_PREFIX}${profileImage}`
    : undefined;

  return (
    <>
      <div className="px-8 py-4 bg-white dark:bg-gray-800 flex justify-between">
        <div className="flex gap-5 items-center" />
        <div className="flex items-center gap-4">
          {isClient ? (
            <FlowBiteDropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  size="sm"
                  img={profileImage ? imageUrl : undefined}
                  placeholderInitials={initial}
                  rounded
                  title="profile"
                  theme={{
                    root: {
                      size: { sm: 'h-9 w-9' },
                      initials: {
                        text: 'font-medium text-[##111827] text-[12px] leading-[12px]',
                        base: 'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-400',
                      },
                    },
                  }}
                />
              }
            >
              <div className="p-4">
                <p className="block text-sm">{name}</p>
                <p className="block truncate text-sm font-medium">{email}</p>
              </div>
            </FlowBiteDropdown>
          ) : null}
        </div>
        {userId ? null : (
          <MobileSideNav isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </div>
      {userId ? null : (
        <div className="flex gap-4 pb-2 bg-white dark:bg-gray-800 items-center">
          <div
            onClick={handleMobileMenu}
            className="bg-gray-200 dark:bg-gray-200 text-indigo-600 dark:!text-yellow-400 lg:!hidden block rounded-md ml-2 px-3 py-2.5"
          >
            <MenuIcon />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminConsoleHeader;
