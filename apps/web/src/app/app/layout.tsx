'use client';

import { AdminConsoleLayout } from '@components/layouts/admin-console';
import { TachColorShopLayout } from '@components/layouts/tach-color-shop';
import { usePathname } from 'next/navigation';
import React from 'react';

function TachColorShopDemoLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const isAdminConsole = pathName?.includes('admin-console');

  return isAdminConsole ? (
    <AdminConsoleLayout>{children}</AdminConsoleLayout>
  ) : (
    <TachColorShopLayout>{children}</TachColorShopLayout>
  );
}

export default TachColorShopDemoLayout;
