/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/require-default-props */

'use client';

import { useEffect } from 'react';
import { OrgUsers } from '@services/organizations/organization.type';
import { SearchInput, Spinner, Table } from '@src/atoms';
import { Row } from '@src/atoms/Table/types';
import { TeamUsersRoles, OrgUsersRoles } from '@src/types/modules/UserType';
import { addQueryParam } from '@src/lib/functions';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@context/ToastContext';
import { useGetAllUsersByTeamId } from '@queries/useTeamsQuery';
// import { OrgConsoleRoutes } from '@src/routes';
import AssignTeamUserRole from './AssignTeamUserRole';
import InviteMembers from './InviteMembers';

interface UserTableProps {
  orgId?: string;
  orgFriendlyId?: string;
  teamId: string;
  includeInvite?: boolean;
}

function UserTable({
  orgId,
  // orgFriendlyId,
  teamId,
  includeInvite = false,
}: UserTableProps) {
  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchTermInQuery = params.get('search') || '';

  const { showErrorToast } = useToast();

  const {
    data: users,
    refetch: reloadUsers,
    isLoading,
    isError,
    error,
  } = useGetAllUsersByTeamId({
    page: Number(pageInQuery),
    searchTerm: searchTermInQuery,
    perPage: 10,
    teamId,
  });

  const { data: allUsersList, meta, currentUser } = users || {};

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  const { currentPage = 1, total } = meta || {};

  const columns = [
    {
      header: 'Name',
      cell: ({ row }: { row: Row<OrgUsers> }) => {
        const { email, userProfile } = row?.original?.users || {};
        const { firstName, lastName } = userProfile || {};
        return firstName || lastName
          ? `${firstName} ${lastName}`
          : email?.split('@')[0] || '-';
      },
    },
    {
      header: 'Role',
      cell: ({ row }: { row: Row<OrgUsers> }) => {
        const { id = '' } = row?.original || {};
        const { name: roleName = '' } = row?.original?.role || {};
        const { userId } = row?.original?.users || {};
        return (
          <AssignTeamUserRole
            id={id}
            userId={userId as string}
            orgId={orgId as string}
            teamId={teamId as string}
            value={roleName}
            onSuccessCallback={reloadUsers}
            options={TeamUsersRoles}
            isDisabled={!currentUser?.writeAccess}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (isError) {
      showErrorToast({
        message: (error as string) || 'Failed to fetch the users',
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  function TableAdditionalHeader({ writeAccess }: { writeAccess: boolean }) {
    return (
      <div className="grid grid-cols-2 w-full px-0 space-y-4 tab:!flex-row !flex-col">
        <div className="w-2/3">
          <SearchInput searchValue={searchTermInQuery} />
        </div>
        {writeAccess ? (
          <div className="flex gap-4 justify-end !items-center sm:!flex-row !flex-col">
            <div className="space-y-5">
              {includeInvite ? <InviteMembers /> : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return isLoading ? (
    <div className="text-center m-auto">
      <Spinner size="xl" className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div className="grid grid-cols-1 space-y-5">
      <TableAdditionalHeader
        writeAccess={
          typeof currentUser !== 'undefined' ? currentUser?.writeAccess : false
        }
      />
      <Table
        columns={columns}
        data={allUsersList || []}
        paginationClassName="border-t-4"
        currentPage={Number(currentPage) - 1}
        totalRows={total}
        withPageCount
        currentPageDataLength={allUsersList?.length || 0}
        onPageChange={onPageChange}
        noDataMessage="No Users Found!"
      />
    </div>
  );
}

export default UserTable;
