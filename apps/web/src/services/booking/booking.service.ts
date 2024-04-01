'use server';

import { post, get, patch } from '@services/fetch';
import {
  BookingsEntity,
  GetAllBookingsArgs,
  BookingResponseType,
  UpdateBookingArgs,
} from './booking.type';

export const createBooking = async (data: BookingsEntity) =>
  post('checkout-payments', {
    ...data,
  });

export const getAllBookings = async ({
  page,
  perPage,
  searchTerm,
}: GetAllBookingsArgs) =>
  get(`bookings/user?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`);

export const getAllBookingsAdmin = async ({
  page,
  perPage,
  searchTerm,
}: GetAllBookingsArgs) =>
  get(`bookings/?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`);

export const getSingleBooking = async (
  bookingId: string,
): Promise<BookingResponseType> => get(`bookings/${bookingId}/user`);

export const getSingleBookingAdmin = async (
  bookingId: string,
): Promise<BookingResponseType> => get(`bookings/${bookingId}`);

export const updateBooking = async ({
  bookingId,
  status,
  adminNotes,
}: UpdateBookingArgs): Promise<BookingResponseType> =>
  patch(`bookings/${bookingId}`, { status, adminNotes });

export const cancelBooking = async (
  bookingId: string,
): Promise<BookingResponseType> =>
  patch(`bookings/${bookingId}/cancel`, { bookingId });
