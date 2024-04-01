import { CartsWrapper } from '@components/cart';
import React, { useMemo } from 'react';
import { EditOrderProps } from './types';

function OrderDetails(props: EditOrderProps) {
  const { orderDetails } = props || {};

  const { orderItems } = orderDetails || {};

  const totalOrderItemProducts = useMemo(
    () =>
      orderItems?.map((item) => ({
        id: item?.productId,
        productId: item?.productId,
        quantity: item?.quantity,
        product: item?.product,
      })),
    [orderItems],
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl px-6 py-8 rounded-2xl">
      <div className="font-bold mb-3 text-sm lg:text-xl lg:leading-[30px] text-black dark:text-gray-50">
        Order Details
      </div>
      <CartsWrapper
        isAdmin
        data={totalOrderItemProducts || []}
        titleClassName="!font-bold text-xl leading-[30px] pt-0"
      />
    </div>
  );
}

export default OrderDetails;
