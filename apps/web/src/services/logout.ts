'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  AUTHENTICATION_COOKIE,
  CURRENT_ORG_COOKIE,
  CURRENT_USER_COOKIE,
  CURRENT_USER_ROLE_COOKIE,
} from './auth-cookie';

export default async function logout() {
  cookies().delete(AUTHENTICATION_COOKIE);
  cookies().delete(CURRENT_USER_COOKIE);
  cookies().delete(CURRENT_USER_ROLE_COOKIE);
  cookies().delete(CURRENT_ORG_COOKIE);
  redirect('/tach-color-shop/auth/login');
}
