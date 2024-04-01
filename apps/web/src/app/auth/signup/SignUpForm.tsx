/* eslint-disable no-unused-vars */

import { AuthSubmitButton } from '@src/app/common/components';
import { FloatingInput, PasswordFloatingInput } from '@src/atoms/Input';
import { emailPattern } from '@src/lib/constants/validation';
import { LoginType } from '@src/types/modules';
import Link from 'next/link';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import AuthProviders from '../AuthProviders';

interface SignUpFormProps {
  createUserAsync: (data: LoginType) => Promise<any>;
  form: UseFormReturn<LoginType>;
  isSignUpPending: boolean;
}

interface SignUpFormType {
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm({
  createUserAsync,
  form,
  isSignUpPending,
}: SignUpFormProps) {
  const { control, handleSubmit } = form;

  const onSubmit = async (data: LoginType) => {
    await createUserAsync(data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div id="auth-form">
      <div className="font-semibold dark:text-white m-auto text-3xl leading-10">
        Sign Up
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
      <div className="mt-4 w-full">
        <PasswordFloatingInput control={control} />
      </div>
      <div className="mt-4 mb-4 w-full">
        <PasswordFloatingInput
          control={control}
          label="Confirm Password"
          onKeyDown={handleKeyDown}
          name="confirmPassword"
          isRequired
          rules={{
            validate: (value: string, formValues: SignUpFormType) => {
              const { password } = formValues || {};
              if (password !== value) {
                return 'Confirm password should match the above password';
              }
              return true;
            },
          }}
        />
      </div>
      <div className="text-black dark:text-white text-xs	!leading-[18px] mb-12">
        By signing up you agree to our{' '}
        <Link
          target="_blank"
          className="underline font-bold text-indigo-600 dark:text-yellow-400"
          href="/terms-and-conditions"
        >
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link
          target="_blank"
          className="underline font-bold text-indigo-600 dark:text-yellow-400"
          href="/privacy-policy"
        >
          Privacy Policy.
        </Link>
      </div>
      <AuthSubmitButton
        label="Sign Up"
        onSubmit={handleSubmit(onSubmit)}
        isPending={isSignUpPending}
      />
      <div className="text-sm mt-4 dark:text-white leading-4 flex gap-1 m-auto">
        Have an account?
        <Link
          href="/auth/login"
          className="font-bold text-indigo-600 dark:text-yellow-400 underline"
        >
          Sign In
        </Link>
      </div>
      <AuthProviders />
    </div>
  );
}

export default SignUpForm;
