'use client';

import { useForm } from 'react-hook-form';
import { LoginType } from '@src/types/modules';
import { useResendEmail, useSignup, useVerifyEmail } from '@queries';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthPage, EmailVerification } from '../components';

function SignUpPage() {
  const signupForm = useForm<LoginType>({ mode: 'all' });

  const params = useSearchParams();
  const inviteId = params.get('inviteId') || ('' as string);
  const inviteCode = params.get('code') || ('' as string);
  const token = params.get('token');

  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const { watch } = signupForm;

  const { email } = watch();

  const { mutateAsync: createUserAsync, isPending: isSignUpPending } =
    useSignup({
      failureMessage: true,
      onSuccessCallback: () => {
        setShowEmailVerification(true);
      },
    });

  const { mutateAsync: verifyEmail } = useVerifyEmail({
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
    setResendCount((prevCount) => prevCount + 1);
  };

  const onSubmit = async (data: LoginType) => {
    const { email, password } = data;

    await createUserAsync({
      email,
      password,
      ...(inviteId && inviteCode
        ? {
            inviteId,
            inviteCode,
          }
        : {}),
    });
  };

  return showEmailVerification ? (
    <EmailVerification
      form={signupForm}
      handleResendEmail={handleResendEmail}
      resendCount={resendCount}
      isResendPending={isResendPending}
    />
  ) : (
    <AuthPage
      form={signupForm}
      onSubmit={onSubmit}
      isPending={isSignUpPending}
    />
  );
}

export default SignUpPage;
