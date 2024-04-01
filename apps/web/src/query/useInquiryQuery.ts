import { GetAllInquiryArgs, InquiryEntity, InquiryService } from '@services';
import { Pagination } from '@src/types/modules/pagination';
import { ApiKeysEnum } from './apiKeys';
import useBaseQuery from './useBaseQuery';
import useBaseMutation, { UseBaseMutationConfig } from './useBaseMutation';

export const useGetAllInquiries = (request: GetAllInquiryArgs) => {
  const keys = [ApiKeysEnum.GetAllInquiries, request.page, request];
  const fetchFn = async () => {
    const data = await InquiryService.getAllInquiries(request);
    return data;
  };
  return useBaseQuery<Pagination<InquiryEntity>>(keys, fetchFn);
};

export const useGetSingleInquiry = (inquiryId: string) => {
  const keys = [ApiKeysEnum.GetSingleInquiry, inquiryId];
  const fetchFn = async () => {
    const data = await InquiryService.getSingleInquiry(inquiryId);
    return data;
  };
  return useBaseQuery<InquiryEntity>(keys, fetchFn);
};

export const useCreateInquiry = (request: UseBaseMutationConfig) => {
  const mutationFn = async (
    request: InquiryEntity & { captchaToken: string },
  ) => {
    const mutation = await InquiryService.createInquiry(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleInquiry],
  });
};

export const useUpdateInquiry = (request: UseBaseMutationConfig) => {
  const mutationFn = async (request: InquiryEntity) => {
    const mutation = await InquiryService.updateInquiry(request);
    return mutation;
  };
  return useBaseMutation(mutationFn, {
    ...request,
    invalidateQueries: [ApiKeysEnum.GetSingleInquiry],
  });
};
