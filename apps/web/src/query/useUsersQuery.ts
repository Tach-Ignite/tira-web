import {
  UserRole,
  UserTotalCountsType,
  UserType,
  UsersService,
  ChangePasswordPayloadType,
  UserProfileEntity,
  GetAllAdminConsoleUsersListsArgs,
  AdminConsoleUserResponseType,
  UpdateUserRoleDto,
  UpdateAnyUserDetailsArgs,
  UpdateUserProfileRoleArgs,
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

export const useGetCurrentUser = () => {
  const keys = [ApiKeysEnum.GetCurrentUserDetails];
  const fetchFn = async () => {
    const data = await UsersService.getCurrentUserDetails();
    return data;
  };
  return useBaseQuery<UserType>(keys, fetchFn);
};

export const useUpdateUserProfileRole = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UpdateUserProfileRoleArgs) => {
    const mutation = await UsersService.updateUserProfileRole(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetCurrentUserDetails],
  });
};

export const useGetUserProfile = () => {
  const keys = [ApiKeysEnum.GetCustomerUserProfile];
  const fetchFn = async () => {
    const data = await UsersService.getCustomerUserProfile();
    if (data?.error) {
      throw data;
    }
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

export const useGetAllAdminConsoleUsers = (
  request: GetAllAdminConsoleUsersListsArgs,
) => {
  const keys = [ApiKeysEnum.GetAllAdminConsoleUsers, request?.page, request];
  const fetchFn = async () => {
    const data = await UsersService.getAllAdminConsoleUsers(request);
    if (data.error) {
      throw data.error;
    }
    return data;
  };
  return useBaseQuery<Pagination<AdminConsoleUserResponseType>>(keys, fetchFn);
};

export const useGetSingleUser = (userId: string, orgId?: string) => {
  const keys = [ApiKeysEnum.GetSingleAdminConsoleUser, userId, orgId];
  const fetchFn = async () => {
    const data = await UsersService.getSingleUserRole(userId, orgId);
    return data;
  };
  return useBaseQuery<UserType>(keys, fetchFn);
};

export const useUpdateUserRole = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: UpdateUserRoleDto) => {
    const mutation = await UsersService.updateUserRole(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleAdminConsoleUser],
  });
};

export const useUpdateAnyUserDetailsAsAdmin = (
  request: UseBaseMutationConfig,
) => {
  const mutationFn = async (request: UpdateAnyUserDetailsArgs) => {
    const mutation = await UsersService.updateAnyUserAsAdmin(
      request?.userId,
      request.data,
    );
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [
      ApiKeysEnum.GetUser,
      ApiKeysEnum.GetSingleAdminConsoleUser,
    ],
  });
};

export const useRemoveUser = (request: UseBaseMutationConfig) => {
  const mutationFn = async (userId: string) => {
    const mutation = await UsersService.removeUser(userId);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetAllAdminConsoleUsers],
  });
};
