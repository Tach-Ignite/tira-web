/* eslint-disable no-unused-vars */
import { UseFormReturn } from 'react-hook-form';
import { ProductType } from '../../types/modules';

export interface ProductPageProps {
  form: UseFormReturn<ProductType>;
  isEditing?: boolean;
  onSuccessCallback: (res: ProductType) => void;
  onDiscard: () => void;
}

export enum PageView {
  Admin = 'admin',
  Customer = 'customer',
}

export type ViewProductProps = {
  pageView?: PageView;
};

export interface ProductFavoriteProps {
  productId: string;
  isFavorite?: boolean;
  page?: 'product-list' | 'product-view' | 'cart';
}
