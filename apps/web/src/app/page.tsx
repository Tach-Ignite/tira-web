/* eslint-disable react/no-unstable-nested-components */

'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  ExploreStorefront,
  ExploreAdminPortal,
  ExploreTIRAInAction,
  KeyFlows,
  StackInfo,
  TIRAFeatures,
  WhatIsTIRA,
  PlatformIntegrations,
  PowerfulUtilities,
  CoreFrameworks,
} from '@components/home/landing-page';
import TopNavbar from '../components/tira-landing/components/Navbar';
import Footer from '../components/tira-landing/components/Footer';

function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = searchParams?.get('#') || pathname?.split('#')[1];

    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [pathname, searchParams]);

  return (
    <div className="h-full">
      <TopNavbar isHomePage showThemeToggle={false} />
      <div className="bg-white dark:!bg-neutral flex flex-col items-center gap-10 xs:gap-20 max-[655px]:py-8">
        <div className="flex flex-col justify-center w-full">
          <WhatIsTIRA />
          <StackInfo />
          <ExploreTIRAInAction />
          <ExploreAdminPortal />
          <ExploreStorefront />
          <TIRAFeatures />
          <KeyFlows />
          <PlatformIntegrations />
          <PowerfulUtilities />
          <CoreFrameworks />
        </div>
      </div>
      <Footer isHomePage />
    </div>
  );
}

export default Home;
