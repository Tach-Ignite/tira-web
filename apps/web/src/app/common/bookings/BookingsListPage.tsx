/* eslint-disable react/require-default-props */

'use client';

import { Table } from '@src/atoms';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

import { addQueryParam } from '@src/lib/functions';
import { SearchInput } from '@src/atoms/Input';
import getBookingsListColumns from './getBookingsListColumns';

function BookingsListPage(props: any) {
  const { isCustomer, bookings } = props;

  const router = useRouter();

  const { data } = bookings || {};
  const { data: allbookings, meta } = data || {};

  const { currentPage = 1 } = meta || {};

  const onEditButton = useCallback(
    (bookingId: string) => {
      router.push(`/admin/bookings/edit/${bookingId}`);
    },
    [router],
  );

  const onViewButton = useCallback(
    (bookingId: string) => {
      router.push(`/account/bookings-list/view/${bookingId}`);
    },
    [router],
  );

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  const columns = useMemo(
    () =>
      getBookingsListColumns({
        onEditButton,
        onViewButton,
        isCustomer,
      }),
    [isCustomer, onEditButton, onViewButton],
  );

  function renderHeader() {
    return (
      <div className="ml-5 max-w-max">
        <SearchInput />
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      data={allbookings}
      currentPage={currentPage - 1}
      totalRows={meta?.total}
      withPageCount
      pageSize={25}
      tableBodyClassName="divide-y"
      paginationClassName="border-t"
      currentPageDataLength={allbookings?.length}
      onPageChange={onPageChange}
      renderHeader={renderHeader()}
    />
  );
}

export default BookingsListPage;
