'use client';

import {
  Datepicker as FlowBiteDatePicker,
  Modal,
  ModalBody,
  Card,
} from '@src/flowbite';
import { Button } from '@src/atoms';
import { useState } from 'react';
import SelectHourTime from '@components/admin/services/SelectHourTime';
import {
  DateSpecificAvailability,
  ServiceBookingHourModalProps,
  TimeSlot,
} from './types';

function ServiceBookingHoursModal(props: ServiceBookingHourModalProps) {
  const { form, showHourModal, onCloseHourModal } = props;

  const { setValue, watch } = form;

  const { saleStartDate, saleEndDate } = watch();

  const [selectedDatesList, setSelectedDatesList] = useState<Date[]>([]);

  const [currentSelectedDateByUser, setCurrentSelectedDateByUser] =
    useState<string>();

  const [dateSpecificAvailability, setDateSpecificAvailability] =
    useState<DateSpecificAvailability>({});

  const utcDateConvertor = (year: number, month: number, date: number) => {
    const utcDate = new Date(Date.UTC(year, month, date));
    const convertedDate = utcDate.toISOString().split('T')[0];
    return convertedDate;
  };

  const onSelectedDates = (newSelectedDate: Date) => {
    const year = newSelectedDate.getFullYear();
    const month = newSelectedDate.getMonth();
    const date = newSelectedDate.getDate();

    const isoDateString = utcDateConvertor(year, month, date);

    setCurrentSelectedDateByUser(isoDateString);

    if (Object.keys(dateSpecificAvailability).length > 0) {
      setDateSpecificAvailability((prevState) => ({
        ...prevState,
        [`${isoDateString}`]: [{ startTime: '08:00 AM', endTime: '08:00 PM' }],
      }));
    } else {
      setDateSpecificAvailability(dateSpecificAvailability);
    }

    setSelectedDatesList((prevDates) => [...prevDates, newSelectedDate]);
  };

  const handleDateChange = (event: {}) => {
    const date = event as Date;
    onSelectedDates(date);
  };

  const onChangedDateSpecific = () => {
    setValue('dateSpecificAvailability', dateSpecificAvailability);
    onCloseHourModal();
  };

  return (
    <Modal
      show={showHourModal}
      onClose={onCloseHourModal}
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
            Set up date-specific hours
          </p>
          <p className="text-gray-700 dark:text-gray-50 text-center font-semibold text-[20px] leading-[30px]">
            Select the date(s) you want to assign specific hours
          </p>
        </div>

        <>
          <div className="flex gap-8 w-full">
            <div className="w-[50%]">
              <FlowBiteDatePicker
                showClearButton={false}
                showTodayButton={false}
                onChange={(e) => {
                  handleDateChange(e);
                }}
                multiple
                name="serviceEndDate"
                autoHide={false}
                weekStart={1}
                minDate={saleStartDate ? new Date(saleStartDate) : undefined}
                maxDate={saleEndDate ? new Date(saleEndDate) : undefined}
                rangeAllDates={selectedDatesList}
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
                What hours are you available?
              </p>

              {selectedDatesList
                ?.filter(
                  (obj) =>
                    utcDateConvertor(
                      obj.getFullYear(),
                      obj.getMonth(),
                      obj.getDate(),
                    ) === currentSelectedDateByUser,
                )
                ?.map((date) => {
                  const dateString = utcDateConvertor(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                  );

                  const existingTimeSlots =
                    dateSpecificAvailability[dateString] || [];
                  const timeSlots =
                    existingTimeSlots.length > 0
                      ? existingTimeSlots
                      : [{ startTime: '08:00 AM', endTime: '08:00 PM' }];

                  return (
                    <div className="flex flex-col gap-5 items-center">
                      <SelectHourTime
                        key={dateString}
                        form={form}
                        name={dateString}
                        date={date}
                        timeSlots={timeSlots}
                        onUpdate={(newTimeSlots: TimeSlot[]) => {
                          setDateSpecificAvailability((prev) => ({
                            ...prev,
                            [dateString]: newTimeSlots,
                          }));
                        }}
                      />
                    </div>
                  );
                })}
            </Card>
          </div>

          <div className="my-8 flex flex-col tab:!flex-row gap-5 lg:!gap-10 px-5 lg:!px-14">
            <Button color="gray" fullSized outline onClick={onCloseHourModal}>
              Cancel
            </Button>
            <Button color="gray" fullSized outline onClick={onCloseHourModal}>
              Preview
            </Button>
            <Button
              gradientDuoTone="purpleToBlue"
              fullSized
              onClick={onChangedDateSpecific}
            >
              Apply
            </Button>
          </div>
        </>
      </ModalBody>
    </Modal>
  );
}

export default ServiceBookingHoursModal;
