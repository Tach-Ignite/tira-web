/* eslint-disable react/require-default-props */

'use client';

import { Spinner as FlowBiteSpinner } from '@src/flowbite';

function Spinner({ size, className }: { size?: string; className?: string }) {
  return (
    <FlowBiteSpinner
      size={size || 'md'}
      color="info"
      theme={{ color: { info: className || 'fill-primary2 dark:fill-aqua' } }}
    />
  );
}

export default Spinner;
