'use client';

import React, { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { Label, FlowBiteTextArea } from '@src/flowbite';
import { TextareaProps } from './types';
import ErrorLabel from './ErrorLabel';
import { getErrorMessage } from '../getErrorMessage';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      name,
      control,
      isRequired,
      rules,
      label,
      errorMessage,
      placeholder,
      helperText,
      onChange: customOnChange,
      rows,
      maxLength = 500,
      className = '',
    } = props || {};

    return (
      <Controller
        name={name}
        control={control}
        key={name}
        rules={{
          required: isRequired,
          ...rules,
        }}
        render={({
          field: { onChange, name, value },
          formState: { errors },
        }) => {
          const handleCustomOnchange = (
            event: React.ChangeEvent<HTMLTextAreaElement>,
          ) => {
            onChange(event);
            customOnChange?.(event as any);
          };
          const errorInputName = errors[name];
          const message = getErrorMessage({
            errorInputName,
            errorMessage,
            label,
          });

          return (
            <div className="w-full flex flex-col gap-1 text-area">
              <Label>{label}</Label>
              <FlowBiteTextArea
                name={name}
                ref={ref}
                required={isRequired}
                onChange={handleCustomOnchange}
                placeholder={placeholder}
                helperText={helperText}
                rows={rows}
                maxLength={maxLength}
                value={value}
                color={message ? 'failure' : 'gray'}
                className={`resize-none ${className}`}
                theme={{
                  colors: {
                    gray: 'border-none bg-indigo-50 text-gray-900 focus:border-none focus:ring-0 dark:border-solid dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-gray-600 dark:focus:ring-0',
                  },
                  withShadow: {
                    on: 'shadow-sm',
                  },
                }}
              />
              <ErrorLabel message={message} />
            </div>
          );
        }}
      />
    );
  },
);

export default Textarea;
