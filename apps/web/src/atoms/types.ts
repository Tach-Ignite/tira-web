/* eslint-disable no-unused-vars */

import { ListsType, TimeLineItemsType } from '@services/common.type';
import { RefObject } from 'react';
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormReturn,
} from 'react-hook-form';

export interface SwiperCompsProps {
  children: React.ReactNode;
  settings: any;
  sliderCName?: string;
}

export interface AccordionProps {
  lists: ListsType[];
}

export interface TimelineProps {
  timelineItems: TimeLineItemsType[];
  inView: boolean;
}

export interface GetErrorMessageProps {
  errorInputName?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  label?: string;
  requiredMessage?: string;
  errorMessage?: string;
}

export interface InputProps {
  control: Control<any>;
  isRequired?: boolean;
  name: string;
  label?: string;
  helperText?: string;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  rules?: Object;
  disabled?: boolean;
  textareaRef?: RefObject<HTMLTextAreaElement>;
  maxLength?: number;
  placeholder?: string;
  rows?: number;
  errorMessage?: string;
  requiredMessage?: string;
  onChange?: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  isGrayTheme?: boolean;
  isArrayInput?: boolean;
}

export interface ErrorLabelProps {
  message?: string;
}

export interface CheckboxProps {
  control: Control<any>;
  name: string;
  className?: string;
  errorMessage?: string;
  rules?: Object;
  requiredMessage?: string;
  isRequired?: boolean;
  label?: string;
  value?: string;
  disabled?: boolean;
  isGrayTheme?: boolean;
  isChecked?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordEndAdornmentProps {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  isGrayTheme?: boolean;
}

export interface FloatingPasswordInputProps extends PasswordEndAdornmentProps {
  name: string;
  label: string;
  rules?: Object;
  control: Control<any>;
  isRequired?: boolean;
  errorMessage?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export interface SelectOptions {
  value: any;
  label: string;
}

export interface SelectProps {
  control: Control<any>;
  name: string;
  rules?: Object;
  disabled?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  value?: string;
  optionTitle?: string;
  className?: string;
  errorLabel?: string;
  label?: string;
  options: SelectOptions[];
  isBlueTheme?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface RadioProps {
  control: Control<any>;
  name: string;
  rules?: Object;
  label?: string;
  isRequired?: boolean;
  options: SelectOptions[];
  value?: string;
  disabled?: boolean;
  errorLabel?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ImageUploadProps {
  form: UseFormReturn<any>;
  label?: string;
  buttonLabel?: string;
  isButtonOnly?: boolean;
  name: string;
  errorMessage?: string;
  acceptedFiles?: string;
  isRequired?: boolean;
  formFileName: string;
  isView?: boolean;
  disabled?: boolean;
}
