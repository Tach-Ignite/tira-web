'use client';

import React from 'react';
import { OrdersBadge } from '@src/app/common/orders';
import { DetailsCardProps } from './types';

function DetailsCard(props: DetailsCardProps) {
  const {
    details,
    title,
    isSideCard = true,
    showPaymentErrorStatus,
  } = props || {};

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl px-6 py-8 rounded-2xl">
      <div className="font-bold mb-8 text-sm lg:text-xl lg:leading-[30px] text-black flex gap-3 flex-wrap dark:text-gray-50">
        {title}
        {showPaymentErrorStatus ? (
          <OrdersBadge orderStatus="Payment Error" />
        ) : null}
      </div>
      <div className="pl-3 xs:pl-8 flex flex-col gap-5">
        {details?.map(({ label, value }) => (
          <div
            key={label}
            className={`flex ${isSideCard ? 'items-start' : 'items-center'} text-black`}
          >
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
  );
}

export default DetailsCard;
