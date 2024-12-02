'use client';

import { useState } from 'react';
import { Checkbox } from '@src/atoms';
import { OrdersForm, steps } from './types';
import ContactFields from './ContactFields';

function BillingInformation(props: OrdersForm) {
  const { ordersForm } = props;

  const [addApartmentField, setAddApartmentField] = useState<boolean>(false);

  const { control, watch, setValue } = ordersForm;

  const {
    isSameAsShippingInformation,
    billingAddress,
    address,
    city,
    state,
    zipCode,
    firstName,
    lastName,
  } = watch();

  const onHandleSameAsShippingInformation = () => {
    setValue('isSameAsShippingInformation', !isSameAsShippingInformation);
    if (!isSameAsShippingInformation) {
      setValue('billingAddress', {
        address,
        city,
        firstName,
        lastName,
        state,
        zipCode,
      });
    } else {
      setValue('billingAddress', { ...billingAddress });
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-300 rounded-lg py-6 px-4"
      id={steps[3]}
    >
      <div className="w-[70%] max-[1100px]:w-[90%] flex flex-col gap-y-6 max-[700px]:w-[100%]">
        {/* <PaymentInformation ordersForm={ordersForm} /> */}
        <div className="font-bold text-xl leading-[30px] text-black dark:text-white">
          Billing Information
        </div>
        <Checkbox
          control={control}
          name="isSameAsShippingInformation"
          onChange={onHandleSameAsShippingInformation}
          label="Same as shipping information"
        />
        {isSameAsShippingInformation ? null : (
          <ContactFields
            ordersForm={ordersForm}
            isBillingAddress
            addApartmentField={addApartmentField}
            setAddApartmentField={setAddApartmentField}
          />
        )}
      </div>
    </div>
  );
}

export default BillingInformation;
