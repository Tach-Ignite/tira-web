'use client';

import { UnAuthenticatedTopNavBar } from '@components/layouts/unAuthenticated';
import Footer from '@components/tira-landing/components/Footer';
import { useAuthContext } from '@context/AuthContext';

export default function AnnouncementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="h-full">
      <UnAuthenticatedTopNavBar />
      <div
        className={`bg-white dark:bg-gray-900 pt-20 px-20 max-[860px]:px-3 pb-5 ${isAuthenticated ? 'min-h-comp-calc-content' : 'min-h-auth-calc-content'}`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
