'use client';

import { Select } from '@src/atoms';
import { GenderIdentityEnum } from '@services/users/users.type';
import { UseFormReturn } from 'react-hook-form';
import RaceIdentify from './RaceIdentify';

export const militaryVeteranOptions = [
  { label: `Yes, I'm a military veteran`, value: 'military-veteran' },
  {
    label: `Yes, I'm an active-duty service member`,
    value: 'active-duty-service-member',
  },
  { label: 'No', value: 'No' },
  { label: 'Prefer Not to Say', value: 'NotToSay' },
];

function PersonalBackground({ form }: { form: UseFormReturn }) {
  const { control } = form;

  const genderIdentityOptions = Object.keys(GenderIdentityEnum)?.map(
    (identity) => ({ label: identity, value: identity }),
  );

  return (
    <div className="flex flex-col gap-8 xl:!w-[60%] w-[100%] relative">
      <Select
        control={control}
        name="genderIdentity"
        options={genderIdentityOptions}
        label="What gender do you identify with? (Select all that apply)"
      />
      <RaceIdentify form={form} />
      <Select
        control={control}
        name="militaryVeteran"
        options={militaryVeteranOptions}
        label="Are you a military veteran or active-duty service member?"
      />
    </div>
  );
}

export default PersonalBackground;
