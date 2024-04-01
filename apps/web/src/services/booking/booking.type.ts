/* eslint-disable no-unused-vars */
import { ProductEntity } from '@services/products/products.type';

import { ApiResponse } from '@src/types/modules/apiResponseType';
import { UserEntity } from '@src/services/users/users.type';

export enum BookingPaymentOptionEnum {
  Card = 'Card',
  Paypal = 'paypal',
  Bank = 'bank',
}

export enum BookingStatusEnum {
  Pending = 'Pending',
  Cancelled = 'Cancelled',
  Confirmed = 'Confirmed',
}

export interface BookingItemsType {
  orderItemId: string;
  bookingId: string;
  productId: string;
  product: ProductEntity;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingPaymentStatusEnum {
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Pending = 'Pending',
  Refunded = 'Refunded',
  Cancelled = 'Cancelled',
}

export interface BookingPaymentType {
  paymentId: string;
  paymentSessionId: string;
  bookingId: string | null;
  amount: number;
  transactionId: string | null;
  transactionDetails: string | null;
  status: BookingPaymentStatusEnum;
  bookingsBookingId: string;
}

export interface ServiceEntity {
  serviceId: string;
  companyName: string;
  friendlyId: string;
  serviceName: string;
  description: string;
  imageUrls: string[];
  price: number;
  msrp: number;
  saleStartDate: string;
  saleEndDate: string;
  duration: number;
  limitOfBookingsPerDay: number;
  weeklyHours: {
    [day: string]: {
      startTime: string;
      endTime: string;
    };
  };
  additionalDetails: string;
  adminNotes: string;
  dateSpecificAvailability: {
    [date: string]: {
      startTime: string;
      endTime: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
}
export interface BookingsEntity {
  bookingId: string;
  userId: string;
  serviceId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactCity: string;
  contactState: string;
  contactZipCode: string;
  bookingNotes: string;
  adminNotes: string | null;
  status: BookingStatusEnum;
  paymentStatus: BookingPaymentStatusEnum;
  createdAt: string;
  updatedAt: string;
  service: ServiceEntity;
  user: UserEntity;
  payments: BookingPaymentType[];
}

export type BookingResponseType = ApiResponse<BookingsEntity>;

export interface GetAllBookingsArgs {
  page: number;
  perPage: number;
  searchTerm: string;
}

export interface UpdateBookingArgs {
  bookingId: string;
  adminNotes?: string;
  status?: BookingStatusEnum;
}
