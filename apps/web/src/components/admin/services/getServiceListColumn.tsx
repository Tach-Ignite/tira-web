'use client';

import { convertToDollarAmount } from '@src/lib/numbers';
import { GetColumnsType } from '@src/types/modules';
import Image from 'next/image';
import { Row } from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import ProductImage from '../../../../public/assets/product-image.svg';

const TableActionButtons = dynamic(
  () => import('@src/atoms/TableActionButtons/TableActionButtons'),
  {
    ssr: false,
  },
);

export const getServiceListColumns = (props: GetColumnsType) => {
  const { onDeleteButton, onEditButton, onViewButton } = props || {};
  return [
    {
      header: 'Image',
      enableSorting: false,
      cell: ({ row }: { row: Row<any> }) => {
        const { imageUrls } = row?.original || {};
        const firstUrl = imageUrls?.[0];

        const imageUrl = `${process.env.BUCKET_PREFIX}${firstUrl}`;
        return firstUrl ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            className="h-[111px] w-[111px] max-[1500px]:w-[72px] max-[1500px]:h-[72px] max-[1400px]:w-[60px] max-[1400px]:h-[60px] max-[1300px]:w-[42px] max-[1300px]:h-[42px] rounded-[50%]"
            src={imageUrl}
            fetchPriority="high"
            alt="service-image"
          />
        ) : (
          <Image
            src={ProductImage}
            alt="service-image"
            width="0"
            priority
            height="0"
          />
        );
      },
    },
    {
      header: 'Title',
      cell: ({ row }: { row: Row<any> }) => {
        const { serviceName, description } = row?.original || {};
        return (
          <div className="text-sm max-w-xs">
            <div className="font-bold leading-[18px] text-gray-900 dark:text-gray-50 mb-1">
              {serviceName}
            </div>
            <div className="multiline-ellipsis">{description}</div>
          </div>
        );
      },
    },
    {
      header: 'Limit Booking Per Day',
      cell: ({ row }: { row: Row<any> }) => {
        const { limitOfBookingsPerDay = 0 } = row?.original || {};
        return (
          <>
            {limitOfBookingsPerDay}{' '}
            {Number(limitOfBookingsPerDay) > 1 ? 'Bookings' : 'Booking'}
          </>
        );
      },
    },
    {
      header: 'Duration Of Service',
      cell: ({ row }: { row: Row<any> }) => {
        const { duration } = row?.original || {};

        return (
          <>
            {duration.toString()} {duration > 1 ? 'Minutes' : 'Minute'}
          </>
        );
      },
    },
    {
      header: 'Service Price',
      cell: ({ row }: { row: Row<any> }) => {
        const { price = 0 } = row?.original || {};
        return convertToDollarAmount(Number(price), true);
      },
    },
    {
      header: 'Msrp Price',
      cell: ({ row }: { row: Row<any> }) => {
        const { msrp = 0 } = row?.original || {};
        return convertToDollarAmount(Number(msrp), true);
      },
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: Row<any> }) => {
        const { serviceId } = row?.original || {};

        const onDelete = () => {
          onDeleteButton?.(row?.original);
        };

        const onEdit = () => {
          onEditButton(serviceId);
        };

        const onView = () => {
          onViewButton?.(serviceId);
        };

        return (
          <TableActionButtons
            onClickDeleteButton={onDelete}
            onEditButton={onEdit}
            onViewButton={onView}
          />
        );
      },
    },
  ];
};

export default getServiceListColumns;
