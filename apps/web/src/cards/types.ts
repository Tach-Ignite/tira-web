import { CartItemsEntity, ProductEntity, ServicesEntity } from '@services';

export interface CartCardProps {
  data: CartItemsEntity;
  refetchFn?: () => void;
  isAdmin?: boolean;
}

export interface DashboardInfoCardProps {
  cardName: string;
  count: number;
  isRedGraph?: boolean;
}

export interface ProductCardProps extends ProductEntity {
  withFavoriteIcon?: boolean;
}

export interface DashboardOrderInfoCardProps {
  cardName: 'Shipped' | 'Open' | 'Cancelled';
  count: number;
}

export interface ImageUploadCardType {
  fileName: string;
  fileUrl?: string;
  file?: File;
  isMaximumSizeFile?: boolean;
  className?: string;
  onHandleDelete?: () => void;
}

export interface Category {
  categoryId: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ItemsCardProps {
  id: string;
  type?: 'product' | 'service';
  title?: string;
  description?: string;
  imageUrl?: string;
  label?: string;
  price?: number;
  isFavorite?: boolean;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick: (event: any) => void;
  withFavoriteIcon?: boolean;
  categories?: Category[] | undefined;
  duration?: number;
}

export interface ServicesCardPrpos {
  data: ServicesEntity;
}
