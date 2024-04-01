'use client';

import React from 'react';
import { BookingsEntity } from '@services';
import { GetColumnsType } from '@src/types/modules';
import { Row } from '@tanstack/react-table';
import { convertToDollarAmount } from '@src/lib/numbers';
import { convertToPDTDate } from '@src/lib/date';
import { TableActionButtons } from '@src/atoms';
import BookingsBadge from './BookingsBadge';

const getBookingsListColumns = (props: GetColumnsType) => {
  const { onEditButton, isCustomer, onViewButton } = props || {};

  return [
    { header: 'Booking #', enableSorting: false, accessorKey: 'bookingId' },
    ...(isCustomer
      ? []
      : [
          {
            header: 'Customer',
            enableSorting: false,
            cell: ({ row }: { row: Row<BookingsEntity> }) => {
              const { firstName, lastName } = row?.original || {};
              return (
                <p className="text-gray-500 dark:text-gray-400">
                  {firstName} {lastName}
                </p>
              );
            },
          },
        ]),
    {
      header: 'Status',
      cell: ({ row }: { row: Row<BookingsEntity> }) => {
        const { status } = row?.original || {};
        return <BookingsBadge status={status} />;
      },
    },
    {
      header: 'Duration',
      enableSorting: false,
      cell: ({ row }: { row: Row<any> }) => {
        const { duration } = row?.original || {};
        return (
          <p className="text-gray-500 dark:text-gray-400">
            {duration.toString()} {duration > 1 ? 'Minutes' : 'Minute'}
          </p>
        );
      },
    },
    {
      header: 'Total',
      enableSorting: false,
      cell: ({ row }: { row: Row<any> }) => {
        const { price = 0 } = row?.original?.service || {};
        return (
          <p className="text-gray-500 dark:text-gray-400">
            {convertToDollarAmount(price, true)}
          </p>
        );
      },
    },
    {
      header: 'Date',
      cell: ({ row }: { row: Row<any> }) => {
        const { bookingDate } = row?.original || {};
        const date = bookingDate && new Date(bookingDate);
        return (
          <p className="text-gray-500 dark:text-gray-400">
            {date ? convertToPDTDate(date) : '--'}
          </p>
        );
      },
    },
    ...(isCustomer
      ? [
          {
            header: 'Notes',
            cell: ({ row }: { row: Row<any> }) => {
              const { bookingNotes = '' } = row?.original || {};
              return (
                <p className="text-gray-500 dark:text-gray-400 oneLine-ellipsis">
                  {bookingNotes || '--'}
                </p>
              );
            },
          },
        ]
      : [
          {
            header: 'Notes',
            cell: ({ row }: { row: Row<any> }) => {
              const { adminNotes = '' } = row?.original || {};
              return (
                <p className="text-gray-500 dark:text-gray-400 oneLine-ellipsis">
                  {adminNotes || '--'}
                </p>
              );
            },
          },
        ]),
    {
      header: isCustomer ? 'Action' : 'Actions',
      cell: ({ row }: { row: Row<BookingsEntity> }) => {
        const { bookingId = '' } = row?.original || {};

        const onEdit = () => {
          onEditButton(bookingId);
        };

        const onView = () => {
          onViewButton?.(bookingId);
        };

        return (
          <TableActionButtons
            onEditButton={isCustomer ? undefined : onEdit}
            onViewButton={isCustomer ? onView : undefined}
          />
        );
      },
    },
  ];
};

export default getBookingsListColumns;
