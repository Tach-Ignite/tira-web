/* eslint-disable no-unused-vars */
import { ApiResponse } from '@src/types/modules/apiResponseType';

export enum AdminNotificationTypeEnum {
  UserSignUp = 'User Sign Up',
  Inquiry = 'Inquiry',
  Inventory = 'Inventory',
  Return = 'Return',
  OrderStatusChanged = 'Order Status Changed',
  PasswordChanged = 'Password Changed',
  PasswordReset = 'Password Reset',
}

export interface AdminNotificationType {
  notificationId: string;
  message: string;
  read: boolean;
  data: any;
  type: AdminNotificationTypeEnum;
  createdAt: Date;
  updatedAt: Date;
}
export type AdminNotificationResponseType = ApiResponse<AdminNotificationType>;

export interface UpdateAdminNotificationArgs {
  notificationIds: string[];
}

export interface AdminNotificationsUnReadCount {
  unReadNotificationsCount: number;
}
