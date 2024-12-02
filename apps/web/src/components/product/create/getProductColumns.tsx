'use client';

import { Row } from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import { GetColumnsType, ProductType } from '../../../types/modules';
import ProductImage from '../../../../public/assets/product-image.svg';
import { convertToDollarAmount } from '../../../lib/numbers';

const OptimizedImage = dynamic(() => import('next/image'), { ssr: false });

const TableActionButtons = dynamic(
  () => import('@src/atoms/TableActionButtons/TableActionButtons'),
  { ssr: false },
);

export const getProductColumns = (props: GetColumnsType) => {
  const { onDeleteButton, onEditButton, onViewButton } = props || {};
  const fallbackSrc = '/assets/product-image.svg';
  return [
    {
      header: 'Image',
      enableSorting: false,
      cell: ({ row }: { row: Row<ProductType> }) => {
        const { productImageUrl } = row?.original || {};
        const firstUrl = productImageUrl?.[0];

        const imageUrl = `${process.env.BUCKET_PREFIX}${firstUrl}`;
        return firstUrl ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            className="h-[111px] w-[111px] max-[1500px]:w-[72px] max-[1500px]:h-[72px] max-[1400px]:w-[60px] max-[1400px]:h-[60px] max-[1300px]:w-[42px] max-[1300px]:h-[42px] rounded-[50%]"
            src={imageUrl}
            fetchPriority="high"
            alt="product-image"
            onError={(event) => {
              const imgElement = event.target as HTMLImageElement;
              imgElement.src = fallbackSrc;
            }}
          />
        ) : (
          <OptimizedImage
            src={ProductImage}
            alt="product-image"
            width="0"
            priority
            height="0"
            onError={(event) => {
              const imgElement = event.target as HTMLImageElement;
              imgElement.src = fallbackSrc;
            }}
          />
        );
      },
    },
    {
      header: 'Title',
      cell: ({ row }: { row: Row<ProductType> }) => {
        const { title, description } = row?.original || {};
        return (
          <div className="text-sm max-w-xs">
            <div className="font-bold leading-[18px] text-gray-900 dark:text-gray-50 mb-1">
              {title}
            </div>
            <div className="multiline-ellipsis">{description}</div>
          </div>
        );
      },
    },
    {
      header: 'Stock',
      cell: ({ row }: { row: Row<ProductType> }) => {
        const { quantity } = row?.original || {};
        return (
          <div>
            {quantity} {Number(quantity) > 1 ? 'Units' : 'Unit'}
          </div>
        );
      },
    },
    {
      header: 'Total Sales',
      cell: () => <div>--</div>,
    },
    {
      header: 'Sale Price',
      cell: ({ row }: { row: Row<ProductType> }) => {
        const { salePrice = 0 } = row?.original || {};
        return <div>{convertToDollarAmount(Number(salePrice), true)}</div>;
      },
    },
    {
      header: 'Msrp Price',
      cell: ({ row }: { row: Row<ProductType> }) => {
        const { msrpPrice = 0 } = row?.original || {};
        return <div>{convertToDollarAmount(Number(msrpPrice), true)}</div>;
      },
    },
    {
      header: 'Lead Time',
      cell: () => <div>7 Days</div>,
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: Row<ProductType> }) => {
        const { productId } = row?.original || {};

        const onDelete = () => {
          onDeleteButton?.(row?.original);
        };

        const onEdit = () => {
          onEditButton(productId);
        };

        const onView = () => {
          onViewButton?.(productId);
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
