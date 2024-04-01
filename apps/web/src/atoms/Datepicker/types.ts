/* eslint-disable no-unused-vars */

import { Control } from 'react-hook-form';

export interface DatePickerProps {
  control: Control<any>;
  isRequired?: boolean;
  name: string;
  label?: string;
  rules?: Object;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  isEditing?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
