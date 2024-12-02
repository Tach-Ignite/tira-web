/* eslint-disable react/require-default-props */

'use client';

import React from 'react';
import { FlowBiteSelect } from '@src/flowbite';

interface OptionsProps {
  label: string;
  value: string;
}

interface PercentagePieChartProps {
  title: string;
  gainedAmount: number;
  totalAmount: number;
  dropdownValue: string;
  dropdownOptions: OptionsProps[];
  progressLabel: string;
  isConsoleComponent?: boolean;
}

export default function PercentagePieChart({
  title = '',
  gainedAmount = 0,
  totalAmount = 0,
  dropdownValue = '',
  dropdownOptions: options = [],
  progressLabel = '',
  isConsoleComponent,
}: PercentagePieChartProps) {
  const percentage = Math.round((gainedAmount / totalAmount) * 100) || 0;

  return (
    <div
      className={`${isConsoleComponent ? 'w-full' : 'w-1/2 bg-white dark:bg-gray125 shadow-md rounded-lg'} flex flex-col items-center p-6`}
    >
      <h2 className="w-full flex items-start text-xl font-semibold mb-2 dark:text-white">
        {title}
      </h2>
      <div
        className={`relative ${isConsoleComponent ? 'w-[80px] h-[80px]' : 'w-[222px] h-[222px]'}`}
      >
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <defs>
            <linearGradient
              id="progress-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6290ef" />
              <stop offset="100%" stopColor="#02E7FF" />
            </linearGradient>
          </defs>
          <path
            d="M18 2
            a 16 16 0 1 1 0 32
            a 16 16 0 1 1 0 -32"
            fill="none"
            stroke="#EADDFF" /* Light background color */
            strokeWidth="3.5"
          />
          <path
            d="M18 2
            a 16 16 0 1 1 0 32
            a 16 16 0 1 1 0 -32"
            fill="none"
            stroke="url(#progress-gradient)" /* Gradient for progress */
            strokeWidth="3.5"
            strokeDasharray="100" /* Full circle */
            strokeDashoffset={`${100 - percentage}`} /* Adjust based on percentage */
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`${isConsoleComponent ? 'text-[12px]' : 'text-2xl font-bold'} dark:text-white`}
          >
            {percentage}%
          </span>
          <span className="text-sm text-gray-500 dark:text-gray55">
            {progressLabel}
          </span>
        </div>
      </div>
      {isConsoleComponent ? null : (
        <>
          <div className="!my-4 !w-full !h-[1px] !bg-gray65" />
          <p className="my-4 text-lg font-medium dark:text-white">{`$${gainedAmount} secured of $${totalAmount}`}</p>
          <div className="!my-4 !w-full !h-[1px] !bg-gray65" />
          <div className="mt-4">
            <FlowBiteSelect
              sizing="sm"
              name="circle-distribution-time-type"
              value={dropdownValue}
              className="w-full"
              color="gray"
              defaultValue=""
              theme={{
                field: {
                  select: {
                    sizes: {
                      sm: 'p-2 sm:text-xs',
                    },
                    base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50 h-[42px] dark:!text-white',
                    colors: {
                      gray: 'placeholder-text-black !text-gray65 !text-[14px] !leading-[21px] !font-[500] border-none bg-transparent dark:!text-gray55 focus:border-none focus:ring-0',
                    },
                  },
                },
              }}
            >
              {options?.map(({ label, value: optionValue }) => (
                <option
                  key={optionValue}
                  label={label}
                  value={optionValue}
                  className="p-2 dark:!bg-gray120 !text-black dark:!text-gray55 hover:!bg-aqua"
                >
                  {label}
                </option>
              ))}
            </FlowBiteSelect>
          </div>
        </>
      )}
    </div>
  );
}
