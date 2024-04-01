/* eslint-disable no-unused-vars */

import { Control } from 'react-hook-form';

export interface RadioProps {
  control: Control<any>;
  name: string;
  rules?: Object;
  isRequired?: boolean;
  label?: string;
  value?: string;
  disabled?: boolean;
  isChecked?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}
