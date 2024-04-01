/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React from 'react';
import { LabelInput, Select } from '@src/atoms';
import { zipCodePattern } from '@src/lib/constants/validation';
import { CirclePlusIcon } from '@src/icons';
import { ContactFieldsProps } from './types';

const states = [
  { label: 'Alabama', value: 'alabama' },
  { label: 'Alaska', value: 'alaska' },
  { label: 'California', value: 'california' },
  { label: 'Florida', value: 'florida' },
  { label: 'Maine', value: 'maine' },
  { label: 'Missouri', value: 'missouri' },
];

function ContactInformationFields(props: ContactFieldsProps) {
  const {
    ordersForm,
    isBillingAddress = false,
    addApartmentField,
    setAddApartmentField,
  } = props;

  const { control } = ordersForm;

  const onAddApartmentField = () => {
    setAddApartmentField?.(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex max-[600px]:flex-col justify-between gap-6">
        <LabelInput
          name={isBillingAddress ? 'billingFirstName' : 'firstName'}
          label="First name"
          placeholder="Input text"
          control={control}
          isRequired={!isBillingAddress} // will handle in future
        />
        <LabelInput
          name={isBillingAddress ? 'billingLastName' : 'lastName'}
          label="Last name"
          placeholder="Input text"
          control={control}
          isRequired={!isBillingAddress} // will handle in future
        />
      </div>
      <LabelInput
        name={isBillingAddress ? 'billingAddress' : 'address'}
        label="Address"
        placeholder="Input text"
        control={control}
        isRequired={!isBillingAddress} // will handle in future
      />
      {addApartmentField ? (
        <LabelInput
          name={
            isBillingAddress ? 'billingApartmentAddress' : 'apartmentAddress'
          }
          label="Apartment, Suite, Etc"
          placeholder="Input text"
          control={control}
        />
      ) : (
        <div
          className="flex gap-4 text-indigo-600 dark:text-yellow-400 cursor-pointer items-center"
          onClick={onAddApartmentField}
        >
          <CirclePlusIcon size={15} />
          <div className="font-medium text-sm	leading-[21px]">
            Add Apartment, Suite, Etc
          </div>
        </div>
      )}
      <div className="flex justify-between gap-6 max-[600px]:flex-col">
        <div className="w-[40%] max-[600px]:w-[100%]">
          <LabelInput
            name={isBillingAddress ? 'billingCity' : 'city'}
            label="City"
            placeholder="Input text"
            control={control}
            isRequired={!isBillingAddress} // will handle in future
          />
        </div>
        <div className="flex justify-between gap-6 min-[600px]:w-[60%] max-[600px]:w-[100%] max-[500px]:flex-col">
          <div className="!-mt-[3px] w-[60%] max-[600px]:w-[50%] max-[500px]:w-[100%]">
            <Select
              control={control}
              name={isBillingAddress ? 'billingState' : 'state'}
              isRequired={!isBillingAddress} // will handle in future
              className="w-full"
              label="State"
              isBlueTheme
              optionTitle="Select State"
              options={states}
            />
          </div>
          <div className="w-[40%] max-[600px]:w-[50%] max-[500px]:w-[100%]">
            <LabelInput
              name={isBillingAddress ? 'billingZipCode' : 'zipCode'}
              label="ZIP Code"
              placeholder="Input text"
              control={control}
              maxLength={5}
              rules={{
                pattern: zipCodePattern,
              }}
              isRequired={!isBillingAddress} // will handle in future
              errorMessage="ZIP Code Not Valid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInformationFields;
