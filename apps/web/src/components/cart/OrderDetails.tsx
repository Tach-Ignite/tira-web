import React from 'react';
import { Button } from '@src/atoms';
import { convertToDollarAmount } from '@src/lib/numbers';
import { OrderDetailsProps } from './types';

function OrderDetails({
  subTotalPrice = 0,
  totalItems = 0,
  totalPrice = 0,
  className = '',
  buttonName = 'Proceed to Checkout',
  onClick,
  shippingAmount = 0,
  shouldDisableButton = false,
}: OrderDetailsProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 col-span-1 py-6 text-sm rounded-lg px-4 border border-gray-300 dark:border-gray-700 flex flex-col sm:col-span-2 md:col-span-1 font-medium leading-[21px] text-black dark:text-gray-50 ${className}`}
    >
      <div className="flex justify-between border-b mb-6 border-gray-200 dark:border-gray-600 pb-2 text-base dark:text-gray-50">
        Order Details
      </div>
      <div className="flex justify-between mb-3">
        <span className="w-3/5">Subtotal ({totalItems} items)</span>
        <span className="w-2/5 font-bold">
          {convertToDollarAmount(subTotalPrice) || '--'}
        </span>
      </div>
      <div className="flex justify-between mb-8">
        <span className="w-3/5">Shipping</span>
        <span className="w-2/5 font-bold">
          {convertToDollarAmount(shippingAmount) || '--'}
        </span>
      </div>
      <div className="flex justify-between font-bold mb-12">
        <span className="w-3/5">Total</span>
        <span className="w-2/5">
          {convertToDollarAmount(totalPrice) || '--'}
        </span>
      </div>
      <Button
        disabled={shouldDisableButton}
        onClick={onClick}
        color="gray"
        gradientDuoTone={!shouldDisableButton ? 'purpleToBlue' : undefined}
        theme={{
          color: shouldDisableButton
            ? {
                gray: `bg-gray-200 text-gray-400 disabled:bg-dray-700 dark:bg-yellow-400 dark:text-gray-900 `,
              }
            : {},
        }}
      >
        {buttonName}
      </Button>
    </div>
  );
}

export default OrderDetails;
