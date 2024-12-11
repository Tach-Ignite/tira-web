/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unused-prop-types */

'use client';

import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { useGetAllTeamsByOrganizationId } from '@queries/useTeamsQuery';
import { TeamsEntity } from '@services';
import { SearchInput, Spinner, Table } from '@src/atoms';
import { Row } from '@src/atoms/Table/types';
import { addQueryParam } from '@src/lib/functions';
import { TeamConsoleRoutes } from '@src/routes';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import CreateTeamLink from './components/CreateTeamLink';

const defaultPageSize = 10;

function TeamsListPageInOrganizationLevel() {
  const { orgFriendlyId: organizationId } = useParams() || {};

  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchTermInQuery = params.get('search') || '';

  const { data: organizationDetails } = useGetSingleOrganization(
    organizationId as string,
  );

  const { data, isLoading } = useGetAllTeamsByOrganizationId(
    organizationDetails?.id as string,
    {
      page: Number(pageInQuery),
      searchTerm: searchTermInQuery,
      perPage: defaultPageSize,
    },
  );

  const { data: allTeamsByOrganization, meta } = data || {};

  const { currentPage: page = 1, total = 0 } = meta || {};

  const columns = [
    {
      header: 'Team Name',
      cell: ({ row }: { row: Row<TeamsEntity> }) => (
        <Link
          className="relative underline text-blue-400"
          href={`${TeamConsoleRoutes.Overview?.replace(':orgFriendlyId', organizationId as string)?.replace(':teamFriendlyId', row?.original?.teamFriendlyId as string)}`}
        >
          {row?.original?.name || '-'}
        </Link>
      ),
    },
    {
      id: 'team-users-count',
      cell: ({ row }: { row: Row<TeamsEntity> }) => {
        const { teamUsersCount = 0 } = row?.original || {};
        return `Members(${teamUsersCount})`;
      },
    },
  ];

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  function TableAdditionalHeader() {
    return (
      <div className="grid grid-cols-2 w-full px-0 md:!px-4 space-y-4 tab:!flex-row !flex-col">
        <div className="w-2/3">
          <SearchInput searchValue={searchTermInQuery} />
        </div>
        <div className="flex gap-4 justify-end !items-center sm:!flex-row !flex-col">
          <div className="space-y-5">
            <CreateTeamLink />
          </div>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div className="space-y-5">
      <Table
        columns={columns}
        data={allTeamsByOrganization}
        paginationClassName="border-t-4"
        currentPage={Number(page) - 1}
        totalRows={total}
        withPageCount
        currentPageDataLength={allTeamsByOrganization?.length}
        onPageChange={onPageChange}
        renderHeader={TableAdditionalHeader()}
        noDataMessage={`No Teams Found for ${organizationDetails?.name || 'this Organization'}!`}
      />
    </div>
  );
}

export default TeamsListPageInOrganizationLevel;
