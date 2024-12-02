'use client';

import AppSpinner from '@src/app/AppSpinner';
import Footer from 'src/components/tira-landing/components/Footer';
import { usePathname } from 'next/navigation';
import { AdminRoutes } from '@src/routes';
import React from 'react';
import AdminTopNavBar from './AdminTopNavBar';
import AdminSideBar from './AdminSideBar';
// import Footer from '../Footer';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isProductPage = pathName?.includes(AdminRoutes.Products);

  return (
    <div>
      <AdminTopNavBar />
      <div className="bg-gray-50 dark:bg-gray-900 w-full mt-10 tab:!mt-0 min-h-comp-calc-content">
        <div className="flex pt-10 gap-8 mx-3 sm:mx-10 flex-row tab:flex-col pb-64">
          <div className="max-[655px]:hidden">
            <AdminSideBar />
          </div>
          <div className={`w-full ${isProductPage ? '' : 'overflow-auto'}`}>
            <AppSpinner>{children}</AppSpinner>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;
