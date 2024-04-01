'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { ErrorLabel, Radio, getErrorMessage } from '@src/atoms';
import { ShippingTypeEnum } from '@services';
import { convertToDollarAmount } from '@src/lib/numbers';
import { OrdersForm, steps } from './types';

export const shippingSchedule = [
  {
    label: 'Standard',
    value: ShippingTypeEnum.Standard,
    helperText: '5-7 business days',
    extraCharge: 9.99,
  },
  {
    label: 'Overnight',
    value: ShippingTypeEnum.OverNight,
    helperText: 'Next day delivery',
    extraCharge: 9.99,
  },
];

function ShippingInformation(props: OrdersForm) {
  const { ordersForm } = props;

  const { control, setValue, clearErrors } = ordersForm;

  return (
    <div className="w-full">
      <div className="font-bold text-xl mb-7 leading-[30px] text-black dark:text-white">
        Shipping Information
      </div>
      <Controller
        control={control}
        name="shippingType"
        rules={{
          required: true,
        }}
        render={({
          field: { onChange, name, value },
          formState: { errors },
        }) => {
          const errorInputName = errors[name];
          const message = getErrorMessage({
            errorInputName,
            label: 'Shipping Information',
          });

          return (
            <div className="flex flex-col gap-4" id={steps[2]}>
              {shippingSchedule?.map(
                ({ label, value: propValue, extraCharge, helperText }) => {
                  const onHandleChange = (
                    event: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                    onChange(event);
                    errorInputName && clearErrors('shippingType');
                    setValue(name, propValue, { shouldDirty: true });
                  };
                  return (
                    <div className="flex justify-between" key={label}>
                      <div className="flex gap-5 items-center max-[450px]:flex-col">
                        <Radio
                          control={control}
                          name={name}
                          isRequired
                          isChecked={propValue === value}
                          key={label}
                          label={`${label} Shipping`}
                          onChange={onHandleChange}
                        />
                        <div className="text-[14px] w-full leading-[14px] max-[500px]:text-[12px] max-[500px]:leading-[12px] text-gray-500 dark:text-gray-400">
                          {helperText}
                        </div>
                      </div>
                      <div className="text-gray-900 dark:text-gray-50 font-semibold text-[14px] leading-[14px]">
                        {convertToDollarAmount(extraCharge)}
                      </div>
                    </div>
                  );
                },
              )}
              <ErrorLabel message={message} />
            </div>
          );
        }}
      />
    </div>
  );
}

export default ShippingInformation;
