'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTHENTICATION_COOKIE, CURRENT_USER_COOKIE } from './auth-cookie';

export default async function logout() {
  cookies().delete(AUTHENTICATION_COOKIE);
  cookies().delete(CURRENT_USER_COOKIE);
  redirect('/auth/login');
}
