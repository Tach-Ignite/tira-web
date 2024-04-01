'use server';

import { ApiResponse } from '@src/types/modules/apiResponseType';
import { Pagination, PaginationArgs } from '@src/types/modules/pagination';
import { get, patch } from '@services/fetch';
import {
  AdminNotificationType,
  AdminNotificationsUnReadCount,
  UpdateAdminNotificationArgs,
} from './admin-notifications.type';

export const fetchAdminNotifications = async ({
  page,
  perPage,
}: PaginationArgs): Promise<ApiResponse<Pagination<AdminNotificationType>>> => {
  let query = `admin-notifications?page=${page}`;
  if (perPage) {
    query += `&perPage=${perPage}`;
  }
  return get(query);
};

export const getAllUnreadNotificationCount = async (): Promise<
  ApiResponse<AdminNotificationsUnReadCount>
> => get(`admin-notifications/unread-count`);

export const updateAdminNotification = async ({
  notificationIds,
}: UpdateAdminNotificationArgs) =>
  patch(`admin-notifications`, { notificationIds });
