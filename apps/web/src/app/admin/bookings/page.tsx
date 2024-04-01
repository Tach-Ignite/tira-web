'use client';

import { useGetAllBookingsAdmin } from '@queries/useBookingQuery';
import { BookingsListPage } from '@src/app/common/bookings';
import { useSearchParams } from 'next/navigation';
import React from 'react';

function AdminBookingsListPage() {
  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchTermInQuery = params.get('search') || '';

  const { data: bookings } = useGetAllBookingsAdmin({
    page: Number(pageInQuery),
    searchTerm: searchTermInQuery,
    perPage: 25,
  });

  return <BookingsListPage bookings={bookings} />;
}

export default AdminBookingsListPage;
