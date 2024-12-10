/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-unescaped-entities */

'use client';

import Link from 'next/link';
import { TachColorAuthPages } from '@src/routes';
import { EmailVerificationProps } from './types';

const maximumResendCount = 3;

function EmailVerification(props: EmailVerificationProps) {
  const {
    form,
    handleResendEmail,
    isSuccessFull = false,
    isResendPending = false,
    isForgotVerification = false,
    resendCount = 0,
  } = props;

  const { email } = form?.watch();

  const signupVerificationTitle = isSuccessFull
    ? 'Email Verification Successful'
    : 'Verify your email';

  const title = isForgotVerification
    ? 'Check your email'
    : signupVerificationTitle;

  const signupVerificationContent = isSuccessFull ? (
    'Congratulations! Your email has been successfully verified. You can now proceed to the login screen and start using your account.'
  ) : (
    <p>
      An email with verification instruction was sent to{' '}
      <span className="font-semibold dark:text-gray-100">{email}</span>. Please
      check your spam or promotions folder, as sometimes our emails can end up
      there.
    </p>
  );

  const content = isForgotVerification ? (
    <p>
      If <span className="font-semibold dark:text-gray-100">{email}</span> is
      registered, you will receive a password reset link shortly.
    </p>
  ) : (
    signupVerificationContent
  );

  return (
    <div className="bg-white text-black dark:text-gray-300 dark:bg-gray-800 max-w-lg rounded-lg w-fit p-8 m-auto shadow-xl">
      <div className="font-semibold m-auto text-3xl leading-10">{title}</div>
      <div className="my-7">{content}</div>
      {isSuccessFull || resendCount === maximumResendCount ? null : (
        <div className="flex gap-x-1 mb-5">
          <p> Didn't receive it?</p>
          <div
            onClick={isResendPending ? undefined : handleResendEmail}
            className="text-primary dark:text-info underline cursor-pointer dark:text-gray-100"
          >
            {isForgotVerification ? 'Resend Link' : 'Resend Verification'}
          </div>
        </div>
      )}
      <div className="bg-indigo-700 dark:bg-yellow-400  w-full text-center py-3 rounded-lg text-white dark:text-black">
        <Link href={TachColorAuthPages.Login}>
          {isSuccessFull || !isForgotVerification
            ? 'Sign In'
            : 'Back to Sign In'}
        </Link>
      </div>
    </div>
  );
}

export default EmailVerification;
