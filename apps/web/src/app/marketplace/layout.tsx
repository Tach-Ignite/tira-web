'use client';

import { CustomerLayout } from '@components/layouts/customer';
import React from 'react';

function MarketPlaceLayout({ children }: { children: React.ReactNode }) {
  return <CustomerLayout className="!p-0">{children}</CustomerLayout>;
}

export default MarketPlaceLayout;
