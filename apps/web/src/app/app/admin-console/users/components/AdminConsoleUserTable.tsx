/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/require-default-props */

'use client';

import { useEffect, useState } from 'react';
import { UserEntity } from '@services';
import { SearchInput, Spinner, Table, TableActionButtons } from '@src/atoms';
import { Checkbox } from '@src/flowbite';
import { Row } from '@src/atoms/Table/types';
import { addQueryParam } from '@src/lib/functions';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@context/ToastContext';
import { useGetAllAdminConsoleUsers } from '@queries';
import { AdminConsoleRoutes } from '@src/routes';
import { DashboardIcon } from '@src/icons';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import InviteMembers from './InviteMembers';

interface UserTableProps {
  orgId?: string;
  teamId?: string;
  urlPrefix: string;
  includeInvite?: boolean;
}

function UserTable({
  orgId,
  teamId,
  urlPrefix,
  includeInvite = false,
}: UserTableProps) {
  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchTermInQuery = params.get('search') || '';

  const [showIds, setShowIds] = useState(false);

  const { showErrorToast } = useToast();

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetAllAdminConsoleUsers({
    page: Number(pageInQuery),
    searchTerm: searchTermInQuery,
    perPage: 10,
    orgId,
    teamId,
  });

  const { data: allUsersList, meta } = users || {};

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  const onShowIds = () => {
    setShowIds(!showIds);
  };

  function ShowIdCheck() {
    return (
      <div className="flex gap-3 items-center w-max">
        <Checkbox onChange={onShowIds} checked={showIds} />
        <p className="text-black dark:text-white">Show Ids</p>
      </div>
    );
  }

  const adminLevelBreadcrumb = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Users' },
  ];

  const { currentPage = 1, total } = meta || {};

  const columns = [
    showIds && {
      header: 'User Id#',
      cell: ({ row }: { row: Row<UserEntity> }) => row?.original?.userId || '-',
    },
    {
      header: 'User Name',
      cell: ({ row }: { row: Row<UserEntity> }) => row?.original?.email || '-',
    },
    {
      header: 'Name',
      cell: ({ row }: { row: Row<UserEntity> }) => {
        const { name, email } = row?.original || {};
        return name || email?.split('@')[0];
      },
    },
    {
      header: 'Action',
      cell: ({ row }: { row: Row<UserEntity> }) => (
        <TableActionButtons
          viewUrl={`${urlPrefix}/${row?.original?.userId}/view`}
          editUrl={`${AdminConsoleRoutes.Users}/${row?.original?.userId}/edit`}
        />
      ),
    },
  ].filter(Boolean);

  useEffect(() => {
    if (isError) {
      showErrorToast({
        message: (error as string) || 'Failed to fetch the users',
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  function renderHeader() {
    return (
      <div className="flex w-full px-6 space-y-4 tab:!flex-row !flex-col">
        <div className="flex w-full gap-3 text-gray-700 dark:text-gray-200 items-center">
          <div className="font-medium text-xl">Users</div>
          {allUsersList?.length ? (
            <div className="text-xs mt-1">
              {allUsersList?.length || 0} of {total || 0} Users Shown
            </div>
          ) : null}
        </div>
        <div className="flex gap-4 sm:!items-center !items-start sm:!flex-row !flex-col">
          <div className="min-w-max">
            <SearchInput searchValue={searchTermInQuery} />
          </div>
          <div className="space-y-5">
            {includeInvite ? (
              <div className="w-max">
                <InviteMembers />
              </div>
            ) : null}
            <ShowIdCheck />
          </div>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <div className="text-center m-auto">
      <Spinner size="xl" className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div className="space-y-5">
      {isLoading || teamId || orgId ? null : (
        <BreadcrumbWithActions breadcrumbs={adminLevelBreadcrumb} />
      )}
      <Table
        columns={columns}
        data={allUsersList}
        paginationClassName="border-t-4"
        currentPage={Number(currentPage) - 1}
        totalRows={total}
        withPageCount
        currentPageDataLength={allUsersList?.length}
        onPageChange={onPageChange}
        renderHeader={renderHeader()}
        noDataMessage="No Users Found!"
      />
    </div>
  );
}

export default UserTable;
