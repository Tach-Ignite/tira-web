import { UnAuthenticatedLayout } from '@components/layouts/unAuthenticated';
import React from 'react';

function DemoLayout({ children }: { children: React.ReactNode }) {
  return <UnAuthenticatedLayout>{children}</UnAuthenticatedLayout>;
}

export default DemoLayout;
