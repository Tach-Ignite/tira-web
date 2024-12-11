'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';

import AppSpinner from '@components/appSpinner/AppSpinner';
import {
  AUTHENTICATION_COOKIE,
  CURRENT_USER_COOKIE,
} from '@services/auth-cookie';

function OAutCallback() {
  const router = useRouter();
  const params = useSearchParams();

  const token = params.get('token');
  const user = params.get('user');
  const redirect = params.get('redirect');

  useEffect(() => {
    setCookie(AUTHENTICATION_COOKIE, token);
    setCookie(CURRENT_USER_COOKIE, user);
    window ? (window.location.href = redirect || '') : null;
  }, [redirect, router, token, user]);

  return <AppSpinner show />;
}

export default OAutCallback;
