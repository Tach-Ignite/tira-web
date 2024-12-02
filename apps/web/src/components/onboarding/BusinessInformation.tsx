'use client';

import { LabelInput } from '@src/atoms';
import { urlPattern } from '@src/lib/constants/validation';
import { OnboardingInfoProps } from './types';

function BusinessInformation(props: OnboardingInfoProps) {
  const { form } = props || {};

  const { control } = form;

  return (
    <div className="grid grid-cols-1 place-items-start gap-4 md:!gap-6 py-4 md:py-10 px-8 pb-8 rounded-lg w-full md:!mb-0">
      <div className="flex gap-5 md:!gap-20 w-full md:!w-2/5 md:!flex-row flex-col md:!mb-4">
        <LabelInput
          control={control}
          className="gap-5"
          name="companyName"
          label="Company Name"
          helperText="You can modify anytime in the settings."
          placeholder="Company Name"
          isRequired
        />
      </div>
      <div className="flex gap-5 md:!gap-20 w-full md:!w-4/5 md:!flex-row flex-col">
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
      <div className="flex gap-5 md:!gap-20 w-full md:!w-4/5 md:!flex-row flex-col">
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
      <div className="flex gap-5 md:!gap-20 w-full md:!w-4/5 md:!flex-row flex-col">
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
      <div className="flex gap-5 md:!gap-20 w-full md:!w-4/5 md:!flex-row flex-col">
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
