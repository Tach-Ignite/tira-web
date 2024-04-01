/* eslint-disable no-unused-vars */

import { Control } from 'react-hook-form';

export interface SelectOptions {
  value: any;
  label: string;
}

export interface SelectProps {
  control: Control<any>;
  name: string;
  rules?: Object;
  isRequired?: boolean;
  errorMessage?: string;
  value?: string;
  optionTitle?: string;
  className?: string;
  label?: string;
  options: SelectOptions[];
  isBlueTheme?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}
