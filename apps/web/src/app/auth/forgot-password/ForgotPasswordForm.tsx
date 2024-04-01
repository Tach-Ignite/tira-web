'use client';

import { useForgotPassword } from '@queries';
import { AuthSubmitButton } from '@src/app/common/components';
import { FloatingInput } from '@src/atoms/Input';
import { emailPattern } from '@src/lib/constants/validation';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface ForgotFormType {
  email: string;
}

function ForgotPasswordForm() {
  const { control, handleSubmit } = useForm<ForgotFormType>({});
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword({
    successMessage: 'Password Reset Email Sent successfully.',
    failureMessage: true,
  });

  const handleForgot = (data: ForgotFormType) => {
    forgotPassword(data.email);
  };

  return (
    <>
      <div className="w-full my-6" id="auth-form">
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
      <AuthSubmitButton
        label="Submit"
        isPending={isPending}
        onSubmit={handleSubmit(handleForgot)}
      />
    </>
  );
}

export default ForgotPasswordForm;
