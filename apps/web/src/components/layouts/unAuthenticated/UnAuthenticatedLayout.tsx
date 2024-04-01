import React from 'react';
import UnAuthenticatedTopNavBar from './UnAuthenticatedTopNavBar';

function UnAuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <UnAuthenticatedTopNavBar />
      {children}
    </div>
  );
}

export default UnAuthenticatedLayout;
