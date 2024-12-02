/* eslint-disable react/require-default-props */
/* eslint-disable no-else-return */

'use client';

import { OrderStatusEnum } from '@services';
import React from 'react';
import { Badge } from '@src/flowbite';

const getBadgeColor = (orderStatus?: string) => {
  if (orderStatus === OrderStatusEnum.Pending) {
    return 'warning';
  } else if (orderStatus === OrderStatusEnum.Cancelled) {
    return 'purple';
  } else if (orderStatus === OrderStatusEnum.Confirmed) {
    return 'green';
  } else if (
    orderStatus === 'Payment Error' ||
    orderStatus === 'Inventory Issue'
  ) {
    return 'red';
  }
  return 'blue';
};

function OrdersBadge({ orderStatus }: { orderStatus?: string }) {
  const badgeColor = getBadgeColor(orderStatus);

  return (
    <Badge
      size="sm"
      color={badgeColor}
      className="min-w-max capitalize"
      theme={{
        icon: { off: 'rounded-md px-2.5 py-0.5' },
        root: {
          color: {
            red: 'bg-red-100 text-red-800 group-hover:bg-red-100 dark:bg-gray-700 dark:text-red-400 dark:border-[0.5px] dark:border-red-400 dark:group-hover:bg-red-400',
            blue: 'bg-primary-100 text-primary-800 group-hover:bg-primary-200 dark:bg-gray-700 dark:text-blue-400 dark:border-[0.5px] dark:border-blue-400 dark:group-hover:bg-blue-300',
            warning:
              'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 dark:bg-gray-700 dark:text-yellow-300 dark:border-[0.5px] dark:border-yellow-300 dark:group-hover:bg-yellow-300',
            purple:
              'bg-purple-100 text-purple-700 group-hover:bg-purple-200 dark:bg-gray-700 dark:text-purple-400 dark:border-[0.5px] dark:border-purple-300 dark:group-hover:bg-purple-300',
          },
          base: 'flex h-fit items-center gap-1 font-medium max-w-fit',
        },
      }}
    >
      {orderStatus}
    </Badge>
  );
}

export default OrdersBadge;
