/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */

'use client';

import { Datepicker as FlowBiteDatePicker, Label } from '@src/flowbite';
import { Control, Controller } from 'react-hook-form';

export interface DateRangePickerProps {
  control: Control<any>;
  isRequired?: boolean;
  name: string;
  label?: string;
  rules?: Object;
  placeholder?: string;
  minDate?: Date;
  disabled?: boolean;
  allRangeDates?: Date[];
  errorMessage?: string;
  isEditing?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

function DateRangePicker(props: DateRangePickerProps) {
  const {
    control,
    name,
    isRequired,
    label,
    placeholder = 'Select date',
    rules,
    isEditing,
    disabled = false,
    minDate,
    allRangeDates,
    onChange: customOnchange,
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
      render={({ field: { onChange, name, value }, formState: { errors } }) => (
        <div className="w-full flex flex-col gap-1">
          {label ? <Label>{label}</Label> : null}
          <FlowBiteDatePicker
            showClearButton={false}
            defaultDate={isEditing && value ? new Date(value) : undefined}
            placeholder={placeholder}
            showTodayButton={false}
            onChange={customOnchange || onChange}
            name={name}
            minDate={minDate}
            disabled={disabled}
            value={value}
            color="gray"
            rangeAllDates={allRangeDates}
            theme={{
              root: {
                input: {
                  field: {
                    icon: {
                      svg: 'h-4 w-4 text-gray-500 dark:text-gray-400',
                    },
                    input: {
                      base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50 h-[38px]',
                      colors: {
                        gray: 'placeholder-text-gray-500 border-none	bg-indigo-50 text-gray-900 focus:border-none focus:ring-0 dark:border-solid dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-gray-600 dark:focus:ring-0',
                        failure:
                          'border-none bg-red-100 text-gray-900 placeholder-gray-400 focus:border-none focus:ring-0 dark:border-solid dark:border-red-400  dark:bg-gray-700 dark:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500',
                      },
                    },
                  },
                },
              },
              popup: {
                root: {
                  base: 'contents',
                },
              },
              views: {
                days: {
                  items: {
                    item: {
                      selected:
                        'bg-cyan-700 text-indigo-500 hover:bg-indigo-600 dark:text-yellow-400',
                    },
                  },
                },
              },
            }}
          />
        </div>
      )}
    />
  );
}

export default DateRangePicker;
