'use client';

import { useForm } from 'react-hook-form';
import { PasswordFloatingInput } from '@src/atoms';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthSubmitButton } from '@src/app/common/components';
import { useResetPassword } from '@queries';
import { AuthPages } from '@src/routes';

interface ResetFormType {
  password: string;
  confirmPassword: string;
}

function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get('token');
  const userId = params.get('userId');

  const { control, handleSubmit } = useForm<ResetFormType>({});
  const router = useRouter();

  const { mutateAsync: resetPassword, isPending } = useResetPassword({
    successMessage: 'Password Reset Successful.',
    failureMessage: true,
    onSuccessCallback: () => {
      router.push(AuthPages.Login);
    },
  });

  const handleResetPassword = (data: ResetFormType) => {
    resetPassword({
      secret: data.password,
      token: token || '',
      userId: userId || '',
    });
  };

  return (
    <div className="flex flex-col gap-6 mt-6" id="auth-form">
      <PasswordFloatingInput control={control} />
      <PasswordFloatingInput
        control={control}
        label="Confirm Password"
        name="confirmPassword"
        isRequired
        rules={{
          validate: (value: string, formValues: ResetFormType) => {
            const { password } = formValues || {};
            if (password !== value) {
              return 'Confirm password should match the above password';
            }
            return true;
          },
        }}
      />
      <AuthSubmitButton
        label="Submit"
        isPending={isPending}
        onSubmit={handleSubmit(handleResetPassword)}
      />
    </div>
  );
}

export default ResetPasswordForm;
