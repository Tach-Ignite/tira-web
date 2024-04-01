'use client';

import { Controller } from 'react-hook-form';
import { Checkbox as FlowBiteCheckbox } from '@src/flowbite';
import { CheckboxProps } from './types';

function Checkbox(props: CheckboxProps) {
  const {
    control,
    name,
    disabled,
    isRequired,
    rules,
    isChecked,
    value: propValue,
    label,
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
      render={({ field: { onChange, name, value } }) => {
        const handleCustomOnchange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          onChange(event);
          customOnchange?.(event);
        };

        return (
          <div className="w-full flex gap-2 items-center">
            <FlowBiteCheckbox
              className="h-4 w-4 border-[0.5px] bg-gray-50 border-gray-300 checked:!bg-indigo-600 dark:checked:!bg-yellow-400 dark:border-gray-600 checked:bg-none dark:bg-gray-700"
              name={name}
              disabled={disabled}
              checked={isChecked}
              value={propValue || value}
              onChange={customOnchange ? handleCustomOnchange : onChange}
            />
            {label ? (
              <div className="text-gray-500 dark:text-gray-400 font-medium text-base">
                {label}
              </div>
            ) : null}
          </div>
        );
      }}
    />
  );
}

export default Checkbox;
