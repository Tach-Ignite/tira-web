'use server';

import { post, get } from '@services/fetch';
import { AdminProfileEntity } from './adminProfile.type';

export const getAdminProfile = () => get('admin-profiles');

export const updateAdminProfile = async (data: AdminProfileEntity) =>
  post('admin-profiles', data);
