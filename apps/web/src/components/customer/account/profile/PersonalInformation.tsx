'use client';

import { LabelInput as Input } from '@src/atoms';
import { emailPattern } from '@src/lib/constants/validation';
import { UseFormReturn } from 'react-hook-form';

function PersonalInformation({ form }: { form: UseFormReturn }) {
  const { control } = form;

  return (
    <div className="flex flex-col gap-8 relative">
      <Input
        control={control}
        name="fullName"
        label="Your Name"
        placeholder="Your full name"
        isRequired
      />

      <div className="flex gap-5">
        <Input
          control={control}
          name="phoneNumber"
          isRequired
          label="Phone Number"
          placeholder="Include area code (+1-000-000-0000)"
        />
        <Input
          control={control}
          name="emailAddress"
          disabled
          isRequired
          rules={{
            pattern: emailPattern,
          }}
          errorMessage="Entered value does not match email format"
          placeholder="Your email@xxxx.com"
          label="Email Address"
        />
      </div>
      <div className="flex gap-5 w-full">
        <Input
          control={control}
          name="city"
          label="Your City"
          placeholder="Type your answer"
          isRequired
        />
        <Input
          control={control}
          name="state"
          label="Your State"
          placeholder="Type your answer"
          isRequired
        />
      </div>
    </div>
  );
}

export default PersonalInformation;
