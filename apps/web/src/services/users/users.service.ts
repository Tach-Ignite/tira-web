'use server';

import { PaginationArgs } from '@src/types/modules/pagination';
import { remove, patch, post, get } from '@services/fetch';
import {
  UserType,
  UserProfileType,
  ChangePasswordPayloadType,
  UserProfileEntity,
} from './users.type';

export const getAllUsers = async ({
  page,
  perPage,
  searchTerm,
}: PaginationArgs) =>
  get(`users?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`);

export const getAllRoles = async () => get(`user-roles`);

export const deleteUser = (userId?: string) => remove(`users/${userId}`);

export const getSingleUser = async (userId: string) => get(`users/${userId}`);

export const getProfileUser = async () => get('user/profile');

export const getCustomerUserProfile = async () => get('user-profiles');

export const updateCustomerUserProfile = async (data: UserProfileEntity) =>
  patch('user-profiles', data);

export const updateUser = async (data: UserType) =>
  patch(`users/${data?.userId}`, data);

export const updateUserProfile = async (data: UserProfileType) =>
  patch('user/profile', data);

export const getTotalUsersCount = async () => get('users/total-users-count');

export const verifyEmail = async (token: string) =>
  post(`auth/verify-email`, {}, { authorization: `Bearer ${token}` });

export const resendEmail = async (email: string) =>
  post(`auth/resend-email`, { email });

export const createUser = async (createUser: any) =>
  post('auth/sign-up', {
    email: createUser.email,
    password: createUser.password,
  });

export const forgotPassword = async (email: string) =>
  post('auth/forgot-password', {
    email,
  });

export const resetPassword = async (payload: {
  userId: string;
  token: string;
  secret: string;
}) =>
  post(
    'auth/reset-password',
    {
      userId: payload.userId,
      token: payload.token,
      password: payload.secret,
    },
    { authorization: `Bearer ${payload.token}` },
  );

export const changePassword = async (request: ChangePasswordPayloadType) =>
  post('user/change-password', request);
