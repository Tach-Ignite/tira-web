'use client';

import React, { useMemo } from 'react';
import { TruckIcon } from '@src/icons';
import { formatNumberToKFormat } from '@src/lib/numbers';
import { DashboardOrderInfoCardProps } from './types';

function DashboardOrderInfoCard(props: DashboardOrderInfoCardProps) {
  const { cardName, count = 0 } = props || {};

  const countColor = useMemo(
    () =>
      cardName === 'Cancelled'
        ? 'text-red-500 dark:text-red-400'
        : 'text-green-600 dark:text-green-400',
    [cardName],
  );

  const truckColor = useMemo(() => {
    if (cardName === 'Shipped') {
      return 'text-purple-100 bg-purple-900 dark:text-orange-600 dark:bg-orange-600/16 dark:border dark:border-orange-600';
    }
    if (cardName === 'Open') {
      return 'text-purple-100 <bg-purple-4></bg-purple-4>00 dark:text-orange-600 dark:bg-orange-600/16 dark:border dark:border-orange-600';
    }
    return 'text-purple-900 bg-purple-200 dark:text-orange-200 dark:bg-orange-200/16 dark:border dark:border-orange-200';
  }, [cardName]);

  const renderIcon = () => (
    <div className={`h-8 flex w-8 rounded-lg bg-opacity-16 ${truckColor}`}>
      <TruckIcon className="h-4 w-4 m-auto" />
    </div>
  );

  const formattedCount = useMemo(() => {
    const formatCount = formatNumberToKFormat(count);
    return cardName !== 'Cancelled' ? `+${formatCount}` : `-${formatCount}`;
  }, [count, cardName]);

  return (
    <div className="py-5 w-full min-h-32 shadow-xl rounded-2xl bg-white dark:bg-gray-800 text-center items-center min-[950px]:pl-8 max-[950px]:pl-0 max-[650px]:px-3">
      <div className="flex items-center max-[950px]:flex-col">
        {renderIcon()}
        <div className="font-medium w-full text-sm leading-[21px] text-gray-500 dark:text-gray-300">
          {cardName} Orders
        </div>
      </div>
      <div
        className={`font-semibold text-center min-[830px]:text-3xl max-[830px]:text-lg min-[830px]:leading-[45px] max-[830px]:leading-[24px] ${countColor}`}
      >
        {formattedCount}
      </div>
    </div>
  );
}

export default DashboardOrderInfoCard;
