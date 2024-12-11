'use client';

import ConsoleLayout from '@components/layouts/ConsoleLayout';
import React from 'react';

function LayoutConsole({ children }: { children: React.ReactNode }) {
  return <ConsoleLayout>{children}</ConsoleLayout>;
}

export default LayoutConsole;
