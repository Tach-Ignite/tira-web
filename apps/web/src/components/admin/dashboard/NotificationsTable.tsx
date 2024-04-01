import { Table } from '@src/atoms/Table';
import { Row } from '@tanstack/react-table';
import React, { useCallback, useEffect, useMemo } from 'react';
import { addQueryParam } from '@src/lib/functions';
import { Badge } from '@src/flowbite';
import {
  useGetAllNotifications,
  useUpdateAdminNotifications,
} from '@queries/useAdminNotificationsQuery';
import { AdminNotificationType, AdminNotificationTypeEnum } from '@services';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PaginationMetaType } from '@src/types/modules/pagination';
import dynamic from 'next/dynamic';

const getBadgeColor = (type: AdminNotificationTypeEnum) =>
  type === AdminNotificationTypeEnum.Inquiry ||
  type === AdminNotificationTypeEnum.Inventory
    ? 'warning'
    : 'info';

const TableActionButtons = dynamic(
  () => import('@src/atoms/TableActionButtons/TableActionButtons'),
  {
    ssr: false,
  },
);

const getNotificationlistColumns = (props: any) => {
  const { onViewButton } = props || {};
  return [
    {
      header: 'Title',
      enableSorting: false,
      cell: ({ row }: { row: Row<AdminNotificationType> }) => {
        const { message } = row?.original || {};
        return (
          <div className="text-sm font-normal text-gray-900 dark:text-white">
            {message}
          </div>
        );
      },
    },
    {
      header: 'Type',
      enableSorting: false,
      cell: ({ row }: { row: Row<AdminNotificationType> }) => {
        const { type } = row?.original || {};
        const color = getBadgeColor(type);
        return (
          <Badge
            size="sm"
            color={color}
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
                type as keyof typeof AdminNotificationTypeEnum
              ]
            }
          </Badge>
        );
      },
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: Row<any> }) => {
        const { notificationId } = row?.original || {};

        const onViewNotification = () => {
          onViewButton?.(notificationId);
        };

        return <TableActionButtons onViewButton={onViewNotification} />;
      },
    },
  ];
};

function NotificationsTable() {
  const params = useSearchParams();
  const page = params.get('page') || 1;
  const pathName = usePathname();
  const router = useRouter();

  const {
    data: { data: { data = [], meta = {} as PaginationMetaType } = {} } = {},
  } = useGetAllNotifications({
    page: Number(page),
    perPage: 10,
  });

  const onViewButton = useCallback(
    (notificationId: string) => {
      router.push(`/admin/notifications/view/${notificationId}`);
    },
    [router],
  );

  const columns = useMemo(
    () =>
      getNotificationlistColumns({
        onViewButton,
      }),
    [onViewButton],
  );

  const { mutateAsync: updateAdminNotifications } = useUpdateAdminNotifications(
    {},
  );

  useEffect(() => {
    if (pathName === '/admin/notifications' && data.length) {
      const notificationIds = data?.filter((val) => val?.read === false);
      if (notificationIds.length) {
        updateAdminNotifications({
          notificationIds: notificationIds.map((val) => val.notificationId),
        });
      }
    }
  }, [data, updateAdminNotifications, pathName]);

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  return (
    <div className="bg-white shadow-xl grid-cols-subgrid min-[950px]:col-span-2 max-[950px]:col-span-3 rounded-lg dark:bg-gray-800">
      <div className="font-semibold p-4 text-lg text-gray-900 dark:text-white">
        Notifications
      </div>
      <Table
        columns={columns}
        data={data}
        childrenClassName="pt-0 rounded-b-lg"
        withBorder={false}
        tableBodyClassName="divide-y"
        baseClassName="rounded-b-lg"
        withPageCount
        currentPageDataLength={data?.length}
        onPageChange={onPageChange}
        currentPage={meta.currentPage - 1}
        totalRows={meta?.total}
        withPagination
        paginationClassName="border-t-4"
      />
    </div>
  );
}

export default NotificationsTable;
