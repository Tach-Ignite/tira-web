/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */

import { SortOrderEnum } from '@src/types/modules';

export enum ServiceSortFields {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  SERVICE_NAME = 'serviceName',
  CATEGORY = 'category',
  PRICE = 'price',
}
export interface Category {
  categoryId: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ServicesEntity {
  serviceId?: string;
  companyName: string;
  friendlyId: string;
  serviceName: string;
  description: string;
  imageUrls: string[];
  price: number;
  msrp: number;
  saleStartDate: Date | string;
  saleEndDate: Date | string;
  duration: number;
  limitOfBookingsPerDay: number;
  categoryIds: string[];
  categories?: Category[];
  additionalDetails: string;
  adminNotes: string;
  weeklyHours: Record<string, any>;
  dateSpecificAvailability: Record<string, any>;
}

export enum ServicesSortFields {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  PRICE = 'salePrice',
  TITLE = 'title',
}

export interface GetAllServicesArgs {
  page: string;
  perPage: string;
  searchTerm: string;
  categoryIds?: string;
  minPrice?: string;
  maxPrice?: string;
  sortOrder?: SortOrderEnum;
  sortField?: ServiceSortFields;
}

export interface GetAllServiceArgs {
  page: number;
  perPage: number;
  searchTerm: string;
  categoryIds?: string;
  path?: string;
  minPrice?: string;
  maxPrice?: string;
  sortOrder?: SortOrderEnum;
  sortField?: ServicesSortFields;
}

export enum PageView {
  Admin = 'admin',
  Customer = 'customer',
}

export type ViewServiceProps = {
  pageView?: PageView;
};
