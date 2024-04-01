'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { FlowBiteToggleSwitch } from '@src/flowbite';
import { ToggleSwitchProps } from './types';

function ToggleSwitch(props: ToggleSwitchProps) {
  const {
    name,
    control,
    isRequired,
    label,
    onChange: customOnchange,
    rules,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      key={name}
      rules={{
        required: isRequired,
        ...rules,
      }}
      render={({ field: { onChange, name, value } }) => {
        const handleCustomOnchange = (checked: boolean) => {
          onChange(checked);
          customOnchange?.(checked);
        };

        return (
          <FlowBiteToggleSwitch
            checked={value}
            theme={{
              root: {
                base: 'group relative flex items-center rounded-lg focus:outline-none',
                label:
                  'ml-3 text-sm font-medium text-gray-900 dark:text-gray-300',
              },
              toggle: {
                checked: {
                  on: 'after:translate-x-full after:border-white',
                  color: { blue: 'bg-indigo-600 dark:bg-yellow-400' },
                },
                base: 'rounded-full border after:rounded-[50%] after:bg-white group-focus:ring-4 group-focus:ring-cyan-500/25 dark:after:bg-gray-400',
                sizes: {
                  sm: 'h-5 w-9 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4',
                  md: 'h-6 w-11 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5',
                  lg: 'h-7 w-14 after:absolute after:left-[4px] after:top-0.5 after:h-6 after:w-6',
                },
              },
            }}
            name={name}
            label={label}
            sizing="sm"
            onChange={customOnchange ? handleCustomOnchange : onChange}
          />
        );
      }}
    />
  );
}

export default ToggleSwitch;
