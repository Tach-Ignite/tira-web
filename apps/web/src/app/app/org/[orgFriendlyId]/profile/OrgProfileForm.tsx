'use client';

import { OrganizationsEntity } from '@services';
import { ImageUpload, LabelInput } from '@src/atoms';
import { emailPattern, urlPattern } from '@src/lib/constants/validation';
import { formatPhoneNumber } from '@src/lib/numbers';
import { UseFormReturn } from 'react-hook-form';

function OrgProfileForm({
  form,
}: {
  form: UseFormReturn<OrganizationsEntity>;
}) {
  const { control, setValue, watch } = form;

  const { logoUrl } = watch();

  const onPhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setValue(
      event?.target?.name as 'contactPhone' | 'companyPhone',
      formatPhoneNumber(input),
      {
        shouldDirty: true,
      },
    );
  };

  return (
    <div className="border space-y-10 rounded-lg border-neutral-light dark:border-white sm:!px-10 !px-4 py-12">
      <div className="flex gap-10 w-full xl:!items-center xl:!flex-row flex-col-reverse">
        <div className="space-y-10 w-full lg:!max-w-2xl 2xl:!max-w-4xl">
          <LabelInput
            control={control}
            name="name"
            placeholder="Company Name"
            label="Company name"
            isRequired
          />
          <LabelInput
            control={control}
            name="addressLine1"
            label="Address Line 1"
            placeholder="Address Line 1"
          />
          <LabelInput
            control={control}
            name="addressLine2"
            label="Address Line 2"
            placeholder="Address Line 2"
          />
          <LabelInput
            control={control}
            name="city"
            label="City"
            placeholder="City"
          />
          <LabelInput
            control={control}
            name="state"
            label="State/Province"
            placeholder="State"
          />
        </div>
        <div className="tab:min-w-96 m-auto">
          <ImageUpload
            form={form}
            isSingleImage
            gridTitle="Logo"
            imageField="logoUrl"
            fileUrl={logoUrl}
            label="Upload Logo"
            acceptedFiles=".svg, .png, .jpg, .jpeg, .gif"
          />
        </div>
      </div>
      <div className="flex gap-10 xl:!flex-row !flex-col w-full">
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full">
          <LabelInput
            control={control}
            name="country"
            label="Country/Religion"
            placeholder="Country"
          />
        </div>
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full xl:m-auto">
          <LabelInput
            control={control}
            name="zipCode"
            label="Zip/Postal Code"
            placeholder="Postal Code"
          />
        </div>
      </div>
      <div className="flex gap-10 xl:!flex-row !flex-col w-full">
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full">
          <LabelInput
            control={control}
            name="websiteURL"
            label="Website URL"
            rules={{
              pattern: urlPattern,
            }}
            errorMessage="Please enter a valid URL."
            placeholder="Website URL"
          />
        </div>
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full xl:m-auto">
          <LabelInput
            control={control}
            name="linkedInURL"
            label="LinkedIn URL"
            rules={{
              pattern: urlPattern,
            }}
            errorMessage="Please enter a valid URL."
            placeholder="LinkedIn URL"
          />
        </div>
      </div>
      <div className="flex gap-10 xl:!flex-row !flex-col w-full">
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full">
          <LabelInput
            control={control}
            name="companyEmail"
            label="Company Email"
            placeholder="Company Email"
            rules={{
              pattern: emailPattern,
            }}
            errorMessage="Entered value does not match email format"
          />
        </div>
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full xl:m-auto">
          <LabelInput
            control={control}
            name="companyPhone"
            label="Company Phone"
            placeholder="Company Phone"
            type="tel"
            maxLength={14}
            onChange={onPhoneInput}
          />
        </div>
      </div>
      <p className="text-black dark:text-gray-50 font-semibold text-[18px]">
        Main Contact Info
      </p>
      <div className="flex gap-10 xl:!flex-row !flex-col w-full">
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full">
          <LabelInput
            control={control}
            name="contactName"
            label="Contact Name"
            placeholder="Full Name"
          />
        </div>
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full xl:m-auto">
          <LabelInput
            control={control}
            name="contactPhone"
            label="Contact Phone"
            placeholder="Phone"
            type="tel"
            maxLength={14}
            onChange={onPhoneInput}
          />
        </div>
      </div>
      <div className="flex gap-10 xl:!flex-row !flex-col w-full">
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full">
          <LabelInput
            control={control}
            name="contactEmail"
            label="Contact Email"
            placeholder="Contact Email"
            rules={{
              pattern: emailPattern,
            }}
            errorMessage="Entered value does not match email format"
          />
        </div>
        <div className="lg:!max-w-2xl 2xl:!max-w-4xl w-full xl:m-auto xl:!flex !hidden" />
      </div>
    </div>
  );
}

export default OrgProfileForm;
