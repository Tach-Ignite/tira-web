'use client';

import { EditBookingPage } from '@components/admin/booking';
import { useGetSingleBookingAdmin } from '@queries/useBookingQuery';
import { useParams } from 'next/navigation';
import React from 'react';

function AdminEditBookingsPage() {
  const { bookingId: paramBookingId } = useParams() || {};

  const { data: { data: bookingDetails } = {} } = useGetSingleBookingAdmin(
    paramBookingId as string,
  );

  return (
    <EditBookingPage
      paramBookingId={paramBookingId}
      bookingDetails={bookingDetails}
    />
  );
}

export default AdminEditBookingsPage;
