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
      className={`!bg-white dark:!bg-black ${isOnboardingPage ? 'h-full md:!pt-[-1rem]' : 'min-h-calc-content'}`}
    >
      <OnBoardingHeader />
      <div
        className={`w-full min-h-comp-calc-content ${isOnboardingPage ? '' : 'mt-[100px] pb-9'}`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
