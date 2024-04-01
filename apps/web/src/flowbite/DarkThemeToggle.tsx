'use client';

import { SunIcon } from '@src/icons';
import { DarkThemeToggle as FlowBiteDarkThemeToggle } from 'flowbite-react';

function DarkThemeToggle() {
  return (
    <FlowBiteDarkThemeToggle
      theme={{
        root: {
          base: 'rounded-lg border border-indigo-600	px-3 py-1.5 text-indigo-600 dark:border-yellow-400 dark:text-yellow-400',
        },
      }}
      className="dark:border-yellow-400"
      iconLight={SunIcon}
    />
  );
}

export default DarkThemeToggle;
