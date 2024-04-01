/* eslint-disable import/no-cycle */
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from '@src/flowbite';
import { SearchInput } from '@src/atoms/Input';
import { addQueryParam, debounce, removeQueryParam } from '@src/lib/functions';
import { LabelInput } from '@src/atoms';
import { UseFormReturn } from 'react-hook-form';
import { CustomerProductFiltersProps } from './types';
import { CategorySelect } from '../create';
import { customerProductPageSizeOptions } from './index';

function PriceRangeInputs({ form }: { form: UseFormReturn }) {
  const { control } = form;

  const onPriceChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>, isMaxPrice?: boolean) => {
      const { value } = event.target;

      const key = `price_range_${isMaxPrice ? 'to' : 'from'}`;
      if (value) {
        addQueryParam(key, value);
      } else {
        removeQueryParam(key);
      }
    },
  );

  return (
    <div className="flex justify-between  gap-4">
      <LabelInput
        name="minPrice"
        placeholder="Enter Value"
        label="Min Amount"
        control={control}
        onChange={(event) => onPriceChange(event)}
      />
      <LabelInput
        name="maxPrice"
        placeholder="Enter Value"
        label="Max Amount"
        control={control}
        onChange={(event) => onPriceChange(event, true)}
      />
    </div>
  );
}

function CustomerProductFilters(props: CustomerProductFiltersProps) {
  const { form, searchValue } = props;

  const totalFilters = [
    {
      title: 'Search',
      content: (
        <SearchInput
          withIcon={false}
          searchValue={searchValue}
          placeHolder="Type here"
          pageSize={customerProductPageSizeOptions?.[0]}
        />
      ),
    },
    {
      title: 'Categories',
      content: <CategorySelect form={form} isCustomer />,
    },
    {
      title: 'Price Range',
      content: <PriceRangeInputs form={form} />,
    },
  ];

  return (
    <Accordion alwaysOpen>
      {totalFilters?.map(({ content, title }) => (
        <AccordionPanel key={title}>
          <AccordionTitle>{title}</AccordionTitle>
          <AccordionContent>{content}</AccordionContent>
        </AccordionPanel>
      ))}
    </Accordion>
  );
}

export default CustomerProductFilters;
