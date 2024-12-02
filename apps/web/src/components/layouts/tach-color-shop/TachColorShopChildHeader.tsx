'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { TachColorShopRoutes } from '@src/routes';

const inactiveLinkClass = 'py-2';
const activeLinkClass = 'font-bold py-2 border-b-[4px] border-purple-900';

export default function TachColorShopChildHeader() {
  const pathName = usePathname();
  return (
    <div className=" bg-gray-100 dark:bg-gray-700 flex justify-start gap-4 py-4 px-10">
      <Link
        className={
          pathName?.includes('/marketplace/products')
            ? `flex ${activeLinkClass}`
            : `flex ${inactiveLinkClass}`
        }
        href={TachColorShopRoutes.Products}
      >
        Products
      </Link>
      <Link
        className={
          pathName?.includes('/marketplace/services')
            ? `flex ${activeLinkClass}`
            : `flex ${inactiveLinkClass}`
        }
        href={TachColorShopRoutes.Service}
      >
        Services
      </Link>
    </div>
  );
}
