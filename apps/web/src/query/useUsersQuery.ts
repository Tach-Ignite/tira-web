import {
  UserRole,
  UserTotalCountsType,
  UserType,
  UsersService,
  ChangePasswordPayloadType,
  UserProfileEntity,
} from '@services';
import { Pagination, PaginationArgs } from '@src/types/modules/pagination';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllUsers = (request: PaginationArgs) => {
  const keys = [ApiKeysEnum.GetAllUsers, request];
  const fetchFn = async () => {
    const data = await UsersService.getAllUsers(request);
    return data;
  };
  return useBaseQuery<Pagination<UserType>>(keys, fetchFn);
};

export const useGetUser = (userId: string) => {
  const keys = [ApiKeysEnum.GetUser, userId];
  const fetchFn = async () => {
    const data = await UsersService.getSingleUser(userId);
    return data;
  };
  return useBaseQuery<UserType>(keys, fetchFn, { staleTime: 0 });
};

export const useGetUserProfile = () => {
  const keys = [ApiKeysEnum.GetCustomerUserProfile];
  const fetchFn = async () => {
    const data = await UsersService.getCustomerUserProfile();
    return data;
  };
  return useBaseQuery<{ data: UserProfileEntity }>(keys, fetchFn);
};

export const useGetAllRoles = () => {
  const keys = [ApiKeysEnum.GetRoles];
  const fetchFn = async () => {
    const data = await UsersService.getAllRoles();
    return data;
  };
  return useBaseQuery<UserRole[]>(keys, fetchFn);
};

export const useDeleteUser = (request: UseBaseMutationConfig) => {
  const mutationFn = async (userId: string) => {
    const mutation = await UsersService.deleteUser(userId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllUsers],
  });
};

export const useUpdateUser = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UserType) => {
    const mutation = await UsersService.updateUser(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllUsers],
  });
};

export const useUpdateUserProfile = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UserProfileEntity) => {
    const mutation = await UsersService.updateCustomerUserProfile(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetCustomerUserProfile],
  });
};

export const useGetTotalUsersCount = () => {
  const keys = [ApiKeysEnum.TotalUsersCount];
  const fetchFn = async () => {
    const data = await UsersService.getTotalUsersCount();
    return data;
  };
  return useBaseQuery<UserTotalCountsType>(keys, fetchFn, { staleTime: 0 });
};

export const useChangePassword = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: ChangePasswordPayloadType) => {
    const mutation = await UsersService.changePassword(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
  });
};
