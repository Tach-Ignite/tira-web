'use server';

import { post, get, patch } from '@services/fetch';
import {
  OrdersEntity,
  GetAllOrdersArgs,
  OrderResponseType,
  UpdateOrderArgs,
} from './order.type';

export const createOrders = async (data: OrdersEntity) =>
  post('checkout-payments', {
    ...data,
  });

export const getAllOrders = async ({
  page,
  perPage,
  searchTerm,
}: GetAllOrdersArgs) =>
  get(`orders?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`);

export const getSingleOrder = async (
  orderId: string,
): Promise<OrderResponseType> => get(`orders/${orderId}`);

export const updateOrder = async ({
  orderId,
  orderStatus,
  shippingNotes,
}: UpdateOrderArgs): Promise<OrderResponseType> =>
  patch(`orders/${orderId}`, { orderStatus, shippingNotes });

export const cancelOrder = async (
  orderId: string,
): Promise<OrderResponseType> => patch(`orders/${orderId}/cancel`, { orderId });
