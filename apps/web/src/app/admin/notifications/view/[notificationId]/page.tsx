'use client';

import { useGetAllNotifications } from '@queries';
import { AdminNotificationTypeEnum } from '@services';
import { Badge } from '@src/flowbite';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NotificationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
}

interface Notification {
  notificationId: string;
  type: AdminNotificationTypeEnum;
  message: string;
  data: NotificationData;
}

function ViewNotification() {
  const { notificationId } = useParams() || {};
  const [notification, setNotification] = useState<Partial<Notification>>({});

  const { data: { data: { data = [] } = {} } = {} } = useGetAllNotifications({
    page: 1,
    perPage: 10,
  });

  const getBadgeColor = (type: AdminNotificationTypeEnum) =>
    type === AdminNotificationTypeEnum.Inquiry ||
    type === AdminNotificationTypeEnum.Inventory
      ? 'warning'
      : 'info';

  useEffect(() => {
    const filteredNotification =
      data.find((obj) => obj.notificationId === notificationId) || {};
    setNotification(filteredNotification);
  }, [notificationId, data]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl pt-6 pb-8 pl-6 pr-8 rounded-2xl">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex gap-6 flex-col lg:flex-row lg:items-center mb-8">
            <p className="font-bold flex gap-1 text-sm lg:text-xl lg:leading-[30px] text-black dark:text-gray-50">
              <span>Notification</span>
              <span>#{notificationId}</span>
            </p>
            <div className="flex gap-6 lg:items-center flex-wrap">
              <Badge
                size="sm"
                color={getBadgeColor(
                  notification.type as AdminNotificationTypeEnum,
                )}
                className="min-w-max"
                theme={{
                  icon: { off: 'rounded-md px-2.5 py-0.5' },
                  root: {
                    color: {
                      info: 'bg-primary-100 text-primary-800 dark:bg-gray-700 dark:text-blue-400 dark:border-[0.5px] dark:border-blue-400',
                      warning:
                        'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 dark:bg-gray-700 dark:text-yellow-300 dark:border-[0.5px] dark:border-yellow-300 dark:group-hover:bg-yellow-300',
                    },
                    base: 'flex h-fit items-center gap-1 font-medium max-w-fit',
                  },
                }}
              >
                {
                  AdminNotificationTypeEnum[
                    notification?.type as keyof typeof AdminNotificationTypeEnum
                  ]
                }
              </Badge>
            </div>
          </div>
          <div className="pl-3 xs:pl-8 flex flex-col gap-5">
            <div className="flex items-center text-black">
              <div className="text-right text-[12px] leading-[12px] tab:text-[14px] tab:leading-[14px] dark:text-gray-400 min-w-[70px] sm:min-w-[90px] lg:min-w-[100px] break-all">
                Message :
              </div>
              <div className="font-semibold ml-5 text-[12px] leading-[16px] tab:text-[14px] tab:leading-[14px] dark:text-gray-50 break-all">
                {notification?.message}
              </div>
            </div>
            <div className="flex items-center text-black">
              <div className="text-right text-[12px] leading-[12px] tab:text-[14px] tab:leading-[14px] dark:text-gray-400 min-w-[70px] sm:min-w-[90px] lg:min-w-[100px] break-all">
                Name :
              </div>
              <div className="font-semibold ml-5 text-[12px] leading-[16px] tab:text-[14px] tab:leading-[14px] dark:text-gray-50 break-all">
                {notification?.data?.firstName} {notification?.data?.lastName}
              </div>
            </div>
            <div className="flex items-center text-black">
              <div className="text-right text-[12px] leading-[12px] tab:text-[14px] tab:leading-[14px] dark:text-gray-400 min-w-[70px] sm:min-w-[90px] lg:min-w-[100px] break-all">
                E-Mail :
              </div>
              <div className="font-semibold ml-5 text-[12px] leading-[16px] tab:text-[14px] tab:leading-[14px] dark:text-gray-50 break-all">
                {notification?.data?.email}
              </div>
            </div>
            <div className="flex items-center text-black">
              <div className="text-right text-[12px] leading-[12px] tab:text-[14px] tab:leading-[14px] dark:text-gray-400 min-w-[70px] sm:min-w-[90px] lg:min-w-[100px] break-all">
                Phone :
              </div>
              <div className="font-semibold ml-5 text-[12px] leading-[16px] tab:text-[14px] tab:leading-[14px] dark:text-gray-50 break-all">
                {notification?.data?.phone}
              </div>
            </div>
            <div className="flex items-center text-black">
              <div className="text-right text-[12px] leading-[12px] tab:text-[14px] tab:leading-[14px] dark:text-gray-400 min-w-[70px] sm:min-w-[90px] lg:min-w-[100px] break-all">
                Reason :
              </div>
              <div className="font-semibold ml-5 text-[12px] leading-[16px] tab:text-[14px] tab:leading-[14px] dark:text-gray-50 break-all">
                {notification?.data?.reason}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewNotification;
