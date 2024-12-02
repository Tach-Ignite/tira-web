'use client';

import AuthLayout from '@components/layouts/AuthLayout';
import React from 'react';

function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}

export default OnboardingLayout;
