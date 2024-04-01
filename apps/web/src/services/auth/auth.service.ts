'use server';

import { cookies } from 'next/headers';
import fetch, { Response } from 'node-fetch';
import { LoginType } from '@src/types/modules';

import {
  AUTHENTICATION_COOKIE,
  CURRENT_USER_COOKIE,
} from '@services/auth-cookie';
import { API_URL } from '@src/app/common/constants/api';
import { getErrorMessage } from '@services/errors';
import { UserType } from '../users/users.type';

export const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get('Set-Cookie');
  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1];
    cookies().set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
    });
  }
};

export const setUserCookie = (user: UserType) => {
  cookies().set({
    name: CURRENT_USER_COOKIE,
    value: JSON.stringify(user),
  });
};

export async function login(formData: LoginType) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(formData),
    });
    const parsedRes = await res?.json?.();
    if (!res.ok) {
      return getErrorMessage(parsedRes);
    }
    setAuthCookie(res as Response);
    setUserCookie(parsedRes?.data);
    return parsedRes;
  } catch (error) {
    return getErrorMessage(error);
  }
}
