import { UseFormReturn } from 'react-hook-form';

export interface ServiceDetailsGridProps {
  serviceForm: UseFormReturn<any>; // any will be fixed once API is done
  isEditing?: boolean;
}
