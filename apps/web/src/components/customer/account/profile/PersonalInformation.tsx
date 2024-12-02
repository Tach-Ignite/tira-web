'use client';

import { LabelInput as Input, Select } from '@src/atoms';
import { emailPattern } from '@src/lib/constants/validation';
import { usePathname } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';

export const themeModeOptions = [
  { label: `Dark`, value: 'dark' },
  {
    label: `Light`,
    value: 'light',
  },
  { label: 'System', value: 'auto' },
];

function PersonalInformation({ form }: { form: UseFormReturn }) {
  const { control } = form;

  const pathName = usePathname();

  const isAdminconsolePage = pathName?.includes('admin-console');

  return (
    <div className="flex flex-col gap-8 relative">
      <Input
        control={control}
        name="fullName"
        label="Your Name"
        placeholder="Your full name"
        isRequired={!isAdminconsolePage}
      />

      <div className="flex gap-5 tab:!flex-row !flex-col">
        <Input
          control={control}
          name="phoneNumber"
          isRequired={!isAdminconsolePage}
          label="Phone Number"
          placeholder="Include area code (+1-000-000-0000)"
        />
        <Input
          control={control}
          name="emailAddress"
          disabled
          isRequired={!isAdminconsolePage}
          rules={{
            pattern: emailPattern,
          }}
          errorMessage="Entered value does not match email format"
          placeholder="Your email@xxxx.com"
          label="Email Address"
        />
      </div>
      <div className="flex gap-5 w-full tab:!flex-row !flex-col">
        <Input
          control={control}
          name="city"
          label="Your City"
          placeholder="Type your answer"
          isRequired={!isAdminconsolePage}
        />
        <Input
          control={control}
          name="state"
          label="Your State"
          placeholder="Type your answer"
          isRequired={!isAdminconsolePage}
        />
      </div>
      {isAdminconsolePage ? null : (
        <div className="flex flex-col gap-5 w-1/2">
          <Select
            control={control}
            name="themeMode"
            options={themeModeOptions}
            label="Preferred Theme Mode"
          />
        </div>
      )}
    </div>
  );
}

export default PersonalInformation;
