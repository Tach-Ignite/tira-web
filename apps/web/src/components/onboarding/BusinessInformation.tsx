'use client';

import { LabelInput } from '@src/atoms';
import { urlPattern } from '@src/lib/constants/validation';
import { useOnboarding } from '@context/OnboardingContext';

function BusinessInformation() {
  const { onboardingForm } = useOnboarding();

  const { control } = onboardingForm;

  return (
    <div className="grid grid-cols-1 place-items-start gap-4 lg:!gap-2 py-4 md:!py-10 px-8 xl:!pl-24 md:pl-0 lg:!ml-24 tab-!ml-0 pb-8 w-full lg:!w-4/5 lg:!mb-10">
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-5"
          name="companyName"
          label="Company Name"
          helperText="You can modify anytime in the settings."
          placeholder="Company Name"
          isRequired
        />
        <div className="w-full hidden md:!flex" />
      </div>
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-5"
          name="addressLine1"
          label="Address Line 1"
          placeholder="Address Line 1"
        />
        <LabelInput
          control={control}
          className="gap-5"
          name="addressLine2"
          label="Address Line 2"
          placeholder="Address Line 2"
        />
      </div>
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-5"
          name="businessCity"
          label="City"
          placeholder="City"
        />
        <LabelInput
          control={control}
          className="gap-5"
          name="businessState"
          label="State/Province"
          placeholder="State"
        />
      </div>
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-5"
          name="businessCountryRegion"
          label="Country/Region"
          placeholder="Country"
        />
        <LabelInput
          control={control}
          className="gap-5"
          name="businessPostalCode"
          label="Zip/Postal Code"
          placeholder="Postal Code"
        />
      </div>
      <div className="flex gap-5 lg:!gap-8 w-full lg:!w-4/5 md:!flex-row flex-col lg:!mb-4">
        <LabelInput
          control={control}
          className="gap-5"
          name="businessUrl"
          label="Website URL"
          placeholder="Website URL"
          rules={{
            pattern: urlPattern,
          }}
          errorMessage="Please enter a valid URL."
        />
        <LabelInput
          control={control}
          className="gap-5"
          name="businessLinkedInURL"
          label="LinkedIn"
          placeholder="LinkedIn URL"
          rules={{
            pattern: urlPattern,
          }}
          errorMessage="Please enter a valid URL."
        />
      </div>
    </div>
  );
}

export default BusinessInformation;
