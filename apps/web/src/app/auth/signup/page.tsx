'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import EmailVerification from '@components/emailVerification/EmailVerification';
import AppSpinner from '@components/appSpinner/AppSpinner';
import { useResendEmail, useSignup, useVerifyEmail } from '@queries';
import { LoginType } from '../../../types/modules';
import SignUpForm from './SignUpForm';

function SignUpPage() {
  const params = useSearchParams();
  const token = params.get('token');
  const form = useForm<LoginType>();
  const { watch } = form;
  const email = watch('email');

  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);

  const { mutateAsync: createUserAsync, isPending: isSignUpPending } =
    useSignup({
      failureMessage: true,
      onSuccessCallback: () => {
        setShowEmailVerification(true);
      },
    });

  const { mutateAsync: verifyEmail, isPending } = useVerifyEmail({
    failureMessage: 'Email verification failed',
    onSuccessCallback: () => {
      setShowEmailVerification(true);
      setShowVerificationSuccess(true);
    },
  });

  const { mutateAsync: resendEmail, isPending: isResendPending } =
    useResendEmail({
      failureMessage: 'Email Resend failed',
      successMessage: 'Email Resend Success',
    });

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  const handleResendEmail = () => {
    resendEmail(email);
  };

  const renderContent = () => {
    if (showEmailVerification) {
      return (
        <EmailVerification
          onResendEmailVerification={handleResendEmail}
          page={showVerificationSuccess ? 'verified' : 'requested'}
        />
      );
    }
    return (
      <SignUpForm
        form={form}
        createUserAsync={createUserAsync}
        isSignUpPending={isSignUpPending}
      />
    );
  };

  if (isPending || isResendPending) {
    return <AppSpinner show={isPending} className="h-20 w-20" />;
  }

  return (
    <div className="flex flex-col rounded-lg sm:w-[427px] xs:w-[350px] bg-white dark:bg-gray-800 shadow-3xl p-6 sm:p-10 xs:p-8 xs:mx-5 mb-16">
      {renderContent()}
    </div>
  );
}

export default SignUpPage;
