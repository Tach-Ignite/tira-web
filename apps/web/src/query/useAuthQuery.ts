'use client';

import { AuthService, UsersService } from '@services';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useSignup = (request: UseBaseMutationConfig) => {
  const mutationFn = async (data: any) => {
    const mutation = await UsersService.createUser(data);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
  });
};

export const useForgotPassword = (request: UseBaseMutationConfig) => {
  const mutationFn = async (email: string) => {
    const mutation = await UsersService.forgotPassword(email);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
  });
};

export const useResetPassword = (request: UseBaseMutationConfig) => {
  const mutationFn = async (payload: {
    userId: string;
    token: string;
    secret: string;
  }) => {
    const mutation = await UsersService.resetPassword(payload);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
  });
};

export const useResendEmail = (request: UseBaseMutationConfig) => {
  const mutationFn = async (email: string) => {
    const mutation = await UsersService.resendEmail(email);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
  });
};

export const useVerifyEmail = (request: UseBaseMutationConfig) => {
  const mutationFn = async (token: string) => {
    const mutation = await UsersService.verifyEmail(token);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
  });
};

export const useSignIn = (request: UseBaseMutationConfig) => {
  const mutationFn = async (data: any) => {
    const mutation = await AuthService.login(data);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
  });
};
