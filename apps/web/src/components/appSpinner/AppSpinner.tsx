import React from 'react';
import { Spinner } from '@src/flowbite';

interface AppSpinnerProps {
  show: boolean;
  /* eslint-disable react/require-default-props */
  className?: string;
}

function AppSpinner({ show, className = '' }: AppSpinnerProps) {
  if (!show) {
    return null;
  }
  return (
    <div className="flex absolute items-center inset-0 justify-center bg-opacity-0 pointer-events-none">
      <Spinner
        size="xl"
        color="info"
        className={className}
        theme={{ color: { info: 'fill-indigo-600' } }}
      />
    </div>
  );
}

export default AppSpinner;
