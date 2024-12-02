/* eslint-disable no-unused-vars */

import { Control } from 'react-hook-form';

export interface SelectOptions {
  value: any;
  label: string;
}

export interface SelectProps {
  control: Control<any>;
  isArrayInput?: boolean;
  name: string;
  rules?: Object;
  isRequired?: boolean;
  selectClassName?: string;
  errorMessage?: string;
  value?: string;
  optionTitle?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
  options: SelectOptions[];
  isBlueTheme?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}
