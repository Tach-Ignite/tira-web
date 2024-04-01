'use client';

import React from 'react';
import { CustomerAccountLayout } from '@components/layouts/customerAccount';

function AccountsLayout({ children }: { children: React.ReactNode }) {
  return <CustomerAccountLayout>{children}</CustomerAccountLayout>;
}

export default AccountsLayout;
