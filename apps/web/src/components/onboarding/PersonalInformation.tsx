'use client';

import { LabelInput } from '@src/atoms';
import { urlPattern } from '@src/lib/constants/validation';
import { useOnboarding } from '@context/OnboardingContext';

function PersonalInformation() {
  const { onboardingForm } = useOnboarding() || {};

  const { control } = onboardingForm;

  return (
    <div className="grid grid-cols-1 place-items-start gap-4 lg:!gap-2 py-4 xl:!py-10 px-8 xl:!pl-24 md:pl-0 lg:!ml-24 tab-!ml-0 pb-8 w-full lg:!w-4/5 lg:!mb-10">
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-4"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          isRequired
        />
        <LabelInput
          control={control}
          className="gap-4"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          isRequired
        />
      </div>
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-4"
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
          className="gap-4"
          name="linkedInURL"
          label="LinkedIn"
          placeholder="https://www.linkedin.com/..."
          rules={{
            pattern: urlPattern,
          }}
          errorMessage="Please enter a valid URL."
        />
      </div>
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-4"
          name="countryRegion"
          label="Country/Region"
          placeholder="Country"
        />
        <LabelInput
          control={control}
          className="gap-4"
          name="postalCode"
          label="Zip/Postal Code"
          placeholder="Postal Code"
        />
      </div>
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-4"
          name="city"
          label="City"
          placeholder="City"
        />
        <LabelInput
          control={control}
          className="gap-4"
          name="state"
          label="State/Province"
          placeholder="State"
        />
      </div>
    </div>
  );
}

export default PersonalInformation;
