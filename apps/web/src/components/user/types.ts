import { UserType } from '@services';
import { UseFormReturn } from 'react-hook-form';

export interface EditUserFormProps {
  form: UseFormReturn<UserType>;
  onDiscard?: () => void;
}
