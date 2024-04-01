import React from 'react';
import { Button } from '@src/atoms';
import { useRouter } from 'next/navigation';
import { EmailVerificationProps } from './type';

function EmailVerification({
  onResendEmailVerification,
  page = 'requested',
}: EmailVerificationProps) {
  const router = useRouter();

  const navigateToLogins = () => {
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      {page === 'requested' ? (
        <>
          <div className="font-semibold dark:text-yellow-400 m-auto text-3xl text-indigo-700  leading-10">
            Success
          </div>
          <p className="dark:text-white">
            We have successfully created your new account. But before you start
            you will have to activate it. We have sent an activation mail to the
            email you provided during registration. It should arrive in a couple
            of minutes
          </p>
          <p className="dark:text-white">
            IF the email has not arrived during 30s you can still click the
            button below to resend it. We guarantee it will come this time!
          </p>
          <Button
            fullSized
            className="dark:bg-yellow-400"
            theme={{
              base: 'p-4',
              inner: {
                base: 'flex justify-center',
              },
              size: { md: 'text-base leading-6 font-bold' },
            }}
            onClick={onResendEmailVerification}
          >
            Re-send the verification email
          </Button>
        </>
      ) : (
        <>
          <div className="font-semibold dark:text-yellow-400 m-auto text-3xl text-indigo-700   leading-10">
            Email Verification Successful
          </div>
          <p className="dark:text-white">
            Congratulations! Your email has been successfully verified. You can
            now proceed to the login screen and start using your account.
          </p>
          <Button
            fullSized
            className="dark:bg-yellow-400"
            theme={{
              base: 'p-4',
              inner: {
                base: 'flex justify-center',
              },
              size: { md: 'text-base leading-6 font-bold' },
            }}
            onClick={navigateToLogins}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
}

export default EmailVerification;
