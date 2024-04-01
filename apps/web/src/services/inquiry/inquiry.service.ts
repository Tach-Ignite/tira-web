'use server';

import { post, patch, get } from '@services/fetch';
import { validateCaptcha } from '@services/captcha/validateCaptcha';
import { GetAllInquiryArgs, InquiryEntity } from './inquiry.type';

export const getAllInquiries = async ({
  page,
  perPage,
  searchTerm,
}: GetAllInquiryArgs) =>
  get(`inquiry?page=${page}&perPage=${perPage}&searchTerm=${searchTerm}`);

export const getSingleInquiry = (inquiryId: string) =>
  get(`inquiry/${inquiryId}`);

export const createInquiry = async (
  data: InquiryEntity & { captchaToken: string },
) => {
  const { captchaToken } = data;
  if (!captchaToken) {
    return {
      error: {
        message: 'Captcha validation failed',
      },
    };
  }
  const validateResponse = await validateCaptcha(captchaToken);
  if (!validateResponse.success) {
    return {
      error: {
        message: 'Captcha validation failed',
      },
    };
  }
  return post('inquiries', {
    ...data,
  });
};

export const updateInquiry = async (data: InquiryEntity) =>
  patch(`inquiries/${data?.inquiryId}`, data);
