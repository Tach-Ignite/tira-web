'use client';

import { TopNavBar } from '@components/layouts/common';
import Footer from '@components/tira-landing/components/Footer';

function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <TopNavBar />
      <div className="bg-white  dark:bg-gray-900 p-8 min-h-comp-calc-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default CartLayout;
