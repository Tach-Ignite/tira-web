/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */

'use client';

import { usePathname } from 'next/navigation';
import { Sidebar, SidebarItemGroup, SidebarItems } from '@src/flowbite';
import Link from 'next/link';
import { useGetTotalChatsUnreadCount } from '@queries/useChatQuery';
import { SideBarContentProps } from '../type';

const activeClass =
  'shadow-3xl border border-gray-50 !text-indigo-600 dark:border-gray-500 dark:!text-yellow-400 dark:shadow-none';

const hoverClass =
  'hover:shadow-3xl hover:outline-1 dark:hover:outline hover:outline-gray-50 hover:!text-indigo-600 dark:hover:outline-gray-500 dark:hover:!text-yellow-400 dark:hover:shadow-none';

function SideBarContent(props: SideBarContentProps) {
  const { isMobileView = true, navLinks, headerContent } = props;
  const currentPath = usePathname();

  const { data: chatsTotalUnreadCount = 0 } = useGetTotalChatsUnreadCount();

  return (
    <>
      {headerContent}
      <Sidebar
        theme={{
          root: {
            inner:
              'h-full overflow-y-auto overflow-x-hidden bg-white px-3 py-4 dark:bg-gray-800',
          },
          item: {
            base: 'flex items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700',
            active:
              'shadow-3xl border border-gray-50 text-indigo-600 dark:border-gray-500 dark:text-yellow-400 dark:shadow-none',
            icon: {
              base: `h-5 w-5 flex-shrink-0 text-gray-600 transition duration-75 group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-yellow-400 ${isMobileView ? 'dark:text-gray-300' : ''}`,
              active: 'text-indigo-600 dark:text-yellow-400',
            },
          },
        }}
      >
        <SidebarItems>
          <SidebarItemGroup
            className={`flex flex-col ${isMobileView ? 'gap-5' : ''}`}
            theme={{
              base: 'mt-4 space-y-3 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700',
            }}
          >
            {navLinks?.map(({ icon: Icon, iconClass, name, url }) => {
              const isActive =
                url === '/' || url === '/account'
                  ? currentPath === url
                  : currentPath?.includes(url);
              return (
                <Link
                  href={url}
                  key={name}
                  target={name === 'About Tach' ? '_blank' : '_self'}
                  className={`cursor-pointer capitalize flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-gray-600 dark:text-gray-400 ${isActive ? activeClass : hoverClass}`}
                >
                  {Icon && <Icon className={iconClass || 'h-5 w-5'} />}
                  {name}
                  {name === 'Chat' && chatsTotalUnreadCount > 0 && (
                    <div className="w-6 h-6 rounded-[50px] bg-chat-light-gradient dark:bg-chat-dark-gradient ml-auto text-center place-content-center font-medium text-[14px] leading-[21px] text-gray-50">
                      {chatsTotalUnreadCount}
                    </div>
                  )}
                </Link>
              );
            })}
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </>
  );
}

export default SideBarContent;
