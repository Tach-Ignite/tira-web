import { CustomerRoutes } from '@src/routes';
import Link from 'next/link';
import React from 'react';
import { Button } from '@src/atoms';

function EmptyCart() {
  return (
    <div className=" flex flex-col items-center justify-center col-span-2 p-20p gap-5 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="text-2xl font-medium dark:text-gray-50">
        Shopping Cart Is Empty
      </div>
      <div className="h-[200px] w-[400px] rounded-[50%] bg-black flex items-center justify-center">
        <img src="assets/tach-logo.png" alt="shopping-cart" className="" />
      </div>
      <div>
        <Link href={CustomerRoutes.MarketPlace}>
          <Button>Shop For Products</Button>
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
