'use client';

import { LabelInput } from '@src/atoms';
import { Card } from '@src/flowbite';
import { ServiceDetailsGridProps } from './types';

function ServiceDetailsGrid(props: ServiceDetailsGridProps) {
  const { serviceForm } = props;

  const { control } = serviceForm;

  return (
    <Card>
      <p className="text-black dark:text-white font-medium text-[18px] leading-[27px] mb-2">
        Service details
      </p>
      <div className="flex max-[1500px]:gap-8 min-[1500px]:gap-36">
        <LabelInput
          name="companyName"
          label="Company Name"
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
          name="serviceName"
          label="Service Name"
          placeholder="Input text"
          control={control}
          isRequired
        />
      </div>
    </Card>
  );
}

export default ServiceDetailsGrid;
