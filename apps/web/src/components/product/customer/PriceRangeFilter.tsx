/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@src/icons';
import { useSearchParams } from 'next/navigation';
import {
  PriceRangeFilterProps,
  PriceRangeSelectProps,
  PriceRangeDropdownProps,
} from './types';
import { addQueryParam } from '../../../lib/functions';

function PriceRangeDropdown(props: PriceRangeDropdownProps) {
  const { options, onSelect } = props || {};

  return (
    <div className="shadow-2xl mt-9 rounded-lg dark:bg-gray-700 max-h-[164px] overflow-y-scroll py-2 custom-scrollbar">
      {options?.map(({ field, label }) => {
        const onMinAmount = () => {
          onSelect(field);
        };

        return (
          <div
            className="px-5 cursor-pointer py-2 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onMinAmount}
            key={field}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

function PriceRangeSelect(props: PriceRangeSelectProps) {
  const { value, onFieldClick, showDropdown, ...dropdownProps } = props || {};
  return (
    <div>
      <div className="font-medium text-sm leading-[21px] mb-2 text-gray-900 dark:text-white">
        Min Amount
      </div>
      <div
        onClick={onFieldClick}
        className="bg-gray-50 dark:bg-gray-700 flex cursor-pointer max-w-max gap-3 py-2 px-4 text-gray-500 dark:text-gray-400 rounded-lg items-center border border-gray-300 dark:border-gray-800"
      >
        {value}
        {showDropdown ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
      {showDropdown ? <PriceRangeDropdown {...dropdownProps} /> : null}
    </div>
  );
}

function PriceRangeFilter(props: PriceRangeFilterProps) {
  const { maxAmountOptions, minAmountOptions } = props || {};

  const [showMinSelectOptions, setShowMinSelectOptions] = useState(false);
  const [showMaxSelectOptions, setShowMaxSelectOptions] = useState(false);

  const params = useSearchParams();
  const minAmountValue = params.get('price_range.from') || 'Enter Value';
  const maxAmountValue = params.get('price_range.to') || 'Enter Value';

  const onSelectMinAmount = (value: string) => {
    addQueryParam('price_range.from', value);
  };

  const onSelectMaxAmount = (value: string) => {
    addQueryParam('price_range.to', value);
  };

  const onMinAmountFieldClick = () => {
    setShowMinSelectOptions(!showMinSelectOptions);
  };

  const onMaxAmountFieldClick = () => {
    setShowMaxSelectOptions(!showMaxSelectOptions);
  };

  return (
    <div>
      <div className="flex justify-between gap-4">
        <PriceRangeSelect
          value={minAmountValue}
          options={minAmountOptions}
          onSelect={onSelectMinAmount}
          showDropdown={showMinSelectOptions}
          onFieldClick={onMinAmountFieldClick}
        />
        <div className="text-sm leading-[21px] self-start mt-10 text-black dark:text-white">
          to
        </div>
        <PriceRangeSelect
          value={maxAmountValue}
          options={maxAmountOptions}
          onSelect={onSelectMaxAmount}
          showDropdown={showMaxSelectOptions}
          onFieldClick={onMaxAmountFieldClick}
        />
      </div>
    </div>
  );
}

export default PriceRangeFilter;
