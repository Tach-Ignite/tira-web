/* eslint-disable react/require-default-props */

'use client';

import { LabelInput as Input, ImageUpload } from '@src/atoms';
import { UseFormReturn } from 'react-hook-form';

function Overview({ form }: { form: UseFormReturn }) {
  const { control } = form;

  return (
    <div className="rounded-sm px-5 pt-4 md:!pt-0 pb-10 relative w-full">
      <div className="flex flex-col gap-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:!gap-8 place-content-center">
          <div className="grid grid-cols-1 gap-2 md:!gap-10 md:!pt-2 place-content-start">
            <Input
              control={control}
              className="gap-5"
              name="firstName"
              label="First Name"
              placeholder="First Name"
              isRequired
            />
            <Input
              control={control}
              className="gap-5"
              name="lastName"
              label="Last Name"
              placeholder="Last full name"
              isRequired
            />
            <div className="flex gap-5 md:!flex-row !flex-col">
              <Input
                control={control}
                className="gap-5"
                name="phoneNumber"
                label="Phone Number"
                placeholder="Include area code (+1-000-000-0000)"
                rules={{
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message:
                      'Please enter a valid phone number with country code',
                  },
                }}
                errorMessage="Please enter a valid phone number."
              />
            </div>
          </div>
          <div className="grid grid-cols-1 place-content-center px-2 md:!px-10">
            <div className="w-full h-full mb-1 md:!mb-5 mt-20 md:!-mt-10 tab:!min-w-[280px] md:!min-w-[450px] md:!max-w-[450px] md:!min-h-[480px] md:!max-h-[480px] self-center md:!self-start">
              <ImageUpload
                form={form}
                isSingleImage
                gridTitle="Your Photo"
                imageField="profileImageUrl"
                label="Your Photo"
                acceptedFiles=".svg, .png, .jpg, .jpeg, .gif"
                // isProfilePhoto
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-full md:!flex-row !flex-col">
          <Input
            control={control}
            className="gap-5"
            name="countryRegion"
            label="Country/Region"
            placeholder="Country"
          />
          <Input
            control={control}
            className="gap-5"
            name="postalCode"
            label="Zip/Postal Code"
            placeholder="Postal Code"
          />
        </div>
        <div className="flex gap-5 w-full md:!flex-row !flex-col">
          <Input
            control={control}
            className="gap-5"
            name="city"
            label="City"
            placeholder="City"
          />
          <Input
            control={control}
            className="gap-5"
            name="state"
            label="State/Province"
            placeholder="State"
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
