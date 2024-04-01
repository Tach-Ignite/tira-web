/* eslint-disable no-unused-vars */

'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import { LabelInput, Radio } from '@src/atoms';
import { formatCreditCardNumber } from '@src/lib/numbers';
import { PaymentOptionEnum } from '@services';
import { OrdersForm } from './types';

const paymentOptions = [
  { label: 'Pay with Credit/Debit', value: PaymentOptionEnum.Card },
  { label: 'Pay with Paypal', value: PaymentOptionEnum.Paypal },
  { label: 'Pay with Bank', value: PaymentOptionEnum.Bank },
];

function PaymentInformation(props: OrdersForm) {
  const { ordersForm } = props;

  const { control, setValue, watch } = ordersForm;

  const { paymentOptions: selectedPaymentOption } = watch();

  const isCardPayment = selectedPaymentOption === PaymentOptionEnum.Card;

  const onCredCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setValue('cardNumber', formatCreditCardNumber(input), {
      shouldDirty: true,
    });
  };

  return (
    <div>
      <div className="font-bold text-xl mb-8 leading-[30px] text-black dark:text-white">
        Payment Information
      </div>
      {/* <div className="mb-3">
        <Controller
          control={control}
          name="paymentOptions"
          render={({ field: { onChange, name, value } }) => (
            <div className="flex gap-4 max-[800px]:flex-col">
              {paymentOptions?.map(({ label, value: propValue }) => {
                const onHandleChange = (
                  event: React.ChangeEvent<HTMLInputElement>,
                ) => {
                  onChange(event);
                  setValue(name, propValue, { shouldDirty: true });
                };
                return (
                  <Radio
                    control={control}
                    name={name}
                    isChecked={propValue === value}
                    key={label}
                    label={label}
                    onChange={onHandleChange}
                  />
                );
              })}
            </div>
          )}
        />
      </div>
      {isCardPayment ? (
        <div className="w-[48%] flex flex-col gap-5 my-10">
          <LabelInput
            name="cardName"
            label="Name on Card"
            placeholder="Input text"
            control={control}
            // isRequired // Will handle in future
          />
          <LabelInput
            name="cardNumber"
            label="Card Number"
            placeholder="Input text"
            control={control}
            // isRequired // Will handle in future
            maxLength={19}
            onChange={onCredCardNumber}
          />
          <LabelInput
            name="securityCode"
            label="Security Code"
            placeholder="Input text"
            control={control}
            // isRequired // Will handle in future
          />
        </div>
      ) : null} */}
    </div>
  );
}

export default PaymentInformation;
