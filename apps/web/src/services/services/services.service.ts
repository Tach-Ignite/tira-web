/* eslint-disable import/no-cycle */

'use server';

import { post, patch, remove, get } from '@services/fetch';
import BookingServiceType from '@src/app/services/types';
import { GetAllServicesArgs, ServicesEntity } from './services.type';

export const getAllServices = async ({
  page,
  perPage,
  searchTerm,
  categoryIds,
  maxPrice,
  minPrice,
  sortField,
  sortOrder,
}: GetAllServicesArgs) => {
  let query = `services?page=${page}`;
  if (perPage) {
    query += `&perPage=${perPage}`;
  }
  if (searchTerm) {
    query += `&searchTerm=${searchTerm}`;
  }
  if (categoryIds) {
    query += `&categoryIds=${categoryIds}`;
  }
  if (maxPrice) {
    query += `&maxPrice=${maxPrice}`;
  }
  if (minPrice) {
    query += `&minPrice=${minPrice}`;
  }
  if (sortField) {
    query += `&sortField=${sortField}`;
  }
  if (sortOrder) {
    query += `&sortOrder=${sortOrder}`;
  }
  return get(query);
};

export const getService = (serviceId: string) => get(`services/${serviceId}`);

export const getServiceSlots = (serviceId: string, date: Date | string) =>
  get(`services/slots?serviceId=${serviceId}&date=${date}`);

export const createServices = async (data: ServicesEntity) =>
  post('services', {
    ...data,
  });

export const updateServices = async (data: ServicesEntity) =>
  patch(`services/${data?.serviceId}`, data);

export const deleteService = async (serviceId?: string) =>
  remove(`services/${serviceId}`);

export const createBookingServices = async (data: BookingServiceType) =>
  post('booking-payments/', {
    ...data,
  });
