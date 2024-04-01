'use client';

import { useGetAllBookings } from '@queries/useBookingQuery';
import { BookingsListPage } from '@src/app/common/bookings';
import { useSearchParams } from 'next/navigation';

import React from 'react';

function CustomerBookingsListPage() {
  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchTermInQuery = params.get('search') || '';

  const { data: bookings } = useGetAllBookings({
    page: Number(pageInQuery),
    searchTerm: searchTermInQuery,
    perPage: 25,
  });

  return <BookingsListPage isCustomer bookings={bookings} />;
}

export default CustomerBookingsListPage;
