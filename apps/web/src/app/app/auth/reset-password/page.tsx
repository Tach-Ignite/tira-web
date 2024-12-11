'use client';

import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { useForm } from 'react-hook-form';
import { PasswordFloatingInput } from '@src/atoms';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginType } from '@src/types/modules';
import { useResetPassword } from '@queries';
import { TachColorAuthPages } from '@src/routes';
import {
  AUTHENTICATION_COOKIE,
  CURRENT_ORG_COOKIE,
  CURRENT_USER_COOKIE,
  CURRENT_USER_ROLE_COOKIE,
} from '@services/auth-cookie';
import { AuthSubmitButton } from '../components';

function ResetPasswordPage() {
  const params = useSearchParams();
  const token = params.get('token');
  const userId = params.get('userId');

  const { control, handleSubmit } = useForm<LoginType>({});
  const router = useRouter();

  const { mutateAsync: resetPassword, isPending } = useResetPassword({
    successMessage: 'Password Reset Successful.',
    failureMessage: true,
    onSuccessCallback: () => {
      router.push(TachColorAuthPages.Login);
    },
  });

  const handleResetPassword = (data: LoginType) => {
    resetPassword({
      secret: data.password,
      token: token || '',
      userId: userId || '',
    });
  };

  useEffect(() => {
    deleteCookie(CURRENT_USER_ROLE_COOKIE);
    deleteCookie(CURRENT_ORG_COOKIE);
    deleteCookie(AUTHENTICATION_COOKIE);
    deleteCookie(CURRENT_USER_COOKIE);
  }, []);

  return (
    <div className="md:px-10 px-5 flex justify-center ">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg w-full max-w-lg sm:!p-10 !p-5  md:gap-4 items-center">
        <div className="font-semibold dark:text-white text-3xl leading-10">
          Reset Password
        </div>
        <div className="space-y-6 mt-6" id="auth-form">
          <div>
            <PasswordFloatingInput control={control} />
          </div>
          <div>
            <PasswordFloatingInput
              control={control}
              label="Confirm Password"
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
          <AuthSubmitButton
            label="Submit"
            isPending={isPending}
            onSubmit={handleSubmit(handleResetPassword)}
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
