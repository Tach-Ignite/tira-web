'use client';

import {
  Card,
  ModalBody,
  Modal,
  Datepicker as FlowBiteDatePicker,
} from '@src/flowbite';
import { Checkbox, DateRangePicker, LabelInput, Button } from '@src/atoms';
import { CirclePlusIcon } from '@src/icons';
import { weekdays, getFullDates, getWeekdays } from '@src/lib/date';
import SelectTime from '@components/admin/services/SelectTime';
import { useEffect, useState } from 'react';
import { ServiceBookingModalProps } from './types';
import ServiceBookingHoursModal from './ServiceBookingsHoursModal';

type TimeSlot = {
  startTime: string;
  endTime: string;
};

type DateSpecificAvailability = {
  [date: string]: TimeSlot[];
};

function ServiceBookingsModal(props: ServiceBookingModalProps) {
  const { form, showModal, onCloseModal, isEditing } = props;

  const { control, setValue, watch } = form;

  const { serviceStartDate, serviceEndDate, selectedDates } = watch();

  const [showHourModal, setShowHourModal] = useState(false);

  const startNewDate = new Date(serviceStartDate);
  const endNewDate = new Date(serviceEndDate);

  const setDayAvailable = (startDate: Date, endDate: Date) => {
    const dateWithDays = getFullDates(new Date(startDate), new Date(endDate));
    const dateOnly = dateWithDays?.map(({ date }) => date);
    const selectedWeekDays = getWeekdays(dateOnly);
    const notSelectedWeekDays = weekdays.filter(
      (day) => !selectedWeekDays.includes(day),
    );

    selectedWeekDays?.forEach((day) => {
      setValue(`${day}.isAvailable`, true);
    });
    notSelectedWeekDays?.forEach((day) => {
      setValue(`${day}.isAvailable`, false);
    });
  };

  const setDates = (startDate: Date, endDate: Date) => {
    const dateWithDays = getFullDates(new Date(startDate), new Date(endDate));
    const dateOnly = dateWithDays?.map(({ date }) => date);

    setValue('selectedDates', dateOnly, { shouldDirty: true });
  };

  const handleStartDateField = (
    startDate: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { serviceEndDate } = watch() || {};
    if (!serviceEndDate) {
      setValue('serviceEndDate', startDate as unknown as Date, {
        shouldDirty: true,
      });
      setValue('serviceStartDate', startDate as unknown as Date, {
        shouldDirty: true,
      });
    } else {
      setValue('serviceStartDate', startDate as unknown as Date, {
        shouldDirty: true,
      });
    }
    setDayAvailable(new Date(startDate as unknown as string), endNewDate);
    setDates(
      new Date(startDate as unknown as string),
      serviceEndDate ? endNewDate : new Date(startDate as unknown as string),
    );
  };

  const handleEndDateField = (endDate: React.ChangeEvent<HTMLInputElement>) => {
    setValue('serviceEndDate', endDate as unknown as Date, {
      shouldDirty: true,
    });
    setDayAvailable(startNewDate, new Date(endDate as unknown as string));
    setDates(startNewDate, new Date(endDate as unknown as string));
  };

  const onHandleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(value as unknown as string);
    if (newDate < startNewDate) {
      setValue('serviceStartDate', newDate as unknown as Date, {
        shouldDirty: true,
      });
      setDayAvailable(newDate, endNewDate);
      setDates(newDate, endNewDate);
    } else if (newDate > endNewDate) {
      setValue('serviceEndDate', newDate as unknown as Date, {
        shouldDirty: true,
      });
      setDayAvailable(startNewDate, newDate);
      setDates(startNewDate, newDate);
    } else {
      setValue('serviceStartDate', newDate as unknown as Date, {
        shouldDirty: true,
      });
      setDayAvailable(newDate, endNewDate);
      setDates(newDate, endNewDate);
    }
  };

  const { dateSpecificAvailability } = watch() as {
    dateSpecificAvailability: DateSpecificAvailability;
  };

  const dateWithDays = getFullDates(startNewDate, endNewDate);
  const dateOnly = dateWithDays?.map(({ date }) => date);
  const weekDays = getWeekdays(dateOnly);

  const onShowHourModal = () => {
    setShowHourModal(true);
  };

  const onCloseHourModal = () => {
    setShowHourModal(!showHourModal);
  };
  useEffect(() => {
    if (weekDays?.length && !isEditing)
      weekDays?.forEach((day) => {
        setValue(`${day}.isAvailable`, true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekDays?.length, isEditing]);

  const onChangeDayAvailability = (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string,
  ) => {
    const { checked } = event.target;
    if (!checked) {
      const dateWithDays = getFullDates(startNewDate, endNewDate);
      const filteredDateWithDays = dateWithDays
        ?.filter((date) => date.day === day)
        ?.map(({ date }) => date?.toDateString());

      const selectedDateString = selectedDates?.map((date: Date) =>
        date?.toDateString(),
      );

      const commonIndicesOfSelectedDate: Number[] = [];

      filteredDateWithDays.forEach((filterString) => {
        selectedDateString.forEach(
          (selectedString: string, selectedIndex: number) => {
            if (filterString === selectedString) {
              commonIndicesOfSelectedDate.push(selectedIndex);
            }
          },
        );
      });

      const filteredSelectedDate = selectedDates?.filter(
        (date: Date, index: number) =>
          !commonIndicesOfSelectedDate?.includes(index),
      );

      setValue('selectedDates', filteredSelectedDate);
    } else {
      const dateWithDays = getFullDates(startNewDate, endNewDate);
      const filteredDateWithDays = dateWithDays
        ?.filter((date) => date.day === day)
        ?.map(({ date }) => date);
      const dates = [...selectedDates, ...filteredDateWithDays];
      setValue('selectedDates', dates);
    }
  };

  const onApplyChanges = () => {
    const watchedData = watch();

    const weeklyHours = Object.keys(watchedData)
      .filter(
        (day) => day !== 'dateSpecificAvailability' && day !== 'selectedDates',
      ) // Exclude date-specific and selected dates fields
      .reduce(
        (acc, day) => {
          const dayData = watchedData[day];
          if (dayData?.isAvailable) {
            acc[day.toLowerCase()] = {
              startTime: dayData.startTime || '08:00 AM',
              endTime: dayData.endTime || '08:00 PM',
            };
          }
          return acc;
        },
        {} as Record<string, { startTime: string; endTime: string }>,
      );

    setValue('weeklyHours', weeklyHours);
    onCloseModal();
  };

  const filteredWeek = weekdays?.filter((day) => weekDays.includes(day));

  return showHourModal ? (
    <ServiceBookingHoursModal
      form={form}
      onCloseHourModal={onCloseHourModal}
      showHourModal={showHourModal}
    />
  ) : (
    <Modal
      show={showModal}
      onClose={onCloseModal}
      popup
      size="7xl"
      theme={{
        content: {
          inner:
            'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow-3xl dark:bg-gray-900',
        },
        root: {
          show: { on: 'flex bg-white dark:bg-gray-900 !bg-opacity-50' },
        },
      }}
    >
      <ModalBody>
        <div className="pl-0 tab:pl-8 pb-5 w-fit">
          <p className="text-black mb-2 mt-8 text-center dark:text-white font-bold text-2xl !leading-[36px]">
            Set up service booking availability
          </p>
          <p className="text-gray-700 dark:text-gray-50 text-center font-semibold text-[20px] leading-[30px]">
            Select Start date and End date of service
          </p>
        </div>
        <Card className="w-full mb-8">
          <div>
            <p className="text-black dark:text-white font-medium text-[18px] leading-[27px] mb-2">
              Booking details
            </p>
          </div>
          <div className="flex flex-col lg:flex-row max-[1500px]:gap-8 min-[1500px]:gap-36">
            <LabelInput
              name="duration"
              label="Duration of service"
              placeholder="Input text"
              control={control}
              isRequired
            />
            <LabelInput
              name="limitOfBookingsPerDay"
              label="Limit of bookings per day"
              placeholder="Input text"
              control={control}
              isRequired
            />
          </div>
          <div className="flex flex-col lg:flex-row  max-[1500px]:gap-8 min-[1500px]:gap-36">
            <DateRangePicker
              control={control}
              isEditing
              label="Start date"
              allRangeDates={selectedDates}
              name="serviceStartDate"
              onChange={handleStartDateField}
            />
            <DateRangePicker
              control={control}
              isEditing
              label="End date"
              name="serviceEndDate"
              minDate={startNewDate}
              allRangeDates={selectedDates}
              onChange={handleEndDateField}
            />
          </div>
        </Card>
        {serviceStartDate && serviceEndDate ? (
          <>
            <div className="flex gap-8 w-full">
              <div className="w-[50%]">
                <FlowBiteDatePicker
                  showClearButton={false}
                  showTodayButton={false}
                  onChange={onHandleChange}
                  rangeAllDates={selectedDates}
                  name="serviceEndDate"
                  autoHide={false}
                  weekStart={1}
                  inline
                  theme={{
                    popup: {
                      root: {
                        inner:
                          'inline-block rounded-lg bg-white p-4 shadow-xl dark:bg-gray-800 w-full',
                      },
                    },
                    views: {
                      days: { items: { base: 'grid w-full grid-cols-7' } },
                    },
                  }}
                  color="gray"
                />
              </div>
              <Card className="w-[50%] h-max">
                <p className="text-black mb-7 dark:text-white text-sm font-medium">
                  Weekly hours
                </p>
                {filteredWeek?.map((day) => {
                  const isSelected = watch(`${day}.isAvailable`);
                  return (
                    <div className="flex gap-10 items-center" key={day}>
                      <div className="w-[50px]">
                        <Checkbox
                          control={control}
                          name={`${day}.isAvailable`}
                          label={day.substring(0, 3).toUpperCase()}
                          isChecked={isSelected}
                          onChange={(event) =>
                            onChangeDayAvailability(event, day)
                          }
                        />
                      </div>
                      {isSelected ? (
                        <SelectTime form={form} name={day} />
                      ) : (
                        <div className="border border-gray-200 bg-gray-200 text-gray-400 dark:bg-gray-800 p-2 rounded-lg">
                          Unavailable
                        </div>
                      )}
                    </div>
                  );
                })}
              </Card>
            </div>
            <div className="bg-indigo-100 py-10 my-8 px-4 dark:bg-gray-700 rounded-b-lg m-auto">
              <div className="flex gap-10 items-center place-content-center">
                <div className="font-medium text-sm !leading-[21px]">
                  <div className="text-black dark:text-gray-50">
                    Date-specific hours
                  </div>
                  <div className="text-gray-500 dark:text-gray-50">
                    Specify different available dates and times from your
                    regular weekly hours.
                  </div>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={onShowHourModal}
                  className="cursor-pointer border rounded-lg dark:border-gray-100 bg-gray-50 dark:bg-gray-700 px-5 py-2 flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-50"
                >
                  <CirclePlusIcon />
                  Add date-specific hours
                </div>
              </div>

              {dateSpecificAvailability &&
                Object?.entries(dateSpecificAvailability).map(
                  ([date, slots]) => (
                    <div className="flex gap-10 items-center place-content-center my-5 px-8">
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="text-gray-800 dark:text-gray-50">
                            {new Date(date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {slots.map((slot, index) => (
                              <span
                                key={slot.startTime}
                                className="text-gray-600 dark:text-gray-200"
                              >
                                {`${slot.startTime} - ${slot.endTime}${slots.length > 1 && index !== slots.length - 1 ? ' , ' : ''}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
            </div>

            <div className=" flex flex-col tab:!flex-row gap-5 lg:!gap-10 px-5 lg:!px-14">
              <Button color="gray" fullSized outline onClick={onCloseModal}>
                Cancel
              </Button>
              <Button color="gray" fullSized outline onClick={onCloseModal}>
                Preview
              </Button>
              <Button
                gradientDuoTone="purpleToBlue"
                fullSized
                onClick={onApplyChanges}
              >
                Apply
              </Button>
            </div>
          </>
        ) : null}
      </ModalBody>
    </Modal>
  );
}

export default ServiceBookingsModal;
