/* eslint-disable no-unused-vars */
import { ProductEntity } from '@services/products/products.type';
import { ApiResponse } from '@src/types/modules/apiResponseType';

export enum PaymentOptionEnum {
  Card = 'Card',
  Paypal = 'paypal',
  Bank = 'bank',
}

export enum ShippingTypeEnum {
  Standard = 'Standard',
  OverNight = 'OverNight',
}
export enum OrderStatusEnum {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  InTransit = 'InTransit',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Confirmed = 'Confirmed',
}

export interface OrderItemsType {
  orderItemId: string;
  orderId: string;
  productId: string;
  product: ProductEntity;
  price: Number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentStatusEnum {
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Pending = 'Pending',
  Refunded = 'Refunded',
  Cancelled = 'Cancelled',
}

export interface PaymentType {
  paymentId: string;
  paymentSessionId: string;
  orderId: string;
  amount: number;
  transactionId: string;
  transactionDetails: string;
  status: PaymentStatusEnum;
}

export interface OrdersAddressType {
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  address?: string;
}

export interface OrdersEntity extends OrdersAddressType {
  orderId?: string;
  orderItems?: OrderItemsType[];
  isSameAsShippingInformation?: boolean;
  orderStatus?: OrderStatusEnum;
  payments?: PaymentType[];
  paymentOptions?: PaymentOptionEnum;
  cardNumber?: string;
  cardName?: string;
  securityCode?: string;
  total?: number;
  shippingNotes?: string;
  phone: string;
  email: string;
  shippingType: ShippingTypeEnum;
  createdAt?: Date;
  updatedAt?: Date;
  billingAddress?: OrdersAddressType;
  products: { productId: string; quantity: Number }[];
}

export type OrderResponseType = ApiResponse<OrdersEntity>;

export interface GetAllOrdersArgs {
  page: number;
  perPage: number;
  searchTerm: string;
}

export interface UpdateOrderArgs {
  orderId: string;
  shippingNotes?: string;
  orderStatus?: OrderStatusEnum;
}
