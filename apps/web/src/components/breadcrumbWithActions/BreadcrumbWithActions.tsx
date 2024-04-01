/* eslint-disable no-unsafe-optional-chaining */

'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { convertPluralToSingular } from '@src/lib/string';
import { Button } from '@src/atoms';
import { Breadcrumb, BreadcrumbItem } from '@src/flowbite';
import { BreadcrumbWithActionsProps } from './types';

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

  return (
    <div
      className={`flex justify-between items-center max-[950px]:w-full max-[950px]:flex-col max-[950px]:gap-5 ${!showBreadcrumb && 'self-end'}`}
    >
      {showBreadcrumb ? (
        <Breadcrumb className="max-[950px]:w-full">
          {breadcrumbs?.map(({ name, url }) => (
            <BreadcrumbItem
              theme={{
                href: {
                  off: 'flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400',
                  on: 'flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                },
                chevron: 'mx-4 h-4 w-4 text-gray-400 group-first:hidden',
              }}
              key={name}
              // href={url ? `/admin/${url}` : undefined}
              href={
                url ? `/${isCustomer ? 'account' : 'admin'}/${url}` : undefined
              }
            >
              {name}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      ) : null}
      {isCustomer ? null : (
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
