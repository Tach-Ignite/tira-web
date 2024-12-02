import {
  InviteEntity,
  InviteUserEntityArgs,
  InviteUserService,
} from '@services';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';

export const useInviteUser = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: InviteUserEntityArgs) => {
    const mutation = await InviteUserService.inviteUser(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
  });
};

export const useGetInvite = (inviteId: string, inviteCode: string) => {
  const keys = [ApiKeysEnum.GetInviteAndVerify, inviteId, inviteCode];
  const fetchFn = async () => {
    const data = await InviteUserService.getInviteAndVerify(
      inviteId,
      inviteCode,
    );
    return data;
  };
  return useBaseQuery<InviteEntity>(keys, fetchFn);
};
