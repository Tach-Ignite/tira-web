'use client';

import { Spinner } from '@src/flowbite';

function LayoutSpinner() {
  return (
    <div className="text-center h-full content-center m-auto overflow-hidden">
      <Spinner
        size="xl"
        color="info"
        theme={{
          base: 'inline animate-spin text-gray-400',
          color: { info: 'fill-indigo-700 dark:fill-yellow-400' },
        }}
      />
    </div>
  );
}

export default LayoutSpinner;
