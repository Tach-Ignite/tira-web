/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React from 'react';
import Link from 'next/link';
import { ImagePlaceholderIcon } from '@src/icons';
import { PercentagePieChart } from '@src/charts';
import { Spinner } from '@src/atoms';

interface ProgressCardType {
  label: string;
  description?: string;
  url?: string;
  isProgressChart?: boolean;
  isLoading?: boolean;
  completed?: number;
  total?: number;
}

export default function ConsoleProgressCard({
  label = '',
  description = '',
  url = '',
  isProgressChart = false,
  isLoading = false,
  completed = 1,
  total = 5,
}: ProgressCardType) {
  const renderProgressContent = () => (
    <>
      <div className="grid grid-cols-1 place-items-center p-2">
        <div className="grid grid-cols-1 place-items-center !bg-gray-200 dark:!bg-transparent px-4 py-1">
          <ImagePlaceholderIcon className="w-[80px] h-[80px] dark:text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:!gap-1">
        <p className="flex items-center justify-start font-semibold leading-[30px] text-[20px] text-gray-900 dark:text-white">
          {label}
        </p>
        {description ? (
          <p className="w-full flex items-start justify-start leading-[18px] text-[12px] text-black dark:text-white">
            {description}
          </p>
        ) : null}
      </div>
      {!isProgressChart ? null : isLoading ? (
        <div className="text-center m-auto">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:!gap-1">
          <PercentagePieChart
            title=""
            gainedAmount={completed}
            totalAmount={total}
            dropdownValue=""
            dropdownOptions={[]}
            progressLabel=""
            isConsoleComponent
          />
        </div>
      )}
    </>
  );

  return url ? (
    <Link
      className={`min-h-[120px] w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-[1fr_4fr_3fr] gap-6 md:gap-[16px] rounded-3xl cursor-pointer no-select shadow-l dark:shadow-sm outline-3 outline outline-gray dark:outline-white py-8 px-4 md:!p-2 `}
      href={url}
    >
      {renderProgressContent()}
    </Link>
  ) : (
    <div
      className={`min-h-[120px] w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-[1fr_4fr_3fr] gap-6 md:gap-[16px] rounded-3xl cursor-pointer no-select shadow-l dark:shadow-sm outline-3 outline outline-gray dark:outline-white py-8 px-4 md:!p-2 `}
    >
      {renderProgressContent()}
    </div>
  );
}
