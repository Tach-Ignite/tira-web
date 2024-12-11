'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, Label } from '@src/flowbite';
import ErrorLabel from './ErrorLabel';
import { InputProps } from './types';
import { getErrorMessage } from '../getErrorMessage';

function LabelInput(props: InputProps) {
  const {
    name,
    control,
    isRequired,
    rules,
    disabled = false,
    label,
    errorMessage,
    placeholder,
    startAdornment: StartAdornment,
    type,
    maxLength,
    onChange: customOnchange,
    isArrayInput,
    errorLabel,
    className = '',
    colorClass = '',
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
        fieldState: { error },
        formState: { errors },
      }) => {
        const handleCustomOnchange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          onChange(event);
          customOnchange?.(event);
        };

        const errorInputName = errors[name];

        const message = getErrorMessage({
          errorInputName: isArrayInput ? error : errorInputName,
          errorMessage,
          label: errorLabel || label,
        });

        return (
          <div className={`w-full flex flex-col gap-1 ${className}`}>
            {label ? (
              <Label>
                <span className="!text-[#F05252]">
                  {isRequired ? ' * ' : ''}
                </span>
                {label}
              </Label>
            ) : null}
            <TextInput
              name={name}
              disabled={disabled}
              onChange={customOnchange ? handleCustomOnchange : onChange}
              placeholder={placeholder}
              icon={StartAdornment}
              type={type}
              maxLength={maxLength}
              value={value || ''}
              color={message ? 'failure' : 'gray'}
              theme={{
                field: {
                  icon: {
                    svg: 'h-4 w-4 text-gray-500 dark:text-gray-400',
                  },
                  input: {
                    base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50 h-[38px]',
                    colors: {
                      gray: `placeholder-text-inputPlaceholderText dark:placeholder-inputPlaceholderText-dark !border-[1px] !border-borderPrimary bg-white dark:!bg-black text-textBody dark:border-textBody-dark focus:ring-0 dark:text-textBody-dark focus:!border-action dark:focus:!border-action-dark dark:focus:ring-0 ${colorClass}`,
                      failure:
                        'border-none bg-red-50 text-gray-900 placeholder-gray-400 focus:border-none focus:ring-0 dark:border-solid dark:border-red-400  dark:bg-gray-700 dark:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500',
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

export default LabelInput;
