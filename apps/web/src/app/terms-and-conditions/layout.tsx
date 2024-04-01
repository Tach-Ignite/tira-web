'use client';

import { UnAuthenticatedTopNavBar } from '@components/layouts/unAuthenticated';

function TermsAndConditionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UnAuthenticatedTopNavBar />
      <div className="bg-light-bg-image dark:bg-dark-bg-image bg-cover bg-no-repeat px-10 tab:px-20 py-20">
        {children}
      </div>
    </div>
  );
}

export default TermsAndConditionsLayout;
