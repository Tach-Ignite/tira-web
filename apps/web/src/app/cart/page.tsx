'use client';

import { useState, useEffect } from 'react';
import {
  CartsWrapper,
  EmptyCart,
  OrderDetails,
  OrderDetailsProps,
} from '@components/cart';

import { useFetchCartDetails } from '@queries/useCartQuery';
import { useRouter } from 'next/navigation';
import AppSpinner from '../../components/appSpinner/AppSpinner';

function CartPage() {
  const {
    data: { cartItems = [] } = {},
    refetch,
    isLoading,
  } = useFetchCartDetails();

  const router = useRouter();

  const [orderDetails, setOrderDetails] = useState<OrderDetailsProps>({});

  useEffect(() => {
    let totalPrice = 0;
    let totalItems = 0;
    cartItems?.forEach?.((val) => {
      totalItems += val.quantity;
      totalPrice += val.quantity * val.product.salePrice;
    });
    setOrderDetails({ subTotalPrice: totalPrice, totalPrice, totalItems });
  }, [cartItems]);

  const onCheckout = () => {
    router.push('/checkout/orders');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
      <div className="col-span-2 relative">
        <AppSpinner show={isLoading} className="h-20 w-20" />
        {cartItems.length ? (
          <CartsWrapper refetchFn={refetch} data={cartItems} />
        ) : (
          <EmptyCart />
        )}
      </div>
      <OrderDetails
        onClick={onCheckout}
        shouldDisableButton={!cartItems?.length}
        totalItems={orderDetails.totalItems}
        subTotalPrice={orderDetails.subTotalPrice}
        totalPrice={orderDetails.totalPrice}
      />
    </div>
  );
}

export default CartPage;
