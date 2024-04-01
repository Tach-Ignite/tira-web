/* eslint-disable no-unused-vars */
export enum NotificationScheduleEnum {
  Daily = 'Daily',
  Instantly = 'Instantly',
}

export interface AdminProfileEntity {
  userId: string;
  email?: string;
  adminProfileId?: string;
  phone?: string;
  orderCancelEmail?: boolean;
  orderCancelSms?: boolean;
  lowInventoryEmail?: boolean;
  lowInventorySms?: boolean;
  orderCancelSmsSchedule?: NotificationScheduleEnum;
  orderCancelEmailSchedule?: NotificationScheduleEnum;
  lowInventoryEmailSchedule?: NotificationScheduleEnum;
  lowInventorySmsSchedule?: NotificationScheduleEnum;
}
