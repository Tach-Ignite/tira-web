'use client';

import { useForm } from 'react-hook-form';
import { LoginType, UserRoles } from '@src/types/modules';
import { useEffect, useState } from 'react';
import { useSignIn } from '@queries';
import useLocalStorage from '@hooks/useLocalStorage';
import { useToast } from '@context/ToastContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCustomerUserProfile } from '@services/users/users.service';
import { removeQueryParam } from '@src/lib/functions';
import { AdminConsoleRoutes, CustomerRoutes } from '@src/routes';
import { AuthPage } from '../components';

function TachColorLoginPage() {
  const { value: redirectUrl, removeValue } = useLocalStorage('redirect');
  const router = useRouter();
  const params = useSearchParams();
  const { showErrorToast, toasts } = useToast();

  const loginForm = useForm<LoginType>({ mode: 'all' });
  const [isLoading, setIsLoading] = useState(false);

  const error = params.get('error');

  const { mutateAsync: loginAsync } = useSignIn({
    onSuccessCallback: async (response: any) => {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (response?.data?.role?.name === UserRoles.SuperAdmin) {
        router.push(AdminConsoleRoutes.Overview);
      } else {
        const data = await getCustomerUserProfile();
        if (data?.data?.onboardingCompleted) {
          router.push(CustomerRoutes.Announcement);
        } else {
          router.push(CustomerRoutes.Onboarding);
        }
      }
      removeValue();
    },
  });

  useEffect(() => {
    if (error && error === 'forbidden' && !toasts?.length) {
      showErrorToast({
        message: 'User Already Logged In Using different Auth method!',
      });
      removeQueryParam('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (data: LoginType) => {
    setIsLoading(true);
    const res = await loginAsync(data);
    if (res?.error) {
      showErrorToast({ message: res.error });
      setIsLoading(false);
    }
  };

  return (
    <AuthPage
      isLoginPage
      form={loginForm}
      onSubmit={handleLogin}
      isPending={isLoading}
    />
  );
}

export default TachColorLoginPage;
