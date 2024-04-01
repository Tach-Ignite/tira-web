'use client';

import React from 'react';
import { AdminLayout as AdminRootLayout } from '@components/layouts/admin';

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}

export default AdminLayout;
