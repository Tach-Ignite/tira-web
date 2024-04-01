'use client';

import React from 'react';
import { emailPattern } from '@src/lib/constants/validation';
import { LabelInput } from '@src/atoms';
import { formatPhoneNumber } from '@src/lib/numbers';
import { WarningCircleIcon } from '@src/icons';
import { OrdersForm } from './types';

function ContactInformationCard(props: OrdersForm) {
  const { ordersForm } = props;

  const { control, setValue } = ordersForm;

  const onPhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setValue('phone', formatPhoneNumber(input), { shouldDirty: true });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 rounded-lg py-6 px-4">
      <div className="w-[70%] max-[1100px]:w-[90%] flex flex-col gap-y-6 max-[700px]:w-[100%]">
        <div className="font-bold text-xl leading-[30px] text-black dark:text-white">
          Contact Information
        </div>
        <div className="text-sm leading-[21px] text-black dark:text-gray-400 mb-7">
          Contact information will be used to send updates about your order.
        </div>
        <div className="flex justify-between gap-6 mb-5 max-[600px]:flex-col">
          <div className="w-[50%] max-[600px]:w-[100%]">
            <LabelInput
              name="email"
              label="Email"
              rules={{
                pattern: emailPattern,
              }}
              placeholder="Email Address"
              control={control}
              isRequired
              errorMessage="Please Enter Valid Email Address"
            />
          </div>
          <div className="w-[50%] max-[600px]:w-[100%]">
            <LabelInput
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="Input text"
              control={control}
              isRequired
              maxLength={14}
              onChange={onPhoneInput}
            />
            <div className="text-[10px] flex items-center gap-1 leading-[13px] text-gray-800 dark:text-gray-400">
              <WarningCircleIcon className="mt-[1px]" size={15} />
              <span>
                By entering your phone you agree to SMS notifications.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInformationCard;
