import { ProductEntity } from '@services/products/products.type';

export interface AddProductRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartRequest extends AddProductRequest {}

export interface RemoveFromCartRequest {
  productId: string;
}

export interface CartItemsEntity {
  id?: string;
  quantity: number;
  productId: string;
  cartId?: string;
  product: ProductEntity;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartEntity {
  id: string;
  cartItems?: CartItemsEntity[];
  createdAt: Date;
  updatedAt: Date;
}
