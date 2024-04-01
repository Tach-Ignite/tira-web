'use client';

import { Dropdown } from '@src/atoms';
import { generateTimeOptions } from '@src/lib/date';
import { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { SelectTimeHourProps, TimeSlot } from './types';

const timeOptions = generateTimeOptions();

function SelectHourTime(props: SelectTimeHourProps) {
  const { form, name, timeSlots = [], onUpdate } = props;

  const { control } = form;

  const [slots, setSlots] = useState<TimeSlot[]>(
    timeSlots.length > 0
      ? timeSlots
      : [{ startTime: '08:00 AM', endTime: '08:00 PM' }],
  );

  const addTimeSlot = () => {
    setSlots((prevSlots) => [
      ...prevSlots,
      { startTime: '08:00 AM', endTime: '08:00 PM' },
    ]);
    onUpdate([...slots, { startTime: '08:00 AM', endTime: '08:00 PM' }]);
  };

  const removeTimeSlot = (indexToRemove: number) => {
    const updatedSlots = slots.filter(
      (_: {}, index: number) => index !== indexToRemove,
    );
    setSlots(updatedSlots);
    onUpdate(updatedSlots);
  };

  useEffect(() => {
    setSlots(timeSlots);
    onUpdate(slots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTimeSlot = (
    index: number,
    field: keyof TimeSlot,
    value: string,
  ) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
    onUpdate(updatedSlots);
  };

  return (
    <>
      {slots.map((slot: TimeSlot, index: number) => (
        <div className="flex gap-3 items-center">
          <Dropdown
            control={control}
            onChange={(e) => {
              updateTimeSlot(index, 'startTime', e);
            }}
            name={`${name}.From`}
            options={timeOptions}
            label={slot.startTime}
          />
          <div className="text-sm m-auto leading-[21px] self-start text-black dark:text-white">
            -
          </div>
          <Dropdown
            onChange={(e) => updateTimeSlot(index, 'endTime', e)}
            control={control}
            name={`${name}.To`}
            options={timeOptions}
            label={slot.endTime}
          />

          <FaTimes onClick={() => removeTimeSlot(index)} />

          <FaPlus className="cursor-pointer" onClick={addTimeSlot} />
        </div>
      ))}
    </>
  );
}

export default SelectHourTime;
