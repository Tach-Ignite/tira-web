/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import type { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '../DatepickerContext';
import {
  isDateEqual,
  isDateInRange,
  mergeDeep,
  startOfYearPeriod,
  Views,
} from '../helpers';

export interface FlowbiteDatepickerViewsYearsTheme {
  items: {
    base: string;
    item: {
      base: string;
      disabled: string;
      selected: string;
    };
  };
}

export interface DatepickerViewsYearsProps {
  theme?: FlowbiteDatepickerViewsYearsTheme;
}

export const DatepickerViewsYears: FC<DatepickerViewsYearsProps> = ({
  theme: customTheme = {},
}) => {
  const {
    theme: rootTheme,
    selectedDate,
    minDate,
    maxDate,
    viewDate,
    setViewDate,
    setView,
  } = useDatePickerContext();

  const theme = mergeDeep(rootTheme.views.years, customTheme);

  return (
    <div className={theme.items.base}>
      {[...Array(12)].map((_year, index) => {
        const first = startOfYearPeriod(viewDate, 10);
        const year = first - 1 + index * 1;
        const newDate = new Date(viewDate.getTime());
        newDate.setFullYear(year);

        const isSelected = isDateEqual(selectedDate, newDate);
        const isDisabled = !isDateInRange(newDate, minDate, maxDate);

        return (
          <button
            disabled={isDisabled}
            key={index}
            type="button"
            className={twMerge(
              theme.items.item.base,
              isSelected && theme.items.item.selected,
              isDisabled && theme.items.item.disabled,
            )}
            onClick={() => {
              if (isDisabled) return;

              setViewDate(newDate);
              setView(Views.Months);
            }}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};
