/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */

'use client';

import { FlowBiteDropdown, DropdownItem } from '@src/flowbite';
import { ArrowDownIcon } from '@src/icons';
import { Control, Controller } from 'react-hook-form';
import { SelectOptions } from '../Select/types';
import { getErrorMessage } from '../getErrorMessage';

export interface DropdownProps {
  control: Control<any>;
  name: string;
  rules?: Object;
  isRequired?: boolean;
  errorMessage?: string;
  className?: string;
  label?: string;
  options: SelectOptions[];
  onChange?: (value: string) => void;
}

function Dropdown(props: DropdownProps) {
  const {
    control,
    name,
    isRequired,
    label,
    onChange: customOnchange,
    rules,
    options,
    className = '',
    errorMessage,
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
      render={({ field: { value: selectedValue }, formState: { errors } }) => {
        const errorInputName = errors[name];
        const message = getErrorMessage({
          errorInputName,
          errorMessage,
          label,
        });

        return (
          <div className={className}>
            <FlowBiteDropdown
              label=""
              className="max-h-[164px] overflow-y-scroll custom-scrollbar"
              renderTrigger={() => (
                <span className="border w-max cursor-pointer items-center gap-2 rounded-lg justify-center flex border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-500 px-5 py-2.5">
                  {selectedValue || label} <ArrowDownIcon />
                </span>
              )}
            >
              {options?.map(({ label = '', value }) => {
                const isActive = selectedValue === value;
                const handleOnChange = () => {
                  customOnchange?.(value);
                };

                return (
                  <DropdownItem
                    key={label}
                    onClick={handleOnChange}
                    className={
                      isActive ? 'text-indigo-600 dark:text-yellow-400' : ''
                    }
                  >
                    {label}
                  </DropdownItem>
                );
              })}
            </FlowBiteDropdown>
          </div>
        );
      }}
    />
  );
}

export default Dropdown;
