import {
  BookingsEntity,
  BookingService,
  GetAllBookingsArgs,
  BookingResponseType,
  UpdateBookingArgs,
} from '@services';
import { Pagination } from '@src/types/modules/pagination';
import { ApiResponse } from '@src/types/modules/apiResponseType';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';

export const useGetAllBookings = (request: GetAllBookingsArgs) => {
  const keys = [ApiKeysEnum.GetAllBookings, request.page, request];
  const fetchFn = async () => {
    const data = await BookingService.getAllBookings(request);
    return data;
  };
  return useBaseQuery<ApiResponse<Pagination<BookingsEntity>>>(keys, fetchFn);
};

export const useGetAllBookingsAdmin = (request: GetAllBookingsArgs) => {
  const keys = [ApiKeysEnum.GetAllBookings, request.page, request];
  const fetchFn = async () => {
    const data = await BookingService.getAllBookingsAdmin(request);
    return data;
  };
  return useBaseQuery<ApiResponse<Pagination<BookingsEntity>>>(keys, fetchFn);
};

export const useGetSingleBooking = (bookingId: string) => {
  const keys = [ApiKeysEnum.GetSingleBooking, bookingId];
  const fetchFn = async () => {
    const data = await BookingService.getSingleBooking(bookingId);
    return data;
  };
  return useBaseQuery<BookingResponseType>(keys, fetchFn);
};

export const useGetSingleBookingAdmin = (bookingId: string) => {
  const keys = [ApiKeysEnum.GetSingleBooking, bookingId];
  const fetchFn = async () => {
    const data = await BookingService.getSingleBookingAdmin(bookingId);
    return data;
  };
  return useBaseQuery<BookingResponseType>(keys, fetchFn);
};

export const useUpdateBooking = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UpdateBookingArgs) => {
    const mutation = await BookingService.updateBooking(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleBooking],
  });
};

export const useCancelBooking = (request: UseBaseMutationConfig) => {
  const mutationFn = async (bookingId: string) => {
    const mutation = await BookingService.cancelBooking(bookingId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleBooking],
  });
};
