'use client';

import { Controller } from 'react-hook-form';
import { Label, FlowBiteRadio } from '@src/flowbite';
import { RadioProps } from './types';

function Radio(props: RadioProps) {
  const {
    control,
    name,
    isRequired,
    rules,
    value: propValue,
    label,
    disabled,
    isChecked,
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
            <FlowBiteRadio
              className="h-5 w-5 border-[0.5px] bg-gray-50 border-gray-300 checked:!bg-indigo-600 dark:checked:!bg-yellow-400 dark:border-gray-600 checked:bg-none dark:bg-gray-700"
              name={name}
              disabled={disabled}
              checked={isChecked}
              value={propValue || value}
              onChange={customOnchange ? handleCustomOnchange : onChange}
            />
            {label ? (
              <Label
                className="w-max"
                theme={{
                  root: {
                    base: 'font-medium text-[14px] leading-[14px]',
                  },
                }}
              >
                {label}
              </Label>
            ) : null}
          </div>
        );
      }}
    />
  );
}

export default Radio;
