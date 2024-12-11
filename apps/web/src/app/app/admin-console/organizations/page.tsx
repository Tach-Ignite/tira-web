/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import { SearchInput, Spinner, Table, TableActionButtons } from '@src/atoms';
import { Row } from '@src/atoms/Table/types';
import { useSearchParams } from 'next/navigation';
import { addQueryParam } from '@src/lib/functions';
import { Checkbox } from '@src/flowbite';
import { useState } from 'react';
import { useGetAllOrganizations } from '@queries/useOrganizationsQuery';
import Link from 'next/link';
import { DashboardIcon } from '@src/icons';
import { AdminConsoleRoutes } from '@src/routes';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';

interface OrganizationEntity {
  id: string;
  orgFriendlyId: string;
  organizationName: string;
  name: string;
  website: string;
  accounts?: [];
  users?: [];
}

const defaultPageSize = 10;

function SuperAdminOrganizationsPage() {
  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchTermInQuery = params.get('search') || '';

  const [showIds, setShowIds] = useState(false);

  const { data, isLoading } = useGetAllOrganizations({
    page: Number(pageInQuery),
    searchTerm: searchTermInQuery,
    perPage: defaultPageSize,
  });

  const { data: organizations, meta } = data || {};

  const { currentPage: page = 1, total = 0 } = meta || {};

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  const onShowIds = () => {
    setShowIds(!showIds);
  };

  const columns = [
    showIds && {
      header: 'Org Id#',
      cell: ({ row }: { row: Row<OrganizationEntity> }) =>
        row?.original?.id || '-',
    },
    {
      header: 'Name',
      cell: ({ row }: { row: Row<OrganizationEntity> }) => (
        <Link
          className="relative underline text-blue-400"
          href={`${AdminConsoleRoutes.Organizations}/${row?.original?.orgFriendlyId}`}
        >
          {row?.original?.name || '-'}
        </Link>
      ),
    },
    {
      header: 'Website',
      cell: ({ row }: { row: Row<OrganizationEntity> }) => (
        <Link
          className="relative underline text-blue-400"
          target="_blank"
          href={`${row?.original?.website || '#'}`}
        >
          {row?.original?.website || '-'}
        </Link>
      ),
    },
    {
      header: 'Action',
      cell: ({ row }: { row: Row<OrganizationEntity> }) => (
        <TableActionButtons
          viewUrl={`${AdminConsoleRoutes.Organizations}/${row?.original?.orgFriendlyId}`}
        />
      ),
    },
  ].filter(Boolean);

  const breadcrumbs = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Organizations' },
  ];

  function renderHeader() {
    return (
      <div className="flex w-full px-6 space-y-4 tab:!flex-row !flex-col">
        <div className="flex w-full gap-3 text-gray-700 dark:text-gray-200 items-center">
          <div className="font-medium text-xl">Organizations</div>
          {organizations?.length ? (
            <div className="text-xs mt-2">
              {organizations?.length || 0} of {total || 0} Organizations Shown
            </div>
          ) : null}
        </div>
        <div className="flex gap-4 sm:!items-center !items-start sm:!flex-row !flex-col">
          <div className="min-w-max">
            <SearchInput searchValue={searchTermInQuery} />
          </div>
          <div className="flex gap-3 items-center w-max">
            <Checkbox onChange={onShowIds} checked={showIds} />
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
        data={organizations}
        paginationClassName="border-t-4"
        currentPage={Number(page) - 1}
        totalRows={total}
        withPageCount
        currentPageDataLength={organizations?.length}
        onPageChange={onPageChange}
        renderHeader={renderHeader()}
        noDataMessage="No Organizations Found!"
      />
    </div>
  );
}

export default SuperAdminOrganizationsPage;
