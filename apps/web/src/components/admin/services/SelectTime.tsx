'use client';

import { Dropdown } from '@src/atoms';
import { generateTimeOptions } from '@src/lib/date';
import { useEffect } from 'react';
import { SelectTimeProps } from './types';

const timeOptions = generateTimeOptions();

function SelectTime(props: SelectTimeProps) {
  const { form, name } = props;

  const { control, setValue, watch } = form;

  const onChange = (value: string, isToDate: boolean) => {
    setValue(`${name}.${isToDate ? 'To' : 'From'}`, value, {
      shouldDirty: true,
    });
  };

  const watchFromTime = watch(`${name}.From`);
  const watchToTime = watch(`${name}.To`);

  useEffect(() => {
    if (!watchFromTime) {
      setValue(`${name}.From`, '8:00 AM');
    }
    if (!watchToTime) {
      setValue(`${name}.To`, '8:00 PM');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, watchFromTime, watchToTime]);

  return (
    <div className="flex gap-3 items-center">
      <Dropdown
        control={control}
        onChange={(value) => onChange(value, false)}
        name={`${name}.From`}
        options={timeOptions}
      />
      <div className="text-sm m-auto leading-[21px] self-start text-black dark:text-white">
        -
      </div>
      <Dropdown
        onChange={(value) => onChange(value, true)}
        control={control}
        name={`${name}.To`}
        options={timeOptions}
      />
    </div>
  );
}

export default SelectTime;
