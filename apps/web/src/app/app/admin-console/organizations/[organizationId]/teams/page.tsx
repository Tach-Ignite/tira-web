/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unused-prop-types */

'use client';

import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { useGetAllTeamsByOrganizationId } from '@queries/useTeamsQuery';
import { TeamsEntity } from '@services';
import { SearchInput, Spinner, Table, TableActionButtons } from '@src/atoms';
import { Row } from '@src/atoms/Table/types';
import { Checkbox } from '@src/flowbite';
import { DashboardIcon } from '@src/icons';
import { addQueryParam } from '@src/lib/functions';
import { AdminConsoleRoutes } from '@src/routes';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const defaultPageSize = 10;

function TeamsListPageInOrganizationLevel() {
  const { organizationId } = useParams() || {};

  const [showTeamIds, setShowTeamIds] = useState(false);

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

  const breadcrumbs = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Organizations', url: AdminConsoleRoutes.Organizations },
    {
      name: organizationDetails?.name || '-',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}`,
    },
    { name: 'Teams' },
  ];

  const columns = [
    showTeamIds && {
      header: 'Team Id#',
      cell: ({ row }: { row: Row<TeamsEntity> }) => row?.original?.id || '-',
    },
    {
      header: 'Team Name',
      cell: ({ row }: { row: Row<TeamsEntity> }) => (
        <Link
          className="relative underline text-blue-400"
          href={`${AdminConsoleRoutes.Organizations}/${organizationId}/teams/${row?.original?.id}`}
        >
          {row?.original?.name || '-'}
        </Link>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }: { row: Row<TeamsEntity> }) => (
        <TableActionButtons
          viewUrl={`${AdminConsoleRoutes.Organizations}/${organizationId}/teams/${row?.original?.id}`}
        />
      ),
    },
  ].filter(Boolean);

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  function renderHeader() {
    const onShowIds = () => {
      setShowTeamIds(!showTeamIds);
    };

    return (
      <div className="flex w-full px-6 space-y-4 tab:!flex-row !flex-col">
        <div className="flex w-full gap-3 text-gray-700 dark:text-gray-200 items-center">
          <div className="font-medium text-xl">Teams</div>
          {allTeamsByOrganization?.length ? (
            <div className="text-xs mt-2">
              {allTeamsByOrganization?.length || 0} of {total || 0} Teams Shown
            </div>
          ) : null}
        </div>
        <div className="flex gap-4 sm:!items-center !items-start sm:!flex-row !flex-col">
          <div className="min-w-max">
            <SearchInput searchValue={searchTermInQuery} />
          </div>
          <div className="flex gap-3 items-center w-max">
            <Checkbox onChange={onShowIds} checked={showTeamIds} />
            <p className="text-black dark:text-white">Show Ids</p>
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
      <BreadcrumbWithActions breadcrumbs={breadcrumbs} />
      <Table
        columns={columns}
        data={allTeamsByOrganization}
        paginationClassName="border-t-4"
        currentPage={Number(page) - 1}
        totalRows={total}
        withPageCount
        currentPageDataLength={allTeamsByOrganization?.length}
        onPageChange={onPageChange}
        renderHeader={renderHeader()}
        noDataMessage={`No Teams Found for ${organizationDetails?.name || 'this Organization'}!`}
      />
    </div>
  );
}

export default TeamsListPageInOrganizationLevel;
