/* eslint-disable no-unused-vars */

import { useAuthContext } from '@context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@context/ToastContext';
import useLocalStorage from './useLocalStorage';

function useAuthenticatedNavigation() {
  const { isAuthenticated } = useAuthContext();
  const { showWarningToast } = useToast();
  const { setValue } = useLocalStorage('redirect');
  const router = useRouter();
  const pathname = usePathname();
  const onClickHandler = (callback?: (event: any) => void) => (event: any) => {
    event?.stopPropagation?.();
    event?.preventDefault?.();
    if (isAuthenticated) {
      callback?.(event);
    } else {
      showWarningToast({
        message: 'Please log in to add items to your favorites or cart',
        duration: 10000,
      });
      setValue(pathname);
      router.push(`/tach-color-shop/auth/login`);
    }
  };
  return onClickHandler;
}

export default useAuthenticatedNavigation;
