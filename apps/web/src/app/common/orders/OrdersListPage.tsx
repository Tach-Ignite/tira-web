/* eslint-disable react/require-default-props */

'use client';

import { Table } from '@src/atoms';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { useGetAllOrders } from '@queries/useOrderQuery';
import { addQueryParam } from '@src/lib/functions';
import { SearchInput } from '@src/atoms/Input';
import getOrdersListColumns from './getOrdersListColumns';

function OrdersListPage({ isCustomer }: { isCustomer?: boolean }) {
  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchTermInQuery = params.get('search') || '';

  const router = useRouter();

  const { data: orders } = useGetAllOrders({
    page: Number(pageInQuery),
    searchTerm: searchTermInQuery,
    perPage: 25,
  });

  const { data } = orders || {};
  const { data: allOrders, meta } = data || {};
  const { currentPage = 1 } = meta || {};

  const onEditButton = useCallback(
    (orderId: string) => {
      router.push(`/admin/orders/edit/${orderId}`);
    },
    [router],
  );

  const onViewButton = useCallback(
    (orderId: string) => {
      router.push(`/account/orders/view/${orderId}`);
    },
    [router],
  );

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  const columns = useMemo(
    () =>
      getOrdersListColumns({
        onEditButton,
        onViewButton,
        isCustomer,
      }),
    [isCustomer, onEditButton, onViewButton],
  );

  function renderHeader() {
    return (
      <div className="ml-5 max-w-max">
        <SearchInput />
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      data={allOrders}
      currentPage={currentPage - 1}
      totalRows={meta?.total}
      withPageCount
      pageSize={25}
      tableBodyClassName="divide-y"
      paginationClassName="border-t"
      currentPageDataLength={allOrders?.length}
      onPageChange={onPageChange}
      renderHeader={renderHeader()}
    />
  );
}

export default OrdersListPage;
