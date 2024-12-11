'use client';

import AuthLayout from '@components/layouts/AuthLayout';
import { OnboardingProvider } from '@context/OnboardingContext';
import React from 'react';

function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <OnboardingProvider>{children}</OnboardingProvider>
    </AuthLayout>
  );
}

export default OnboardingLayout;
