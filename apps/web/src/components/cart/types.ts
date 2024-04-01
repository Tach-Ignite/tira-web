import { CartItemsEntity } from '@src/services';

export interface OrderDetailsProps {
  totalItems?: number;
  buttonName?: string;
  subTotalPrice?: number;
  className?: string;
  shouldDisableButton?: boolean;
  totalPrice?: number;
  shippingAmount?: number;
  onClick?: () => void;
}

export interface QuantityButtonProps {
  quantity?: number;
  addClick?: () => void;
  isAdmin?: boolean;
  removeClick?: () => void;
}

export interface CartWrapperProps {
  refetchFn?: () => void;
  isAdmin?: boolean;
  data?: CartItemsEntity[];
  titleClassName?: string;
}
