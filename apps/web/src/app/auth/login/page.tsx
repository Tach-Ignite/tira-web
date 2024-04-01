'use client';

import React, { useEffect, useState } from 'react';
import { Checkbox } from '@src/flowbite';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { emailPattern } from '@src/lib/constants/validation';
import { AuthSubmitButton } from '@src/app/common/components';
import { useSignIn } from '@queries';
import { FloatingInput, PasswordFloatingInput } from '@src/atoms/Input';
import { LoginType, UserRoles } from '@src/types/modules';
import useLocalStorage from '@hooks/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminRoutes, CustomerRoutes } from '@src/routes';
import { useToast } from '@context/ToastContext';
import { removeQueryParam } from '@src/lib/functions';
import AuthProviders from '../AuthProviders';

function LoginInPage() {
  const { value: redirectUrl, removeValue } = useLocalStorage('redirect');
  const router = useRouter();
  const params = useSearchParams();
  const { showErrorToast, toasts } = useToast();

  const { control, handleSubmit } = useForm<LoginType>();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const error = params.get('error');

  const { mutateAsync: loginAsync } = useSignIn({
    onSuccessCallback: (response: any) => {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (response?.data?.role?.name === UserRoles.ADMIN) {
        router.push(AdminRoutes.Dashboard);
      } else {
        router.push(CustomerRoutes.Announcement);
      }
      removeValue();
    },
  });

  const handleLogin = async (data: LoginType) => {
    setIsLoading(true);
    const res = await loginAsync(data);
    if (res?.error) {
      setErrorMessage(res.error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (error && error === 'forbidden' && !toasts?.length) {
      showErrorToast({
        message: 'User Already Logged In Using different Auth method!',
      });
      removeQueryParam('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(handleLogin)();
    }
  };

  return (
    <div
      id="auth-form"
      className="flex flex-col rounded-lg sm:w-[427px] xs:w-[350px] bg-white dark:bg-gray-800 shadow-3xl p-6 sm:p-10 xs:p-8 xs:mx-5 mb-16"
    >
      <div className="font-semibold dark:text-white m-auto text-3xl leading-10">
        Sign In
      </div>
      <div className="w-full mt-6">
        <FloatingInput
          control={control}
          name="email"
          type="email"
          label="Email Address"
          rules={{
            pattern: emailPattern,
          }}
          isRequired
          errorMessage="Entered value does not match email format"
        />
      </div>
      <div className="mt-4 mb-[10px] w-full">
        <PasswordFloatingInput onKeyDown={handleKeyDown} control={control} />
      </div>
      <div className="flex justify-between items-center mb-10 flex-wrap">
        <div className="flex gap-2 items-center">
          <Checkbox color="gray" />
          <div className="text-gray-600 dark:text-white font-medium text-sm leading-3">
            Remember Me
          </div>
        </div>
        <Link
          className="text-indigo-700 dark:text-yellow-400 text-sm leading-4 underline"
          href="/auth/forgot-password"
        >
          Forgot Password?
        </Link>
      </div>
      <AuthSubmitButton
        label="Sign In"
        onSubmit={handleSubmit(handleLogin)}
        isPending={isLoading}
      />

      {errorMessage ? (
        <div className="text-sm mt-4 text-red-600">{errorMessage}</div>
      ) : null}
      <div className="text-sm mt-10 dark:text-white leading-5 flex flex-wrap gap-1 m-auto">
        Don’t have an account?
        <Link
          href="/auth/signup"
          className="font-semibold text-purple-700 dark:text-yellow-400 underline"
        >
          Sign Up
        </Link>
      </div>
      <AuthProviders isLoginPage />
    </div>
  );
}

export default LoginInPage;
