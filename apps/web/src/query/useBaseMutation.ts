/* eslint-disable no-unused-vars */
import {
  useMutation,
  UseMutationResult,
  MutationFunction,
  UseMutationOptions,
  useQueryClient,
  QueryKey,
} from '@tanstack/react-query';

import { useToast } from '@context/ToastContext';

export type UseBaseMutationConfig = {
  successMessage?: string | boolean;
  failureMessage?: string | boolean;
  invalidateQueries?: QueryKey;
  onSuccessCallback?: (response: any, request: any) => void;
  onErrorCallback?: (error: unknown) => void;
};

export default function useBaseMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  config?: UseBaseMutationConfig,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  >,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const cache = useQueryClient();
  const { showErrorToast, showSuccessToast } = useToast();
  const {
    successMessage,
    failureMessage,
    invalidateQueries,
    onSuccessCallback,
    onErrorCallback,
  } = config || {};

  return useMutation({
    mutationFn,
    onSuccess: (response: any, request: any) => {
      if (response?.error) {
        if (failureMessage) {
          showErrorToast({
            message:
              typeof failureMessage === 'string'
                ? failureMessage
                : response.error?.message || response.error,
          });
        }
        onErrorCallback?.(response.error);
      } else {
        if (invalidateQueries) {
          invalidateQueries.forEach((key) => {
            cache.invalidateQueries({ queryKey: [key] });
          });
        }
        if (successMessage) {
          showSuccessToast({
            message:
              typeof successMessage === 'string'
                ? successMessage
                : response?.message || 'Changes have been saved!',
          });
        }
        onSuccessCallback?.(response, request);
      }
    },
    ...options,
  });
}
