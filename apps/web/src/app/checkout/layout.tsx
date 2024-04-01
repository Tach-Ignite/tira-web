'use client';

import { CustomerLayout } from '@components/layouts/customer';
import React from 'react';

function CustomerCheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomerLayout className="max-[655px]:px-4">{children}</CustomerLayout>
  );
}

export default CustomerCheckoutLayout;
