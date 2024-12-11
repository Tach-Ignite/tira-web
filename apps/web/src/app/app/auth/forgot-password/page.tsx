'use client';

import { LabelInput } from '@src/atoms';
import { emailPattern } from '@src/lib/constants/validation';
import { useForm } from 'react-hook-form';
import { useForgotPassword } from '@queries';
import { LoginType } from '@src/types/modules';
import { useState } from 'react';
import { AuthSubmitButton, EmailVerification } from '../components';

function ForgotPassword() {
  const resetForm = useForm<LoginType>({ mode: 'all' });
  const { control, handleSubmit, watch } = resetForm;
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const { mutateAsync: forgotPassword, isPending } = useForgotPassword({
    successMessage: 'Password Reset Email Sent successfully.',
    failureMessage: true,
    onSuccessCallback: () => {
      setShowEmailVerification(true);
    },
  });

  const { email } = watch();

  const handleForgot = (data: LoginType) => {
    forgotPassword(data.email);
  };

  const onResendEmailVerification = () => {
    forgotPassword(email);
    setResendCount((prevCount) => prevCount + 1);
  };

  return showEmailVerification ? (
    <EmailVerification
      form={resetForm}
      handleResendEmail={onResendEmailVerification}
      resendCount={resendCount}
      isResendPending={isPending}
      isForgotVerification
    />
  ) : (
    <div className="md:px-10 px-5 flex justify-center ">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg w-full max-w-lg sm:!p-10 !p-5  md:gap-4 items-center">
        <div className="font-semibold dark:text-white text-3xl leading-10">
          Forgot Password
        </div>
        <div className="space-y-4 mt-8 mb-5">
          <p className="dark:text-gray-50">
            Enter the email you use to sign up
          </p>
          <LabelInput
            control={control}
            name="email"
            rules={{
              pattern: emailPattern,
            }}
            errorLabel="Email"
            isRequired
            errorMessage="Entered value does not match email format"
          />
        </div>
        <AuthSubmitButton
          isPending={isPending}
          label="Submit"
          onSubmit={handleSubmit(handleForgot)}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
