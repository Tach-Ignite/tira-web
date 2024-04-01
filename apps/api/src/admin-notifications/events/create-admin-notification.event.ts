import { AdminNotificationEnum } from '@prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';

export class CreateAdminNotificationEvent {
  message: string;
  type: AdminNotificationEnum;
  data: JsonObject;
}
