'use client';

import { useGetServices } from '@queries/useServicesQuery';
import { ServiceSortFields } from '@services';
import { Pagination } from '@src/atoms/Pagination';
import ServicesCard from '@src/cards/ServicesCard';
import Link from 'next/link';
import {
  CustomerProductFilters,
  CustomerProductSorting,
  customerProductPageSizeOptions,
} from '@components/product/customer';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SortOrderEnum } from '@src/types/modules/SortType';
import { SelectOptionType } from '@components/product/customer/types';
import { useMemo } from 'react';
import { addQueryParam } from '../../lib/functions';

const defaultPageSize = 20;

const sortingOptions: SelectOptionType[] = [
  {
    label: 'Price: High to Low',
    field: ServiceSortFields.PRICE,
    sortBy: SortOrderEnum.desc,
  },
  {
    label: 'Price: Low to High',
    field: ServiceSortFields.PRICE,
    sortBy: SortOrderEnum.asc,
  },
  {
    label: 'Title: A to Z',
    field: ServiceSortFields.SERVICE_NAME,
    sortBy: SortOrderEnum.asc,
  },
  {
    label: 'Title: Z to A',
    field: ServiceSortFields.SERVICE_NAME,
    sortBy: SortOrderEnum.desc,
  },
  {
    label: 'Newest First',
    field: ServiceSortFields.CREATED_AT,
    sortBy: SortOrderEnum.desc,
  },
];

function ServicesListPage() {
  const filterForm = useForm({ mode: 'onChange' });

  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchInQuery = params.get('search') || '';
  const minPrice = params.get('price_range_from') || '';
  const maxPrice = params.get('price_range_to') || '';
  const sort = params.get('sort');
  const pageSize = params.get('page_size') || defaultPageSize;

  const sortedField = useMemo(
    () => sortingOptions?.find(({ label }) => label === sort),
    [sort],
  );
  const { field: sortField, sortBy: sortOrder } = sortedField || {};

  const { watch } = filterForm;

  const { categoryIds: selectedCategoryIds } = watch();

  const categoryQueryString = selectedCategoryIds?.join(',') || '';

  const { data: { services, meta } = {} } = useGetServices({
    page: `${pageInQuery}`,
    perPage: `${pageSize}`,
    sortField: sortField as ServiceSortFields,
    sortOrder,
    maxPrice,
    minPrice,
    searchTerm: searchInQuery,
    categoryIds: categoryQueryString,
  });

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  return (
    <div className="flex w-full max-[655px]:flex-col gap-8">
      <div className="w-[22%] max-[1100px]:w-[50%] max-[1400px]:w-[40%] max-[1700px]:w-[30%] max-[655px]:w-[100%]">
        <CustomerProductFilters form={filterForm} searchValue={searchInQuery} />
      </div>
      <div className="w-[78%] max-[655px]:w-[100%]">
        <div className="flex items-center justify-between flex-wrap max-[655px]:flex-col">
          <div className="font-semibold max-[655px]:mb-3 text-base text-black dark:text-white">
            Category Name
            <span className="ml-2 text-gray-500 dark:text-gray-400 font-medium text-xs	leading-[18px]">
              Showing {services?.length || 0} out of {meta?.total || 0} Services
            </span>
          </div>
          <CustomerProductSorting sortOptions={sortingOptions} />
        </div>
        <div className="flex flex-wrap gap-8 mt-6 mb-12">
          {services?.map((service) => (
            <Link
              key={service?.serviceId}
              href={`/services/${service.serviceId}`}
            >
              <ServicesCard data={service} />
            </Link>
          ))}
        </div>
        {services?.length ? (
          <Pagination
            currentPage={Number(pageInQuery) - 1}
            totalRows={meta?.total}
            pageSize={Number(pageSize)}
            previousLabel="Previous"
            nextLabel="Next"
            currentPageDataLength={services?.length}
            onPageChange={onPageChange}
            defaultPageSize={defaultPageSize}
            pageSizeOptions={customerProductPageSizeOptions}
            showPagination
          />
        ) : null}
      </div>
    </div>
  );
}

export default ServicesListPage;
