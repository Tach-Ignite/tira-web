'use client';

import { DashboardOrderInfoCard } from '@src/cards';
import React from 'react';
import { OrdersInfoGridProps } from './types';

const cardClassName =
  'grid-cols-subgrid min-[450px]:col-span-1 max-[450px]:col-span-3';

function OrdersInfoGrid(props: OrdersInfoGridProps) {
  const { totalCanceledOrders, totalOpenOrders, totalShippedOrders } =
    props || {};

  return (
    <div className="min-[450px]:flex min-[950px]:flex-col max-[450px]:grid grid-cols-3 gap-5 max-[950px]:flex-row h-full justify-between">
      <div className={cardClassName}>
        <DashboardOrderInfoCard cardName="Shipped" count={totalShippedOrders} />
      </div>
      <div className={cardClassName}>
        <DashboardOrderInfoCard cardName="Open" count={totalOpenOrders} />
      </div>
      <div className={cardClassName}>
        <DashboardOrderInfoCard
          cardName="Cancelled"
          count={totalCanceledOrders}
        />
      </div>
    </div>
  );
}

export default OrdersInfoGrid;
