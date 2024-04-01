/* eslint-disable no-unused-vars */

import { Control } from 'react-hook-form';

export interface ToggleSwitchProps {
  control: Control<any>;
  name: string;
  rules?: Object;
  isRequired?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}
