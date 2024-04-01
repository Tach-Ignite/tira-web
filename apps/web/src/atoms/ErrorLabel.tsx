'use client';

import { ErrorLabelProps } from './types';

function ErrorLabel(props: ErrorLabelProps) {
  const { message } = props || {};

  return message ? (
    <div className="!text-red20 text-start text-sm leading-3">{message}</div>
  ) : null;
}

export default ErrorLabel;
