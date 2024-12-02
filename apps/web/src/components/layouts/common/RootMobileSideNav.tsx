/* eslint-disable react/require-default-props */

'use client';

import { Drawer } from '@src/flowbite';
import Link from 'next/link';
import { ChevronUpRight } from '@src/icons';
import { usePathname } from 'next/navigation';
import { customerNavLinks } from '../navLinks';

const activeClass =
  'shadow-3xl border border-gray-50 !text-indigo-600 dark:border-gray-500 dark:!text-yellow-400 dark:shadow-none';

const hoverClass =
  'hover:shadow-3xl hover:outline-1 dark:hover:outline hover:outline-gray-50 hover:!text-indigo-600 dark:hover:outline-gray-500 dark:hover:!text-yellow-400 dark:hover:shadow-none';

function RootMobileSideNav({
  setShow,
  show,
  height,
}: {
  show: boolean;
  setShow: () => void;
  height?: number;
}) {
  const currentPath = usePathname() || '';

  const isboutTIRAActive = currentPath === '/';

  return (
    <Drawer
      position="right"
      open={show}
      onClose={setShow}
      className={`!pt-[${height}px] bg-white dark:bg-gray-800`}
    >
      <div className="flex flex-col space-y-8 dark:text-white">
        {customerNavLinks?.map(({ name, url = '' }) => {
          const isActive =
            url === '/' || url === '/account'
              ? currentPath === url
              : currentPath?.includes(url);

          return (
            <Link
              key={name}
              href={url}
              className={`cursor-pointer capitalize flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-gray-600 dark:text-gray-400 ${isActive ? activeClass : hoverClass}`}
            >
              {name}
            </Link>
          );
        })}
        <Link
          href="/"
          className={`cursor-pointer capitalize flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-gray-600 dark:text-gray-400 ${isboutTIRAActive ? activeClass : hoverClass} mt-2 sm:!hidden !block`}
          target="_blank"
        >
          <div className="flex">
            About TIRA
            <ChevronUpRight />
          </div>
        </Link>
      </div>
    </Drawer>
  );
}

export default RootMobileSideNav;
