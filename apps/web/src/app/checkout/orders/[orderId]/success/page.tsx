'use client';

import { OrderSuccessfullyPlaced } from '@components/customer';
import { useRemoveAllItemsFromCart } from '@queries';
import { useEffect } from 'react';

function OrderSuccessPage() {
  const { mutateAsync: removeAllItemsFromCart } = useRemoveAllItemsFromCart({
    failureMessage: true,
  });

  useEffect(() => {
    const removeCart = async () => {
      await removeAllItemsFromCart();
    };
    removeCart();
  }, [removeAllItemsFromCart]);

  return <OrderSuccessfullyPlaced />;
}

export default OrderSuccessPage;
