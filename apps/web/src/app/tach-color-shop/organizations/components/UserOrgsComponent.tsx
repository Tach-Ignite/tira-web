/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import { SearchInput, Spinner, Table } from '@src/atoms';
import { Row } from '@src/atoms/Table/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { addQueryParam } from '@src/lib/functions';
import { Checkbox } from '@src/flowbite';
import { useContext, useState } from 'react';
import { useGetAllOrganizations } from '@queries/useOrganizationsQuery';
import Link from 'next/link';
import { AdminConsoleRoutes, TachColorShopRoutes } from '@src/routes';
import { ChevronRightIcon } from '@src/icons';
import { AuthContext } from '@context/AuthContext';
import { OrganizationsEntity } from '@services';

const defaultPageSize = 10;

function OrgSelectAction({ org }: { org: OrganizationsEntity }) {
  const { setCurrentOrg } = useContext(AuthContext);
  const router = useRouter();

  const onClickAction = () => {
    setCurrentOrg?.(org);
    router.push(`${TachColorShopRoutes.Home}/${org.id}`);
  };

  return (
    <ChevronRightIcon
      className="cursor-pointer text-gray-900 dark:text-white"
      size="20"
      onClick={onClickAction}
    />
  );
}

function UserOrganizationsPage() {
  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchTermInQuery = params.get('search') || '';

  const [showIds, setShowIds] = useState(false);

  const { data, isLoading, isError, error } = useGetAllOrganizations({
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
      cell: ({ row }: { row: Row<OrganizationsEntity> }) =>
        row?.original?.id || '-',
    },
    {
      header: 'Name',
      cell: ({ row }: { row: Row<OrganizationsEntity> }) => (
        <Link
          className="relative underline text-blue-400"
          href={`${AdminConsoleRoutes.Organizations}/${row?.original?.id}`}
        >
          {row?.original?.name || '-'}
        </Link>
      ),
    },
    // {
    //   header: 'Website',
    //   cell: ({ row }: { row: Row<OrganizationEntity> }) => (
    //     <Link
    //       className="relative underline text-blue-400"
    //       target="_blank"
    //       href={`${row?.original?.website || '#'}`}
    //     >
    //       {row?.original?.website || '-'}
    //     </Link>
    //   ),
    // },
    {
      header: 'Action',
      cell: ({ row }: { row: Row<OrganizationsEntity> }) => (
        <OrgSelectAction org={row.original} />
      ),
    },
  ].filter(Boolean);

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

  if (isError) {
    return (
      <div className="text-danger text-center">{(error as any)?.error}</div>
    );
  }

  return isLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div className="space-y-5 mt-10">
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

export default UserOrganizationsPage;
