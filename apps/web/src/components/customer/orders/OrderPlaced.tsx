'use client';

import React from 'react';
import Link from 'next/link';
import TachLogo from '../../../../public/assets/tach-logo.png';
import { OrderPlacedProps } from './types';

function OrderSuccessfullyPlaced(props: OrderPlacedProps) {
  const { isFailed } = props;

  return (
    <div className="bg-gray-50 flex flex-col dark:bg-gray-800 rounded-lg m-auto justify-center items-center mx-[30%] min-[1500px]:mx-[20%] min-[1000px]:mx-[10%] min-[500px]:mx-[5%] min-[100px]:mx-[1%] mb-40">
      <div
        className={`text-black text-center pt-16 dark:text-white font-medium text-2xl leading-[36px] ${isFailed ? 'text-red-600 dark:!text-red-500' : ''}`}
      >
        {isFailed ? 'Order Payment is Failed!' : 'Order Confirmed!'}
      </div>
      {isFailed ? null : (
        <div className="text-black text-center py-6 dark:text-white font-normal text-base">
          You will receive an email receipt of your purchase shortly.
        </div>
      )}
      <div className="h-[200px] my-10 m-auto w-[400px] rounded-[50%] bg-black flex items-center justify-center">
        <img src={TachLogo?.src} alt="acknowledge" className="" />
      </div>
      <Link
        href="/account/orders"
        className="mb-14 text-black border hover:bg-indigo-500 dark:hover:bg-yellow-400 hover:text-white dark:hover:text-black border-gray-300 dark:border-gray-600 p-3 rounded-lg dark:text-white"
      >
        View Orders
      </Link>
    </div>
  );
}

export default OrderSuccessfullyPlaced;
