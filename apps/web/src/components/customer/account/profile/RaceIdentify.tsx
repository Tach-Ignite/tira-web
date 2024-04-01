'use client';

import { Controller } from 'react-hook-form';
import { Label } from '@src/flowbite';
import { Checkbox } from '@src/atoms';

const raceOptions = [
  { label: 'White', value: 'White' },
  { label: 'Hispanic or Latino', value: 'Hispanic or Latino' },
  { label: 'Black or African American', value: 'Black or African American' },
  {
    label: 'Native American or Alaska Native',
    value: 'Native American or Alaska Native',
  },
  { label: 'Asian', value: 'Asian' },
  {
    label: 'Native Hawaiian or Other Pacific Islander',
    value: 'Native Hawaiian or Other Pacific Islander',
  },
  { label: 'Other', value: 'Other' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

function RaceIdentify(props: any) {
  const { form } = props;

  const { control, setValue, watch } = form;

  const { race: selectedRaces = [] } = watch();

  const onSelectRaces = (race: string) => {
    if (selectedRaces?.includes(race)) {
      const filteredRaces = selectedRaces?.filter(
        (tag: string) => tag !== race,
      );
      setValue('race', filteredRaces, { shouldDirty: true });
    } else {
      setValue('race', [...selectedRaces, race], {
        shouldDirty: true,
      });
    }
  };

  return (
    <Controller
      name="race"
      control={control}
      render={({ field: { onChange, name, value } }) => (
        <div className="w-full flex flex-col items-start gap-1">
          <Label className="!text-gray90 font-medium text-sm">
            What race(s) do you identify with? (Select all that apply)
          </Label>
          <div className="w-full">
            {raceOptions?.map(({ label, value: raceValue }) => {
              const onHandleChange = (
                event: React.ChangeEvent<HTMLInputElement>,
              ) => {
                onChange(event);
                onSelectRaces(raceValue);
              };

              return (
                <Checkbox
                  control={control}
                  key={label}
                  onChange={onHandleChange}
                  name={`${name}.${raceValue}`}
                  isChecked={selectedRaces?.includes(raceValue) || false}
                  className="items-center"
                  value={value}
                  label={label}
                  isGrayTheme
                />
              );
            })}
          </div>
        </div>
      )}
    />
  );
}

export default RaceIdentify;
