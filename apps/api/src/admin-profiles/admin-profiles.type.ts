import { NotificationScheduleEnum } from '@prisma/client';

export interface CreateUpdateAdminProfileArgs {
  userId: string;
  email?: string;
  phone?: string;
  orderCancelEmail?: boolean;
  orderCancelSms?: boolean;
  lowInventoryEmail?: boolean;
  lowInventorySms?: boolean;
  orderCancelEmailSchedule?: NotificationScheduleEnum;
  orderCancelSmsSchedule?: NotificationScheduleEnum;
  lowInventoryEmailSchedule?: NotificationScheduleEnum;
  lowInventorySmsSchedule?: NotificationScheduleEnum;
}
