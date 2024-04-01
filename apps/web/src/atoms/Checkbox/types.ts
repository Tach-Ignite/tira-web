/* eslint-disable no-unused-vars */

'use client';

import { Control } from 'react-hook-form';

export interface CheckboxProps {
  control: Control<any>;
  name: string;
  className?: string;
  rules?: Object;
  isRequired?: boolean;
  requiredMessage?: string;
  label?: string | React.ReactNode;
  value?: string;
  disabled?: boolean;
  isGrayTheme?: boolean;
  isChecked?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
