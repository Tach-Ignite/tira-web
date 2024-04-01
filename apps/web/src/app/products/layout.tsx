'use client';

import { CustomerLayout } from '@components/layouts/customer';
import React from 'react';

function CustomerProductLayout({ children }: { children: React.ReactNode }) {
  return <CustomerLayout>{children}</CustomerLayout>;
}

export default CustomerProductLayout;
