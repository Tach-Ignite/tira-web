/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Controller } from 'react-hook-form';
import { TextInput, Label } from '@src/flowbite';
import PasswordEndAdornment from '@components/PasswordEndAdornment';
import { UserTypeEnum } from '@src/types/modules/UserType';
import { useAuthContext } from '@context/AuthContext';
import ErrorLabel from './ErrorLabel';
import { PasswordInputProps } from './types';
import { getErrorMessage } from '../getErrorMessage';

function PasswordLabelInput(props: PasswordInputProps) {
  const {
    name,
    control,
    isRequired = true,
    label,
    rules,
    errorMessage,
    placeholder = 'Input text',
    showPassword,
    setShowPassword,
  } = props || {};

  const { authenticatedUser } = useAuthContext();

  const { userType } = authenticatedUser || {};

  const isLocalUser = userType === UserTypeEnum.LOCAL;

  return (
    <Controller
      name={name}
      control={control}
      key={name}
      rules={{
        required: isRequired,
        ...rules,
      }}
      render={({ field: { onChange, name, value }, formState: { errors } }) => {
        const errorInputName = errors[name];
        const message = getErrorMessage({
          errorInputName,
          errorMessage,
          label,
        });

        return (
          <div className="w-full flex flex-col gap-1">
            {label ? <Label>{label}</Label> : null}
            <div className="floating-input relative flex">
              <TextInput
                name={name}
                disabled={!isLocalUser}
                onChange={onChange}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                value={value}
                theme={{
                  field: {
                    icon: {
                      svg: 'text-gray-500 dark:text-gray-400',
                      base: 'cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3',
                    },
                    input: {
                      base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50 h-[38px]',
                      colors: {
                        gray: 'placeholder-text-gray-500 border-none	bg-indigo-50 text-gray-900 focus:border-none focus:ring-0 dark:border-solid dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-gray-600 dark:focus:ring-0',
                        failure:
                          'border-none bg-red-50 text-gray-900 placeholder-gray-400 focus:border-none focus:ring-0 dark:border-solid dark:border-red-400  dark:bg-gray-700 dark:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500',
                      },
                    },
                  },
                }}
                color={message ? 'failure' : 'gray'}
              />
              <div className="!absolute right-0 mr-3 mt-[10px] h-full">
                <PasswordEndAdornment
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                  isGrayTheme
                />
              </div>
            </div>
            <ErrorLabel message={message} />
          </div>
        );
      }}
    />
  );
}

export default PasswordLabelInput;
