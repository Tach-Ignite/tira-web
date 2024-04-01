/* eslint-disable no-unused-vars */
import { OrdersEntity } from '@services';
import { UseFormReturn } from 'react-hook-form';

export interface OrdersForm {
  amount?: string;
  ordersForm: UseFormReturn<OrdersEntity>;
}

export interface ContactFieldsProps extends OrdersForm {
  isBillingAddress?: boolean;
  addApartmentField?: boolean;
  setAddApartmentField?: (addApartmentField: boolean) => void;
}

export enum OrderSteps {
  ShoppingCart,
  DeliveryInformation,
  ContactInformation,
  PaymentOptionEnum,
}

export interface OrderPlacedProps {
  isFailed?: boolean;
}

export const deliveryInformationFields = [
  'firstName',
  'lastName',
  'address',
  'city',
  'state',
  'zipCode',
  'shippingType',
];

export const contactInformationFields = ['email', 'phone'];

export const steps = [
  'Shopping Cart',
  'Delivery Information',
  'Contact Information',
];
