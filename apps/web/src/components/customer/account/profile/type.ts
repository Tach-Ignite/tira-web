import { UserProfileType } from '@services';
import { UseFormReturn } from 'react-hook-form';

export interface CustomerProfileForm {
  form: UseFormReturn<UserProfileType>;
}
