/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { Button, Spinner } from '@src/atoms';
import { ChevronRightIcon } from '@src/icons';
import Link from 'next/link';
import { BreadcrumbWithActionsProps } from './types';

function BreadcrumbWithActions(props: BreadcrumbWithActionsProps) {
  const {
    shouldDisabledSaveButton,
    onSaveChange,
    onDiscard,
    isSavePending,
    additionalActions,
    shouldDisabledDiscardButton = false,
    breadcrumbs,
    className = '',
  } = props || {};

  const withActions =
    typeof onDiscard === 'function' && typeof onSaveChange === 'function';

  return (
    <div>
      <div
        className={`text-black flex-wrap flex items-center pb-5 gap-3 dark:text-white font-medium text-[20px] leading-[30px] ${className}`}
      >
        {breadcrumbs?.map(({ name, url, content, onClick }) =>
          url ? (
            <div key={name} className="flex flex-wrap items-center gap-3">
              <Link className="cursor-pointer" href={url} prefetch={false}>
                {content || name}
              </Link>
              {breadcrumbs?.length > 1 ? (
                <ChevronRightIcon className="text-black dark:text-white" />
              ) : null}
            </div>
          ) : (
            <div
              onClick={onClick}
              className={`${typeof onClick === 'function' ? 'cursor-pointer' : ''} break-all`}
              key={name}
            >
              {name}
            </div>
          ),
        )}
      </div>
      {withActions ? (
        <div className="flex gap-2 sm:flex-row flex-col items-center sm:!justify-end justify-center pb-5">
          {additionalActions}

          <Button
            className="py-3"
            size="sm"
            disabled={shouldDisabledDiscardButton}
            onClick={onDiscard}
            theme={{
              color: {
                info: '!bg-transparent dark:text-white text-black border border-black dark:border-white hover:!bg-opacity-80',
              },
              size: { sm: 'px-8 text-[16px] font-medium' },
            }}
          >
            Discard Changes
          </Button>
          <Button
            className="py-3"
            disabled={shouldDisabledSaveButton}
            size="sm"
            onClick={onSaveChange}
            theme={{
              color: {
                info: '!bg-white dark:!bg-white dark:text-black text-white hover:!bg-opacity-80',
              },
              size: {
                sm: 'text-[16px] font-medium px-8',
              },
            }}
          >
            {isSavePending ? <Spinner /> : 'Save Changes'}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default BreadcrumbWithActions;
