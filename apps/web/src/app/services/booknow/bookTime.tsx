import { Card, Datepicker as FlowBiteDatePicker, Label } from '@src/flowbite';

import { convertToDollarAmount } from '@src/lib/numbers';
import { useEffect, useState } from 'react';
import { getDayName, getFullDates } from '@src/lib/date';
import { BookTimeProps, slot } from '../types';

function BookTime(props: BookTimeProps) {
  const {
    handleDateChange,
    slots = [],
    form,
    serviceDetails,
    selectedDate,
  } = props;

  const {
    price = 0,
    duration = 0,
    saleStartDate = '',
    saleEndDate,
    weeklyHours,
  } = serviceDetails || {};

  const { setValue } = form;

  const selectedDays = Object.keys(weeklyHours || {});

  const [saleDateRange, setSaleDateRange] = useState<Date[]>([]);

  const computeEndTime = (startTime: string, duration: number) => {
    const [time, period] = startTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let hours24 = hours;
    if (period === 'PM' && hours < 12) {
      hours24 += 12;
    } else if (period === 'AM' && hours === 12) {
      hours24 = 0;
    }

    const startDate = new Date();
    startDate.setHours(hours24, minutes);

    const endDate = new Date(startDate.getTime() + duration * 60000);
    let endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
    let endPeriod = 'AM';

    if (endHours >= 12) {
      endPeriod = 'PM';
      if (endHours > 12) {
        endHours -= 12;
      }
    } else if (endHours === 0) {
      endHours = 12;
    }

    return `${endHours}:${endMinutes} ${endPeriod}`;
  };

  useEffect(() => {
    const dateWithDays =
      saleStartDate &&
      saleEndDate &&
      getFullDates(new Date(saleStartDate), new Date(saleEndDate));
    const dates = dateWithDays && dateWithDays?.map(({ date }) => date);
    const filteredDates =
      dates && dates?.filter((date) => selectedDays.includes(getDayName(date)));

    filteredDates && setSaleDateRange(filteredDates);
  }, [saleStartDate, saleEndDate, selectedDays]);

  return (
    <div className="max-w-[890px] mx-auto w-full flex flex-col justify-center p-0 mt-16">
      <div className="text-black font-bold text-2xl leading-[36px] dark:text-white">
        Book appointment for Painting services
      </div>
      <div className="font-normal text-2xl leading-[36px] text-green-500 dark:text-green-400 mt-1 mb-10">
        {convertToDollarAmount(Number(price), true)} per {duration.toString()}{' '}
        {duration > 1 ? 'Minutes' : 'Minute'}
      </div>

      <div className="flex gap-5 w-full">
        <div className="w-[50%]">
          <FlowBiteDatePicker
            showClearButton={false}
            showTodayButton={false}
            onChange={handleDateChange}
            name="bookingDate"
            autoHide={false}
            rangeAllDates={saleDateRange}
            isStableDateRange
            defaultDate={
              selectedDate ? new Date(selectedDate) : new Date(saleStartDate)
            }
            weekStart={1}
            minDate={saleStartDate ? new Date(saleStartDate) : undefined}
            maxDate={saleEndDate ? new Date(saleEndDate) : undefined}
            inline
            theme={{
              popup: {
                root: {
                  inner:
                    'inline-block rounded-lg bg-white p-2 shadow-xl dark:bg-gray-800 w-full ',
                },
              },
              views: {
                days: { items: { base: 'grid w-full grid-cols-7' } },
              },
            }}
            color="gray"
          />
        </div>
        <Card className="w-[50%] p-1 mt-2 item-center">
          <div className="w-full h-full p-0">
            <div className="flex w-full mx-auto gap-5">
              <div className="w-full ">
                <ul
                  id="timetable"
                  className="grid w-full grid-cols-2 gap-2 mt-0 "
                >
                  {slots?.length > 0
                    ? slots.map((element: slot) => (
                        <li>
                          <input
                            type="radio"
                            id={element.time}
                            value={element.time}
                            name="startTime"
                            className="hidden peer"
                            disabled={element.isAvailable === false}
                            onChange={(e) => {
                              setValue('startTime', e.target.value);
                              const endTime = computeEndTime(
                                e.target.value,
                                duration,
                              );
                              setValue('endTime', endTime);
                            }}
                          />
                          <Label
                            htmlFor={element.time}
                            disabled={element.isAvailable === false}
                            className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-black-400 border-gray-200 dark:hover:text-white dark:border-indigo-500 dark:peer-checked:border-indigo-500 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 hover:text-white peer-checked:text-white hover:bg-indigo-500 dark:text-indigo-500 dark:bg-gray-900 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:peer-checked:bg-indigo-500"
                          >
                            {element.time}
                          </Label>
                        </li>
                      ))
                    : 'No Slots Available'}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BookTime;
