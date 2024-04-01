/* eslint-disable no-unused-vars */

'use client';

import { createContext, useContext } from 'react';
import type { FlowbiteDatepickerTheme } from './Datepicker';
import type { Views, WeekStart } from './helpers';

type DatepickerContextProps = {
  theme: FlowbiteDatepickerTheme;
  language: string;
  weekStart: WeekStart;
  minDate?: Date;
  inline?: boolean;
  maxDate?: Date;
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  view: Views;
  rangeAllDates?: Date[];
  setView: (value: Views) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  changeSelectedDate: (date: Date, useAutohide: boolean) => void;
  viewDate: Date;
  isStableDateRange?: boolean;
  setViewDate: (date: Date) => void;
};

export const DatepickerContext = createContext<
  DatepickerContextProps | undefined
>(undefined);

export function useDatePickerContext(): DatepickerContextProps {
  const context = useContext(DatepickerContext);

  if (!context) {
    throw new Error(
      'useDatePickerContext should be used within the DatePickerContext provider!',
    );
  }

  return context;
}
