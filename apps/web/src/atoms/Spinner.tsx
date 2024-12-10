/* eslint-disable no-nested-ternary */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/require-default-props */

'use client';

import { Spinner as FlowBiteSpinner } from '@src/flowbite';

function Spinner({
  size = 'lg',
  className,
  variant = 'default',
}: {
  size?: string;
  className?: string;
  variant?: 'default' | 'dotted';
}) {
  if (variant === 'dotted') {
    const dotSize =
      size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
    const containerSize =
      size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {' '}
        <div
          className={`relative ${containerSize} flex items-center justify-center animate-spin-slow`}
        >
          {' '}
          {[...Array(8)].map((_, index) => (
            <div
              key={`${index + 1}`}
              className={`absolute ${dotSize} !bg-action dark:!bg-action-dark rounded-full`}
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 45}deg) translate(150%, 0)`,
                transformOrigin: '0 0',
              }}
            ></div>
          ))}{' '}
        </div>{' '}
      </div>
    );
  }

  // Render the default Flowbite spinner
  return (
    <FlowBiteSpinner
      size={size}
      color="info"
      theme={{
        color: { info: className || 'fill-action dark:fill-action-dark' },
      }}
    />
  );
}

export default Spinner;
