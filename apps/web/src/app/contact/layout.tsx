'use client';

import { CustomerLayout } from '@components/layouts/customer';
import React from 'react';

function ContactLayout({ children }: { children: React.ReactNode }) {
  return <CustomerLayout>{children}</CustomerLayout>;
}

export default ContactLayout;
