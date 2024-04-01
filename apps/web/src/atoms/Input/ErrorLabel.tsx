'use client';

import { WarningCircleIcon } from '@src/icons';
import { ErrorLabelProps } from './types';

function ErrorLabel(props: ErrorLabelProps) {
  const { message } = props || {};

  return (
    <div>
      {message ? (
        <div className="text-red-600 flex gap-1 items-center dark:text-red-400 text-xs leading-3">
          <WarningCircleIcon />
          <div className="mt-[2px]">{message}</div>
        </div>
      ) : null}
    </div>
  );
}

export default ErrorLabel;
