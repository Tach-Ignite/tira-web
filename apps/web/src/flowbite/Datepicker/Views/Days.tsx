/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unsafe-optional-chaining */
import type { FC } from 'react';
import { DeepPartial } from 'flowbite-react/dist/types/types';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '../DatepickerContext';
import {
  addDays,
  getFirstDayOfTheMonth,
  getFormattedDate,
  getWeekDays,
  isDateEqual,
  isDateInRange,
  mergeDeep,
} from '../helpers';

export interface FlowbiteDatepickerViewsDaysTheme {
  header: {
    base: string;
    title: string;
  };
  items: {
    base: string;
    item: {
      base: string;
      selected: string;
      disabled: string;
    };
  };
}

export interface DatepickerViewsDaysProps {
  theme?: DeepPartial<FlowbiteDatepickerViewsDaysTheme>;
}

export const DatepickerViewsDays: FC<DatepickerViewsDaysProps> = ({
  theme: customTheme = {},
}) => {
  const {
    theme: rootTheme,
    weekStart,
    minDate,
    maxDate,
    viewDate,
    selectedDate,
    inline,
    changeSelectedDate,
    language,
    rangeAllDates,
    isStableDateRange,
  } = useDatePickerContext();
  const rangeStartDate = rangeAllDates?.length && new Date(rangeAllDates[0]);
  const rangeEndDate =
    rangeAllDates?.length &&
    new Date(rangeAllDates?.[rangeAllDates?.length - 1]);

  const startDateString = rangeStartDate && rangeStartDate?.toDateString();
  const endDateString = rangeEndDate && rangeEndDate?.toDateString();

  const inBetweenDays = rangeAllDates?.filter(
    (date) =>
      date.toDateString() !== startDateString &&
      date.toDateString() !== endDateString,
  );
  const inBetweenStringDates =
    inBetweenDays?.map((date) => date?.toDateString()) || [];
  const isDateRange = rangeStartDate && rangeEndDate;

  const theme = mergeDeep(rootTheme.views.days, customTheme);

  const weekDays = getWeekDays(language, weekStart);

  const startDate = getFirstDayOfTheMonth(viewDate, weekStart);

  return (
    <>
      <div className={theme.header.base}>
        {weekDays.map((day, index) => (
          <span key={index} className={theme.header.title}>
            {day}
          </span>
        ))}
      </div>
      <div className={theme.items.base}>
        {[...Array(42)].map((_date, index) => {
          const currentDate = addDays(startDate, index);
          const day = getFormattedDate(language, currentDate, {
            day: 'numeric',
          });

          const isSelected = isDateEqual(selectedDate, currentDate);
          const isDisabled = !isDateInRange(currentDate, minDate, maxDate);

          const isInBetween = inBetweenStringDates?.includes(
            new Date(currentDate)?.toDateString(),
          );
          const isFirstRangeDate =
            rangeStartDate &&
            new Date(rangeStartDate)?.toDateString() ===
              currentDate?.toDateString();

          const isLastRangeDate =
            rangeEndDate &&
            new Date(rangeEndDate)?.toDateString() ===
              currentDate?.toDateString();

          const isSame =
            isDateRange &&
            new Date(rangeEndDate)?.toDateString() ===
              new Date(rangeStartDate)?.toDateString();

          const isSameDate =
            isSame &&
            currentDate?.toDateString() ===
              new Date(rangeEndDate)?.toDateString();

          return (
            <button
              disabled={isDisabled}
              key={index}
              type="button"
              className={twMerge(
                theme.items.item.base,
                isSelected && theme.items.item.selected,
                isDisabled && theme.items.item.disabled,
                isDateRange &&
                  isInBetween &&
                  `rounded-none !bg-indigo-200 hover:bg-indigo-200 dark:!bg-gray-900 dark:hover:bg-gray-900 ${inline ? '!border !border-[#D5D4DF]' : 'border-none'}`,
                isDateRange &&
                  isFirstRangeDate &&
                  `rounded-none rounded-l-lg !bg-indigo-600 hover:bg-indigo-600 dark:!bg-gray-900 dark:hover:bg-gray-900 ${inline ? '!border !border-[#D5D4DF]' : 'border-none'}`,
                isDateRange &&
                  isLastRangeDate &&
                  `rounded-none rounded-r-lg !bg-indigo-600 dark:!bg-gray-900 ${inline ? '!border !border-[#D5D4DF]' : 'border-none'}`,
                isDateRange &&
                  rangeStartDate?.toDateString() ===
                    currentDate?.toDateString() &&
                  `rounded-none rounded-l-lg bg-indigo-600 text-white hover:bg-indigo-600 dark:!bg-gray-900 dark:hover:bg-gray-900 ${inline ? '!border !border-[#D5D4DF]' : 'border-none'}`,
                isDateRange &&
                  rangeEndDate?.toDateString() ===
                    currentDate?.toDateString() &&
                  `rounded-none rounded-r-lg bg-indigo-600 text-white hover:!bg-indigo-600 dark:!bg-gray-900 dark:hover:bg-gray-900 ${inline ? '!border !border-[#D5D4DF]' : 'border-none'}`,
                isSameDate &&
                  `!rounded-none bg-indigo-600 text-white hover:bg-indigo-600 dark:!bg-gray-900 dark:hover:!bg-gray-900 ${inline ? '!border !border-[#D5D4DF]' : 'border-none'}`,
                inline &&
                  isDateRange &&
                  'rounded-none !border !border-[#D5D4DF]',
                isStableDateRange && isFirstRangeDate && '!bg-indigo-200',
                isStableDateRange && isLastRangeDate && '!bg-indigo-200',
                isStableDateRange &&
                  'text-black hover:!bg-indigo-600 hover:!text-white',

                isSelected && isStableDateRange && '!bg-indigo-600 text-white',
                !isLastRangeDate &&
                  !isFirstRangeDate &&
                  isStableDateRange &&
                  !isInBetween &&
                  'cursor-not-allowed hover:!bg-white hover:!text-gray-500 text-gray-500',
                isStableDateRange &&
                  isDisabled &&
                  'cursor-not-allowed hover:!bg-white hover:!text-gray-500 text-gray-500',
              )}
              onClick={() => {
                if (isDisabled) return;

                changeSelectedDate(currentDate, true);
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
};
