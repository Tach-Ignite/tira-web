/* eslint-disable no-unused-vars */
import { UseFormReturn } from 'react-hook-form';

export interface ServiceFormProps {
  form: UseFormReturn<any>;
  isEditing?: boolean;
  onSuccessCallback: (res: any) => void;
  onDiscard: () => void;
}

export interface ServiceBookingAvailabilityProps {
  form: UseFormReturn<any>;
}

export interface SelectTimeProps {
  form: UseFormReturn<any>;
  name: string;
}

export interface SelectTimeHourProps {
  form: UseFormReturn<any>;
  name: string;
  date: Date | string;
  timeSlots: any;
  onUpdate: any;
}

export interface FormattedHours {
  isAvailable: boolean;
  From?: string;
  To?: string;
}

export type TimeSlot = {
  startTime: string;
  endTime: string;
};
