/* eslint-disable no-unused-vars */

'use client';

import { ProductType } from '@src/types/modules';
import { UseFormReturn } from 'react-hook-form';

export interface DeleteModalProps {
  showModal: boolean;
  onCloseModal?: () => void;
  description: string;
  onHandleConfirm?: () => void;
  buttonNames?: string[];
}

export interface UploadImagesModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  onSaveModal: () => void;
  onHandleDelete: (file: File) => void;
  form: UseFormReturn<ProductType>;
}
export interface ServiceBookingModalProps {
  form: UseFormReturn;
  showModal?: boolean;
  onCloseModal: () => void;
  isEditing?: Boolean;
}

export interface FormattedDate {
  date: string;
  day: string;
}

export interface ServiceBookingHourModalProps {
  form: UseFormReturn;
  showHourModal?: boolean;
  onCloseHourModal: () => void;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface DateSpecificAvailability {
  [key: string]: TimeSlot[];
}
