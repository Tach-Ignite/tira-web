/* eslint-disable import/no-cycle */

'use client';

import React from 'react';
import { FlowBiteDropdown, DropdownItem } from '@src/flowbite';
import { useSearchParams } from 'next/navigation';
import { ArrowDownIcon } from '@src/icons';
import { CustomerProductSortingProps } from './types';
import { addQueryParam } from '../../../lib/functions';
import { customerProductPageSizeOptions } from './index';

function CustomerProductSorting(props: CustomerProductSortingProps) {
  const { sortOptions } = props || {};
  const params = useSearchParams();

  const sortingFieldInParams = params.get('sort');

  const onSorting = (label: string) => {
    if (sortingFieldInParams !== label) {
      addQueryParam('sort', label);
      addQueryParam('page', '1');
      addQueryParam('page_size', `${customerProductPageSizeOptions?.[0]}`);
    }
  };

  return (
    <FlowBiteDropdown
      label=""
      renderTrigger={() => (
        <span className="border cursor-pointer items-center gap-2 rounded-lg justify-center flex border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-500 px-5 py-2.5">
          {sortingFieldInParams || 'Sort By'} <ArrowDownIcon />
        </span>
      )}
    >
      {sortOptions?.map(({ label = '' }) => {
        const isActive = sortingFieldInParams === label;
        return (
          <DropdownItem
            key={label}
            onClick={() => onSorting(label)}
            className={isActive ? 'text-indigo-600 dark:text-yellow-400' : ''}
          >
            {label}
          </DropdownItem>
        );
      })}
    </FlowBiteDropdown>
  );
}

export default CustomerProductSorting;
