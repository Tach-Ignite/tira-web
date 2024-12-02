/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React, { useMemo, useState } from 'react';
import { convertToPDTDate } from '@src/lib/date';
import { OrdersBadge } from '@src/app/common/orders';
import dynamic from 'next/dynamic';
import { OrderStatusEnum } from '@services';
import { DeleteModal } from '@src/modals';
import { useCancelOrder } from '@queries/useOrderQuery';
import { EditOrderProps } from './types';
import TachRoundedLogo from '../../../../public/assets/tach-rounded-logo.png';

const OptimizedImage = dynamic(() => import('next/image'), { ssr: false });

function EditOrderInfoCard(props: EditOrderProps) {
  const { orderDetails, showPaymentErrorStatus, isCustomer } = props || {};

  const { orderId, orderStatus, firstName, lastName, createdAt, updatedAt } =
    orderDetails || {};

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleCancelOrder = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const { mutateAsync: cancelOrder } = useCancelOrder({
    successMessage: 'Order has been Cancelled.',
    failureMessage: 'Failed to cancel the order. Please try again later.',
  });

  const onConfirmCanceOrder = async () => {
    await cancelOrder(orderId as string);
    setShowDeleteModal(false);
  };

  const details = useMemo(
    () => [
      { label: 'Customer', value: `${firstName} ${lastName}` },
      {
        label: 'Date',
        value: createdAt ? convertToPDTDate(new Date(createdAt)) : '-',
      },
      {
        label: 'Updated',
        value: updatedAt ? convertToPDTDate(new Date(updatedAt)) : '-',
      },
    ],
    [firstName, lastName, createdAt, updatedAt],
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-xl pt-6 pb-8 pl-6 pr-8 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex gap-6 flex-col lg:flex-row lg:items-center mb-8">
              <p className="font-bold flex gap-1 text-sm lg:text-xl lg:leading-[30px] text-black dark:text-gray-50">
                <span>Order</span>
                <span>#{orderId}</span>
              </p>
              <div className="flex gap-6 lg:items-center flex-wrap">
                <OrdersBadge orderStatus={orderStatus} />
                {showPaymentErrorStatus ? (
                  <OrdersBadge orderStatus="Payment Error" />
                ) : null}
                {isCustomer && orderStatus !== OrderStatusEnum.Cancelled ? (
                  <div
                    className="font-medium text-center cursor-pointer text-xs mr-4 leading-[18px] text-red-600 dark:text-red-400"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </div>
                ) : null}
              </div>
            </div>
            <div className="pl-3 xs:pl-8 flex flex-col gap-5">
              {details?.map(({ label, value }) => (
                <div className="flex items-center text-black" key={label}>
                  <div className="text-right text-[12px] leading-[12px] tab:text-[14px] tab:leading-[14px] dark:text-gray-400 min-w-[70px] sm:min-w-[90px] lg:min-w-[100px] break-all">
                    {label}
                  </div>
                  <div className="font-semibold ml-5 text-[12px] leading-[16px] tab:text-[14px] tab:leading-[14px] dark:text-gray-50 break-all">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <OptimizedImage
            src={TachRoundedLogo?.src}
            alt={orderStatus || ''}
            className="hidden lg:flex"
            height={TachRoundedLogo?.height}
            width={TachRoundedLogo?.width}
          />
        </div>
      </div>
      {showDeleteModal ? (
        <DeleteModal
          showModal={showDeleteModal}
          onCloseModal={handleCancelOrder}
          onHandleConfirm={onConfirmCanceOrder}
          buttonNames={['Confirm', 'Cancel']}
          description="Are you sure you want to cancel this order?"
        />
      ) : null}
    </>
  );
}

export default EditOrderInfoCard;
