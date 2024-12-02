/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */

import { ServicesEntity } from '@services';
import { UseFormReturn } from 'react-hook-form';

export default interface BookingServiceType {
  serviceId?: string;
  bookingDate: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  duration: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactCity: string;
  contactState: string;
  contactZipCode: string;
  bookingNotes: string;
  isSameAsPersonal?: string;
}

export interface BookTimeProps {
  handleDateChange?: (date: any) => void;
  slots?: [];
  form: UseFormReturn<any>;
  serviceDetails?: ServicesEntity;
  bookingResponse?: any;
  selectedDate?: string | Date;
}

export interface slot {
  time: string;
  isAvailable: boolean;
}
