'use client';

import AuthProviders from '@src/app/app/auth/components/AuthProviders';
import { FloatingInput, PasswordFloatingInput } from '@src/atoms';
import { emailPattern } from '@src/lib/constants/validation';
import { LoginType } from '@src/types/modules';
import Link from 'next/link';
import { Checkbox } from '@src/flowbite';
import { TachColorAuthPages } from '@src/routes';
import AuthSubmitButton from './AuthSubmitButton';
import { AuthPageProps } from './types';

function AuthPageLayout(props: AuthPageProps) {
  const { form, onSubmit, isLoginPage, isPending } = props;

  const { control, handleSubmit } = form;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div
      id="auth-form"
      className="md:px-10 px-5 flex items-center justify-center"
    >
      <div className="bg-white shadow-3xl border border-gray-300 dark:border-none dark:bg-gray-800 rounded-lg w-full max-w-5xl p-8 items-center">
        <div className="font-semibold text-2xl leading-9 text-black mb-3 dark:text-white text-center">
          {isLoginPage ? 'Sign In' : 'Sign Up'}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
          {isLoginPage ? `Don't have an acccount?` : 'Have an account?'}{' '}
          <Link
            href={
              isLoginPage ? TachColorAuthPages.SignUp : TachColorAuthPages.Login
            }
            className="text-primary underline"
          >
            {isLoginPage ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>{' '}
        <div className="md:flex md:gap-4 mt-12">
          <div className="flex-1 md:py-10 py-5">
            <div className="w-full">
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
              <PasswordFloatingInput
                control={control}
                onKeyDown={isLoginPage ? handleKeyDown : undefined}
              />
            </div>
            {isLoginPage ? (
              <div className="my-5 mb-6 flex justify-between items-center flex-wrap">
                <div className="flex gap-2 items-center">
                  <Checkbox color="gray" />
                  <div className="text-gray-600 dark:text-white font-medium text-sm leading-3">
                    Remember Me
                  </div>
                </div>
                <Link
                  className="text-indigo-700 dark:text-yellow-400 text-sm leading-4 underline"
                  href={TachColorAuthPages.ForgotPassword}
                >
                  Forgot Password?
                </Link>
              </div>
            ) : (
              <div className="my-4 w-full">
                <PasswordFloatingInput
                  control={control}
                  label="Confirm Password"
                  onKeyDown={handleKeyDown}
                  name="confirmPassword"
                  isRequired
                  rules={{
                    validate: (value: string, formValues: LoginType) => {
                      const { password } = formValues || {};
                      if (password !== value) {
                        return 'Confirm password should match the above password';
                      }
                      return true;
                    },
                  }}
                />
              </div>
            )}
            <AuthSubmitButton
              label={isLoginPage ? 'Sign In' : 'Sign Up'}
              onSubmit={handleSubmit(onSubmit)}
              isPending={isPending}
            />

            {isLoginPage ? null : (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                By signing up you agree to our{' '}
                <Link
                  target="_blank"
                  className="underline text-indigo-600 dark:text-yellow-400"
                  href="/terms-and-conditions"
                >
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link
                  target="_blank"
                  className="underline text-indigo-600 dark:text-yellow-400"
                  href="/privacy-policy"
                >
                  Privacy Policy.
                </Link>
                .
              </p>
            )}
          </div>

          <div className="!hidden md:!flex flex-col items-center mx-4">
            <div className="h-full border-l border-gray-300 dark:border-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 mx-2">or</p>
            <div className="h-full border-l border-gray-300 dark:border-gray-600" />
          </div>

          <div className="md:!hidden !flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            <div className="mx-3 text-sm text-gray-500 dark:text-gray-400">
              or
            </div>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          </div>
          <div className="flex-1 space-y-4 m-auto md:pt-0 pt-4">
            <AuthProviders isLoginPage={isLoginPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPageLayout;
