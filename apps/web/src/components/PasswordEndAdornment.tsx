/* eslint-disable react/require-default-props */

'use client';

import { EyeFillIcon, EyeSlashIcon } from '@src/icons';

function PasswordEndAdornment({
  showPassword,
  setShowPassword,
  isGrayTheme = false,
}: {
  showPassword: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowPassword: (showPassword: boolean) => void;
  isGrayTheme?: boolean;
}) {
  const onHandleEyeIcon = () => {
    setShowPassword(!showPassword);
  };

  const className = isGrayTheme
    ? 'cursor-pointer text-gray-500 dark:text-gray-400'
    : 'cursor-pointer h-5 w-5 text-purple-700 dark:text-yellow-400';

  return showPassword ? (
    <EyeSlashIcon className={className} onClick={onHandleEyeIcon} />
  ) : (
    <EyeFillIcon className={className} onClick={onHandleEyeIcon} />
  );
}

export default PasswordEndAdornment;
