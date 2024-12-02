'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { FloatingLabel } from '@src/flowbite';
import { InputProps } from './types';
import ErrorLabel from './ErrorLabel';
import { getErrorMessage } from '../getErrorMessage';

function Input(props: InputProps) {
  const {
    control,
    name,
    isRequired,
    label = '',
    type = 'text',
    rules,
    errorMessage,
    endAdornment,
    onKeyDown,
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
      render={({ field: { onChange, name }, formState: { errors } }) => {
        const errorInputName = errors[name];
        const message = getErrorMessage({
          errorInputName,
          errorMessage,
          label,
        });

        return (
          <>
            <div className="floating-input relative flex gap-1">
              <FloatingLabel
                name={name}
                onChange={onChange}
                variant="outlined"
                label={label}
                color={errorInputName ? 'error' : 'default'}
                required={isRequired}
                type={type}
                sizing="sm"
                onKeyDown={onKeyDown}
                theme={{
                  input: {
                    default: {
                      outlined: {
                        sm: 'peer block w-full appearance-none rounded-lg border-0 border-none bg-indigo-50 pb-2.5 pl-3 pr-3 pt-3 text-xs text-gray-900 outline-none outline-none focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white',
                        md: 'peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-700 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-400',
                      },
                    },
                  },
                  label: {
                    default: {
                      filled: {
                        sm: 'absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 text-xs text-gray-500 transition-transform  duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-700 dark:text-gray-400 peer-focus:dark:text-blue-400',
                      },
                      outlined: {
                        sm: 'absolute left-0 top-2 origin-[0] -translate-y-4 scale-75 rounded-lg bg-indigo-50 px-2 text-sm text-gray-900 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-700 dark:bg-gray-700 dark:text-white peer-focus:dark:text-yellow-400',
                        md: 'absolute left-0 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-700 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-400',
                      },
                    },
                    error: {
                      outlined: {
                        sm: 'absolute left-1 top-2 z-10 ml-1 origin-[0] -translate-y-4 scale-75 rounded-lg bg-white px-2 text-xs text-red-600 transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-800 dark:text-red-500',
                      },
                    },
                  },
                }}
              />
              {endAdornment ? (
                <div className="!absolute right-0 mr-3 mt-[10px] h-full">
                  {endAdornment}
                </div>
              ) : null}
            </div>
            {message ? <ErrorLabel message={message} /> : null}
          </>
        );
      }}
    />
  );
}

export default Input;
