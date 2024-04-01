'use client';

import PasswordEndAdornment from '@components/PasswordEndAdornment';
import { passwordComplexityPattern } from '@src/lib/constants/validation';
import { useState } from 'react';
import { PasswordFloatingInputProps } from './types';
import FloatingInput from './FloatingInput';

function PasswordFloatingInput({
  control,
  label = 'Password',
  name = 'password',
  isRequired = true,
  onKeyDown,
  rules = {
    pattern: passwordComplexityPattern,
  },
  errorMessage = 'Password should contain atleast 8 characters, one number and one special character',
}: PasswordFloatingInputProps) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <FloatingInput
      control={control}
      label={label}
      name={name}
      onKeyDown={onKeyDown}
      isRequired={isRequired}
      type={showPassword ? 'password' : 'text'}
      endAdornment={
        <PasswordEndAdornment
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />
      }
      rules={rules}
      errorMessage={errorMessage}
    />
  );
}

export default PasswordFloatingInput;
