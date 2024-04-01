import { OrdersEntity } from '@services';
import { UseFormReturn } from 'react-hook-form';

export interface EditOrderProps {
  orderDetails?: OrdersEntity;
  form: UseFormReturn<OrdersEntity>;
  onDeleteNotes?: () => Promise<void>;
  showPaymentErrorStatus?: boolean;
}

export interface SelectOptions {
  value?: string | React.ReactNode;
  label?: string;
}

export interface DetailsCardProps {
  details: SelectOptions[];
  title: string;
  showPaymentErrorStatus?: boolean;
  isSideCard?: boolean;
}
