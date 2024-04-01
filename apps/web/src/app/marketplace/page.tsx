'use client';

import React, { useState } from 'react';
import { MarketPlaceEnum } from './type';
import Products from './Products';
import Services from './Services';

function Page() {
  const [page, setPage] = useState<MarketPlaceEnum>(MarketPlaceEnum.Products);
  return (
    <div className=" bg-white dark:bg-gray-800 h-full ">
      <div className=" bg-gray-100 dark:bg-gray-700 flex justify-center gap-4 py-4">
        <button
          type="button"
          className={`${page === MarketPlaceEnum.Products ? 'font-semibold ' : 'font-normal'} dark:text-white`}
          onClick={() => setPage(MarketPlaceEnum.Products)}
        >
          Products
        </button>
        <button
          type="button"
          className={`${page === MarketPlaceEnum.Services ? 'font-semibold ' : 'font-normal'} dark:text-white`}
          onClick={() => setPage(MarketPlaceEnum.Services)}
        >
          Services
        </button>
      </div>
      <div className="px-14 h-full w-full py-6">
        {page === MarketPlaceEnum.Products ? <Products /> : <Services />}
      </div>
    </div>
  );
}

export default Page;
