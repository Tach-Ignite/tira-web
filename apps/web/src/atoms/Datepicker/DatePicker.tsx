'use client';

import { Controller } from 'react-hook-form';
import { Datepicker, Label } from '@src/flowbite';
import { DatePickerProps } from './types';
import { ErrorLabel } from '../Input';

function DatePicker(props: DatePickerProps) {
  const {
    control,
    name,
    errorMessage,
    isRequired,
    label,
    placeholder = 'Select date',
    rules,
    isEditing,
    disabled = false,
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
      render={({ field: { onChange, name, value }, formState: { errors } }) => {
        const errorInputName = errors[name];
        const errorType = errorInputName?.type;
        const isRequiredError = errorType === 'required' && errorInputName;
        const isValidateError = errorType === 'validate' && errorInputName;
        const isPatternError = errorType === 'pattern' && errorInputName;
        let message: string | undefined;
        if (isRequiredError) {
          message = `${label} is Required`;
        } else if (isPatternError) {
          message = errorMessage;
        } else if (isValidateError) {
          message = errorInputName?.message as string;
        }

        return (
          <div className="w-full flex flex-col gap-1">
            {label ? <Label>{label}</Label> : null}
            <Datepicker
              showClearButton={false}
              defaultDate={isEditing && value ? new Date(value) : undefined}
              placeholder={placeholder}
              showTodayButton={false}
              onChange={customOnchange || onChange}
              name={name}
              disabled={disabled}
              value={value}
              color={message ? 'failure' : 'gray'}
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
                            'border-none bg-red-50 text-gray-900 placeholder-gray-400 focus:border-none focus:ring-0 dark:border-solid dark:border-red-400  dark:bg-gray-700 dark:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500',
                        },
                      },
                    },
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
            <ErrorLabel message={message} />
          </div>
        );
      }}
    />
  );
}

export default DatePicker;
