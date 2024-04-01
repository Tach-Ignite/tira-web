import { cookies } from 'next/headers';
import { get } from '@services/fetch';
import { AUTHENTICATION_COOKIE } from './auth-cookie';

export default async function authenticated() {
  if (cookies().get(AUTHENTICATION_COOKIE)?.value) {
    const res = await get('users/validateMe');
    if (res.message === 'Success') {
      return true;
    }
  }
  return false;
}
