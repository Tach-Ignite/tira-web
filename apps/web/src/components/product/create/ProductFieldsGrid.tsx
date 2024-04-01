'use client';

import React from 'react';
import { Card } from '@src/flowbite';
import { DollarIcon } from '@src/icons';
import { LabelInput } from '../../../atoms/Input';
import { ProductFieldProps } from './types';
import { ProductType } from '../../../types/modules';
import { DatePicker } from '../../../atoms/Datepicker';

function ProductFieldsGrid(props: ProductFieldProps) {
  const { productForm, isEditing } = props || {};

  const { control, setError, clearErrors, setValue, watch } = productForm || {};

  const validateNumericField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event?.target || {};
    if (isNaN(Number(value))) {
      if (name === 'quantity') {
        setError(name, {
          message: 'Enter a number',
          type: 'validate',
        });
        setValue('quantity', value, { shouldDirty: true });
      } else {
        setError(name as keyof ProductType, {
          message: 'Display prices in numerical format.',
          type: 'validate',
        });
        setValue(name as keyof ProductType, value, { shouldDirty: true });
      }
    } else {
      clearErrors(name as keyof ProductType);
      setValue(name as keyof ProductType, value, { shouldDirty: true });
    }
  };

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
      <div className="flex max-[1500px]:gap-8 min-[1500px]:gap-36">
        <LabelInput
          name="brand"
          label="Brand"
          placeholder="Input text"
          control={control}
          isRequired
        />
        <LabelInput
          name="friendlyId"
          label="Friendly ID"
          placeholder="Input text"
          control={control}
          isRequired
        />
      </div>
      <div className="flex max-[1500px]:gap-8 min-[1500px]:gap-36 mt-6">
        <LabelInput
          name="title"
          label="Name"
          placeholder="Input text"
          control={control}
          isRequired
        />
        <LabelInput
          name="quantity"
          label="Quantity"
          placeholder="Input text"
          control={control}
          isRequired
          rules={{
            validate: (value: string) => {
              if (isNaN(Number(value))) {
                return 'Enter a number';
              }
              return true;
            },
          }}
          onChange={validateNumericField}
        />
      </div>
      <div className="flex max-[1500px]:gap-8 min-[1500px]:gap-36 my-6">
        <LabelInput
          name="msrpPrice"
          isRequired
          label="MSRP Price"
          startAdornment={DollarIcon}
          control={control}
          rules={{
            validate: (value: string) => {
              if (isNaN(Number(value))) {
                return 'Display prices in numerical format.';
              }
              return true;
            },
          }}
          onChange={validateNumericField}
        />
        <LabelInput
          name="salePrice"
          isRequired
          label="Sale Price"
          startAdornment={DollarIcon}
          control={control}
          rules={{
            validate: (value: string) => {
              if (isNaN(Number(value))) {
                return 'Display prices in numerical format.';
              }
              return true;
            },
          }}
          onChange={validateNumericField}
        />
      </div>
      <div className="flex max-[1500px]:gap-8 min-[1500px]:gap-36 mb-6">
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
            validate: (value: Date, formValues: ProductType) => {
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

export default ProductFieldsGrid;
