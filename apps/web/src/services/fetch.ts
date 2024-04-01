import { cookies } from 'next/headers';
import fetch from 'node-fetch';
import { API_URL, STRAPI_CMS_API_URL } from '@src/app/common/constants/api';
import { getErrorMessage } from './errors';

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, formData: any, headers?: any) => {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getHeaders(),
        ...headers,
      },
      body: JSON.stringify(formData),
    });
    const parsedRes = await res.json();
    if (!res.ok) {
      return getErrorMessage(parsedRes);
    }
    return parsedRes;
  } catch (error) {
    return getErrorMessage(error);
  }
};

export const patch = async (path: string, formData: any) => {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getHeaders() },
      body: JSON.stringify(formData),
    });
    const parsedRes = await res.json();

    if (!res.ok) {
      return getErrorMessage(parsedRes);
    }
    return parsedRes;
  } catch (error: any) {
    return getErrorMessage(error);
  }
};

export const get = async (path: string) => {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      headers: { ...getHeaders() },
    });
    const parsedRes = await res.json();

    if (!res.ok) {
      return getErrorMessage(parsedRes);
    }
    return parsedRes;
  } catch (error) {
    return getErrorMessage(error);
  }
};

export const remove = async (path: string) => {
  try {
    const res = await fetch(`${API_URL}/${path}`, {
      method: 'DELETE',
      headers: { ...getHeaders() },
    });
    const parsedRes = await res.json();

    if (!res.ok) {
      return getErrorMessage(parsedRes);
    }
    return parsedRes;
  } catch (error) {
    return getErrorMessage(error);
  }
};

export const cmsGet = async (path: string) => {
  try {
    const res = await fetch(`${STRAPI_CMS_API_URL}/${path}`, {
      headers: { ...getHeaders() },
      method: 'GET',
    });
    const parsedRes = await res.json();

    if (!res.ok) {
      return getErrorMessage(parsedRes);
    }
    return parsedRes;
  } catch (error) {
    return getErrorMessage(error);
  }
};
