import { UseFormReturn } from 'react-hook-form';
import { ProductType } from '../../../types/modules';

export interface ProductFieldProps {
  productForm: UseFormReturn<ProductType>;
  isEditing?: boolean;
}

export interface ProductDescriptionProps extends ProductFieldProps {
  name: string;
  writtenCharacter: number;
  label: string;
}

export interface CategorySelectProps {
  form: UseFormReturn<any>;
  isCustomer?: boolean;
}
