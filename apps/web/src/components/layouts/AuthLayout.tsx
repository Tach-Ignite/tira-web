/* eslint-disable no-nested-ternary */

'use client';

import { CustomerRoutes } from '@src/routes';
import { usePathname } from 'next/navigation';
import OnBoardingHeader from '@src/components/layouts/OnBoardingHeader';
import Footer from '@components/tira-landing/components/Footer';

function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const isOnboardingPage = pathName.includes(CustomerRoutes.Onboarding);

  return (
    <div
      className={`!bg-white dark:!bg-black ${isOnboardingPage ? 'h-full' : 'min-h-calc-content'}`}
    >
      <OnBoardingHeader />
      <div
        className={`!bg-white dark:!bg-black w-full ${isOnboardingPage ? '!min-h-comp-calc-content tab:!h-full' : 'mt-[100px] pb-9 min-h-comp-calc-content'}`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
