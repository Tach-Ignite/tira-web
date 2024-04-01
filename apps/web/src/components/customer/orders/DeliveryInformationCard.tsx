'use client';

import React, { useState } from 'react';
import { OrdersForm, steps } from './types';
import ShippingInformation from './ShippingInformation';
import ContactFields from './ContactFields';

function DeliveryInformationCard(props: OrdersForm) {
  const [addApartmentField, setAddApartmentField] = useState<boolean>(false);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 rounded-lg py-6 px-4">
      <div className="w-[70%] max-[1100px]:w-[90%] flex flex-col gap-y-6 max-[700px]:w-[100%]">
        <div
          className="font-bold text-xl leading-[30px] text-black dark:text-white"
          id={steps[1]}
        >
          Delivery Information
        </div>
        <ContactFields
          {...props}
          addApartmentField={addApartmentField}
          setAddApartmentField={setAddApartmentField}
        />
        <div className="mt-10 mb-5">
          <ShippingInformation {...props} />
        </div>
      </div>
    </div>
  );
}

export default DeliveryInformationCard;
