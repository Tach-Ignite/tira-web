'use client';

import { Drawer } from '@src/flowbite';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { customerAccountSideBarNavLinks } from '../navLinks';

const activeClass =
  'shadow-3xl border border-gray-50 !text-indigo-600 dark:border-gray-500 dark:!text-yellow-400 dark:shadow-none';

const hoverClass =
  'hover:shadow-3xl hover:outline-1 dark:hover:outline hover:outline-gray-50 hover:!text-indigo-600 dark:hover:outline-gray-500 dark:hover:!text-yellow-400 dark:hover:shadow-none';

function MobileSideNav({
  setShow,
  show,
}: {
  show: boolean;
  setShow: () => void;
}) {
  const currentPath = usePathname();

  return (
    <Drawer
      position="left"
      open={show}
      onClose={setShow}
      className="!pt-[170px] bg-white dark:bg-gray-800 "
    >
      <div className="flex flex-col space-y-8 dark:text-white">
        {customerAccountSideBarNavLinks?.map(({ name, url = '' }) => {
          const isActive = currentPath === url;

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
      </div>
    </Drawer>
  );
}
export default MobileSideNav;
