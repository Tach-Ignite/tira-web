'use client';

import React from 'react';
import { OrdersEntity } from '@services';
import { GetColumnsType } from '@src/types/modules';
import { Row } from '@tanstack/react-table';
import {
  convertNumberToCommaFormat,
  convertToDollarAmount,
} from '@src/lib/numbers';
import { convertToPDTDate } from '@src/lib/date';
import { TableActionButtons } from '@src/atoms';
import OrdersBadge from './OrdersBadge';

const getOrdersListColumns = (props: GetColumnsType) => {
  const { onEditButton, isCustomer, onViewButton } = props || {};

  return [
    { header: 'Order #', enableSorting: false, accessorKey: 'orderId' },
    ...(isCustomer
      ? []
      : [
          {
            header: 'Customer',
            enableSorting: false,
            cell: ({ row }: { row: Row<OrdersEntity> }) => {
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
      cell: ({ row }: { row: Row<OrdersEntity> }) => {
        const { orderStatus } = row?.original || {};
        return <OrdersBadge orderStatus={orderStatus} />;
      },
    },
    {
      header: 'Items',
      enableSorting: false,
      cell: ({ row }: { row: Row<OrdersEntity> }) => {
        const { orderItems } = row?.original || {};
        return (
          <p className="text-gray-500 dark:text-gray-400">
            {convertNumberToCommaFormat(orderItems?.length || 0)}
          </p>
        );
      },
    },
    {
      header: 'Total',
      enableSorting: false,
      cell: ({ row }: { row: Row<OrdersEntity> }) => {
        const { total = 0 } = row?.original || {};
        return (
          <p className="text-gray-500 dark:text-gray-400">
            {convertToDollarAmount(total, true)}
          </p>
        );
      },
    },
    {
      header: 'Date',
      cell: ({ row }: { row: Row<OrdersEntity> }) => {
        const { createdAt } = row?.original || {};
        const date = createdAt && new Date(createdAt);
        return (
          <p className="text-gray-500 dark:text-gray-400">
            {date ? convertToPDTDate(date) : '--'}
          </p>
        );
      },
    },
    ...(isCustomer
      ? []
      : [
          {
            header: 'Notes',
            cell: ({ row }: { row: Row<OrdersEntity> }) => {
              const { shippingNotes = '' } = row?.original || {};
              return (
                <p className="text-gray-500 dark:text-gray-400 oneLine-ellipsis">
                  {shippingNotes || '--'}
                </p>
              );
            },
          },
        ]),
    {
      header: isCustomer ? 'Action' : 'Actions',
      cell: ({ row }: { row: Row<OrdersEntity> }) => {
        const { orderId = '' } = row?.original || {};

        const onEdit = () => {
          onEditButton(orderId);
        };

        const onView = () => {
          onViewButton?.(orderId);
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

export default getOrdersListColumns;
