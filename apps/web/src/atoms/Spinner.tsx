/* eslint-disable react/require-default-props */

'use client';

import { Spinner as FlowBiteSpinner } from '@src/flowbite';

function Spinner({ size }: { size?: string }) {
  return (
    <FlowBiteSpinner
      size={size || 'md'}
      color="info"
      theme={{ color: { info: 'fill-primary2 dark:fill-aqua' } }}
    />
  );
}

export default Spinner;
