'use client';

import { LabelInput } from '@src/atoms';
import { urlPattern } from '@src/lib/constants/validation';
import { OnboardingInfoProps } from './types';

function PersonalInformation(props: OnboardingInfoProps) {
  const { form } = props || {};

  const { control } = form;

  return (
    <div className="grid grid-cols-1 place-items-start gap-4 md:!gap-6 py-4 md:py-10 px-8 pb-8 rounded-lg w-full md:!mb-0">
      <div className="flex gap-5 md:!gap-20 w-full md:!w-4/5 md:!flex-row flex-col md:!mb-4">
        <LabelInput
          control={control}
          className="gap-5"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          isRequired
        />
        <LabelInput
          control={control}
          className="gap-5"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          isRequired
        />
      </div>
      <div className="flex gap-5 md:!gap-20 w-full md:!w-4/5 md:!flex-row flex-col">
        <LabelInput
          control={control}
          className="gap-5"
          name="phoneNumber"
          label="Phone Number"
          placeholder="+1 (XXX)-XXX-XXXX"
          rules={{
            pattern: {
              value: /^\+?[1-9]\d{1,14}$/,
              message: 'Please enter a valid phone number with country code',
            },
          }}
          errorMessage="Please enter a valid phone number."
        />
        <LabelInput
          control={control}
          className="gap-5"
          name="linkedInURL"
          label="LinkedIn"
          placeholder="https://www.linkedin.com/..."
          rules={{
            pattern: urlPattern,
          }}
          errorMessage="Please enter a valid URL."
        />
      </div>
      <div className="flex gap-5 md:!gap-20 w-full md:!w-4/5 md:!flex-row flex-col mb-2">
        <LabelInput
          control={control}
          className="gap-5"
          name="countryRegion"
          label="Country/Region"
          placeholder="Country"
        />
        <LabelInput
          control={control}
          className="gap-5"
          name="postalCode"
          label="Zip/Postal Code"
          placeholder="Postal Code"
        />
      </div>
      <div className="flex gap-5 md:!gap-20 w-full md:!w-4/5 md:!flex-row flex-col mb-2">
        <LabelInput
          control={control}
          className="gap-5"
          name="city"
          label="City"
          placeholder="City"
        />
        <LabelInput
          control={control}
          className="gap-5"
          name="state"
          label="State/Province"
          placeholder="State"
        />
      </div>
    </div>
  );
}

export default PersonalInformation;
