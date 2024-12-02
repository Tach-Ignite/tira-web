/* eslint-disable no-unsafe-optional-chaining */

'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { convertPluralToSingular } from '@src/lib/string';
import { Button } from '@src/atoms';
import { Breadcrumb, BreadcrumbItem } from '@src/flowbite';
import { BreadcrumbDataType, BreadcrumbWithActionsProps } from './types';

function BreadcrumbWithActions(props: BreadcrumbWithActionsProps) {
  const {
    isEditing,
    shouldDisabledSaveButton,
    onSaveChange,
    onDiscard,
    pageName,
    showBreadcrumb = true,
    additionalActions,
    shouldDisabledDiscardButton = false,
    isCustomer,
    breadcrumbs: breadcrumbFromProps,
  } = props || {};

  const pathname = usePathname();

  const currentUrl = isCustomer
    ? pathname?.split('/account/')?.[1]?.split('/')?.[0]
    : pathname?.split('/admin/')?.[1]?.split('/')?.[0];

  const adminEditId = pathname?.includes('edit')
    ? pathname?.split('/edit/')?.[1]
    : '';

  const customerViewId = pathname?.includes('view')
    ? pathname?.split('/view/')?.[1]
    : '';

  const editId = isCustomer ? customerViewId : adminEditId;

  const breadcrumbs = useMemo(
    () => [
      {
        name: currentUrl?.[0]?.toUpperCase() + currentUrl?.slice(1),
        url: currentUrl,
      },
      {
        name: `${isEditing ? 'Edit' : 'Create'} ${convertPluralToSingular(currentUrl?.[0]?.toUpperCase() + currentUrl?.slice(1) || '')} ${editId}`,
      },
    ],
    [currentUrl, editId, isEditing],
  );

  const filteredBreadcrumb: BreadcrumbDataType[] =
    breadcrumbFromProps || breadcrumbs;

  return (
    <div
      className={`flex justify-between items-center max-[950px]:w-full max-[950px]:flex-col max-[950px]:gap-5 ${!showBreadcrumb && 'self-end'}`}
    >
      {showBreadcrumb ? (
        <Breadcrumb className="max-[950px]:w-full">
          {filteredBreadcrumb?.map(({ name, url, content, onClick }) => {
            const oldformatHref = url
              ? `/${isCustomer ? 'account' : 'admin'}/${url}`
              : undefined;

            const href = breadcrumbFromProps?.length ? url : oldformatHref;

            return (
              <BreadcrumbItem
                theme={{
                  href: {
                    off: `flex items-center ${breadcrumbFromProps?.length ? 'text-[16px] leading-[24px]' : 'text-sm'} font-semibold ${typeof onClick === 'function' ? 'text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white cursor-pointer' : 'text-gray-500 dark:text-gray-400'}`,
                    on: `flex items-center ${breadcrumbFromProps?.length ? 'text-[16px] leading-[24px]' : 'text-sm'} font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white`,
                  },
                  chevron: 'mx-4 h-4 w-4 text-gray-400 group-first:hidden',
                }}
                key={name}
                onClick={onClick}
                href={href}
              >
                {content || name}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      ) : null}
      {isCustomer || breadcrumbFromProps?.length ? null : (
        <div className="flex gap-2 items-center max-[950px]:w-full max-[950px]:justify-between">
          {additionalActions}
          <Button
            color="gray"
            disabled={shouldDisabledDiscardButton}
            outline
            onClick={onDiscard}
          >
            Discard Changes
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={onSaveChange}
            disabled={shouldDisabledSaveButton}
          >
            {isEditing ? 'Save Changes' : `Create ${pageName}`}
          </Button>
        </div>
      )}
    </div>
  );
}

export default BreadcrumbWithActions;
