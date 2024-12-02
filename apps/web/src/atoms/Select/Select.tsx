'use client';

import { Controller } from 'react-hook-form';
import { Label, FlowBiteSelect } from '@src/flowbite';
import { SelectProps } from './types';
import { ErrorLabel } from '../Input';
import { getErrorMessage } from '../getErrorMessage';

function Select(props: SelectProps) {
  const {
    control,
    name,
    isRequired,
    label,
    onChange: customOnchange,
    rules,
    optionTitle,
    options,
    value: propValue,
    className = '',
    errorMessage,
    isBlueTheme,
    isArrayInput,
    selectClassName = '',
    disabled = false,
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
      render={({
        field: { onChange, name, value },
        formState: { errors },
        fieldState: { error },
      }) => {
        const handleCustomOnchange = (
          event: React.ChangeEvent<HTMLSelectElement>,
        ) => {
          onChange(event);
          customOnchange?.(event);
        };

        const errorInputName = errors[name];
        const message = getErrorMessage({
          errorInputName: isArrayInput ? error : errorInputName,
          errorMessage,
          label,
        });

        const themeColor = isBlueTheme ? 'info' : 'gray';

        const textColor = message ? 'failure' : themeColor;

        return (
          <>
            <Label>{label}</Label>
            <div className={`mt-1 ${className}`}>
              <FlowBiteSelect
                onChange={customOnchange ? handleCustomOnchange : onChange}
                sizing="sm"
                name={name}
                value={propValue || value}
                className={`w-full ${selectClassName}`}
                color={textColor}
                disabled={disabled}
                theme={{
                  field: {
                    select: {
                      sizes: {
                        sm: 'p-2 sm:text-xs',
                      },
                      colors: {
                        failure:
                          'border-none bg-red-50 text-gray-900 placeholder-gray-400 focus:border-none focus:ring-0 dark:border-solid dark:border-red-400  dark:bg-gray-700 dark:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500',
                        info: 'placeholder-text-gray-500 border-none bg-indigo-50 text-gray-900 focus:border-none focus:ring-0 dark:border-solid dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-gray-600 dark:focus:ring-0',
                        gray: 'border-gray-300 bg-gray-50 text-gray-500 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500',
                      },
                    },
                  },
                }}
              >
                <option className="p-2">{optionTitle}</option>
                {options?.map(({ label, value: optionValue }) => (
                  <option
                    key={optionValue}
                    label={label}
                    value={optionValue}
                    selected={value === optionValue}
                    className="p-2"
                  >
                    {label}
                  </option>
                ))}
              </FlowBiteSelect>
            </div>
            <ErrorLabel message={message} />
          </>
        );
      }}
    />
  );
}

export default Select;
