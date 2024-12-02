'use client';

import { UnAuthenticatedTopNavBar } from '@components/layouts/unAuthenticated';
import Footer from '@components/tira-landing/components/Footer';
import { useAuthContext } from '@context/AuthContext';

export default function ArticleLAyout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();

  return (
    <div>
      <UnAuthenticatedTopNavBar />
      <div
        className={`bg-white dark:bg-black pt-20 px-20 max-[860px]:px-3 pb-5  ${isAuthenticated ? 'min-h-comp-calc-content' : 'min-h-auth-calc-content'}`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
