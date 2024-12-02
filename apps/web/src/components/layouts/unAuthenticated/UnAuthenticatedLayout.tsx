import React from 'react';
import Footer from 'src/components/tira-landing/components/Footer';
import UnAuthenticatedTopNavBar from './UnAuthenticatedTopNavBar';
// import Footer from '../Footer';

function UnAuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <UnAuthenticatedTopNavBar />
      {children}
      <Footer />
    </div>
  );
}

export default UnAuthenticatedLayout;
