'use server';

import { get, patch } from '@services/fetch';
import { InviteUserEntityArgs } from './inviteUser.type';

export const inviteUser = async (data: InviteUserEntityArgs) =>
  patch('invites', data);

export const getInviteAndVerify = async (
  inviteId: string,
  inviteCode: string,
) => {
  const inviteData = await get(`invites/verify/${inviteId}/${inviteCode}`);
  return inviteData;
};
