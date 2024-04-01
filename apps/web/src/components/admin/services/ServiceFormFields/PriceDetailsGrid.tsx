'use client';

import { Card } from '@src/flowbite';
import { DatePicker, LabelInput } from '@src/atoms';
import { ServiceDetailsGridProps } from './types';

function PriceDetailsGrid(props: ServiceDetailsGridProps) {
  const { serviceForm, isEditing } = props;

  const { control, watch, setError, clearErrors, setValue } = serviceForm;

  const validateEndDateField = (
    startDate: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { saleEndDate } = watch() || {};
    if (saleEndDate && (startDate as unknown as Date) >= saleEndDate) {
      setError('saleEndDate', {
        message: 'Date Should End After Start Date.',
        type: 'validate',
      });
      setValue('saleStartDate', startDate as unknown as Date, {
        shouldDirty: true,
      });
    } else {
      clearErrors('saleEndDate');
      setValue('saleStartDate', startDate as unknown as Date, {
        shouldDirty: true,
      });
    }
  };

  return (
    <Card>
      <p className="text-black dark:text-white font-medium text-[18px] leading-[27px] mb-2">
        Price details
      </p>
      <div className="flex max-[1500px]:gap-8 min-[1500px]:gap-36">
        <LabelInput
          name="price"
          label="Service Price"
          placeholder="Input text"
          control={control}
          isRequired
        />
        <LabelInput
          name="msrp"
          label="MSRP Price"
          placeholder="Input text"
          control={control}
          isRequired
        />
      </div>
      <div className="flex max-[1500px]:gap-8 min-[1500px]:gap-36 mt-6">
        <DatePicker
          control={control}
          isEditing={isEditing}
          label="Sale Start"
          name="saleStartDate"
          onChange={validateEndDateField}
        />
        <DatePicker
          control={control}
          isEditing={isEditing}
          label="Sale End"
          name="saleEndDate"
          rules={{
            validate: (value: Date, formValues: any) => {
              const { saleStartDate } = formValues || {};
              if (saleStartDate && saleStartDate >= value) {
                return 'Date Should End After Start Date.';
              }
              return true;
            },
          }}
        />
      </div>
    </Card>
  );
}

export default PriceDetailsGrid;
