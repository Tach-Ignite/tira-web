'use client';

import { EditBookingPage } from '@components/admin/booking';
import { useGetSingleBooking } from '@queries/useBookingQuery';
import { useParams } from 'next/navigation';

import React from 'react';

function CustomerViewBookingPage() {
  const { bookingId: paramBookingId } = useParams() || {};

  const { data: { data: bookingDetails } = {} } = useGetSingleBooking(
    paramBookingId as string,
  );

  return (
    <EditBookingPage
      isCustomer
      paramBookingId={paramBookingId}
      bookingDetails={bookingDetails}
    />
  );
}

export default CustomerViewBookingPage;
