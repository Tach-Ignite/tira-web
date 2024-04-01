/* eslint-disable no-unused-vars */
export enum InquiryStatus {
  Pending = 'Pending',
  Addressed = 'Addressed',
  Closed = 'Closed',
}

export interface GetAllInquiryArgs {
  page: number;
  perPage: number;
  searchTerm: string;
}

export interface InquiryEntity {
  inquiryId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isPolicyAccepted?: boolean;
  reason: string;
  status?: InquiryStatus;
}
