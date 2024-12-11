/* eslint-disable no-unsafe-optional-chaining */

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useGetAllProducts } from '@queries/useProductQuery';
import { useAuthContext } from '@context/AuthContext';
import { ProductCard } from '@src/cards';
import { useForm } from 'react-hook-form';
import { ProductSortFields } from '@services';
import { SortOrderEnum } from '@src/types/modules';
import { Pagination } from '@src/atoms/Pagination';
import {
  CustomerProductFilters,
  CustomerProductSorting,
  customerProductPageSizeOptions,
} from '@src/components/product/customer';
import { addQueryParam } from '@src/lib/functions';
import { TachColorShopChildHeader } from '@src/components/layouts/tach-color-shop';
import { Spinner } from '@src/atoms';

const defaultPageSize = 20;
const numbersClass = 'text-black dark:text-white font-semibold';

const sortingOptions = [
  {
    label: 'Price: High to Low',
    field: ProductSortFields.PRICE,
    sortBy: SortOrderEnum.desc,
  },
  {
    label: 'Price: Low to High',
    field: ProductSortFields.PRICE,
    sortBy: SortOrderEnum.asc,
  },
  {
    label: 'Title: A to Z',
    field: ProductSortFields.TITLE,
    sortBy: SortOrderEnum.asc,
  },
  {
    label: 'Title: Z to A',
    field: ProductSortFields.TITLE,
    sortBy: SortOrderEnum.desc,
  },
  {
    label: 'Newest First',
    field: ProductSortFields.CREATED_AT,
    sortBy: SortOrderEnum.desc,
  },
];

function CustomerProductListPage() {
  const { isAuthenticated } = useAuthContext() || {};
  const customerProductListForm = useForm({ mode: 'onChange' });

  const params = useSearchParams();
  const pageInQuery = params.get('page') || 1;
  const searchInQuery = params.get('search') || '';
  const minPrice = params.get('price_range_from') || '';
  const maxPrice = params.get('price_range_to') || '';
  const sort = params.get('sort');
  const pageSize = params.get('page_size') || defaultPageSize;

  const sortedField = sortingOptions?.find(({ label }) => label === sort);
  const { field: sortField, sortBy: sortOrder } = sortedField || {};

  const { watch } = customerProductListForm;

  const { categoryIds: selectedCategoryIds } = watch();

  const categoryQueryString = selectedCategoryIds?.join(',') || '';

  const { data: products, isLoading } = useGetAllProducts({
    page: Number(pageInQuery),
    perPage: Number(pageSize),
    searchTerm: searchInQuery,
    categoryIds: categoryQueryString,
    maxPrice,
    minPrice,
    sortField,
    sortOrder,
  });

  const { data, meta } = products || {};
  const { total = 0 } = meta || {};

  const onPageChange = async (page: number) => {
    addQueryParam('page', page.toString());
  };

  useEffect(() => {
    if (!pageSize) {
      addQueryParam('page_size', `${defaultPageSize}`);
    }
    if (!pageInQuery) {
      addQueryParam('page', '1');
    }
  }, [pageSize, pageInQuery]);

  const showingFrom = Number(pageSize) * (Number(pageInQuery) - 1);

  if (isLoading) {
    return (
      <div className=" bg-white dark:bg-gray-800 h-full ">
        <Spinner />
      </div>
    );
  }
  return (
    <div className=" bg-white dark:bg-gray-800 h-full w-screen -mt-20">
      <TachColorShopChildHeader />
      <div className="px-14 h-full w-full py-6">
        <div className="flex w-full max-[655px]:flex-col gap-8">
          <div className="w-[22%] max-[1100px]:w-[50%] max-[1400px]:w-[40%] max-[1700px]:w-[30%] max-[655px]:w-[100%]">
            <CustomerProductFilters
              form={customerProductListForm}
              searchValue={searchInQuery}
            />
          </div>
          <div className="w-[78%] max-[655px]:w-[100%]">
            <div className="flex items-center justify-between flex-wrap max-[655px]:flex-col">
              <div className="font-semibold max-[655px]:mb-3 text-base text-black dark:text-white">
                {data?.length ? (
                  <div className="indigo20 text-sm dark:text-white font-normal">
                    <span className={numbersClass}>
                      {total ? showingFrom + 1 : 0} to{' '}
                      {showingFrom + data?.length}{' '}
                    </span>
                    of{' '}
                    <span className={numbersClass}>{` ${total}`} Products</span>
                  </div>
                ) : (
                  <div className="indigo20 text-sm dark:text-white font-normal">
                    <span className={numbersClass}>No Products Available</span>
                  </div>
                )}
              </div>
              <CustomerProductSorting sortOptions={sortingOptions} />
            </div>
            <div className="flex flex-wrap gap-8 mt-6 mb-12">
              {data?.map((productDetails) => (
                <Link
                  prefetch={false}
                  key={productDetails?.productId}
                  href={`/products/${productDetails.productId || '#'}`}
                >
                  <ProductCard
                    {...productDetails}
                    isAuthenticated={isAuthenticated}
                  />
                </Link>
              ))}
            </div>
            {data?.length ? (
              <Pagination
                currentPage={Number(pageInQuery) - 1}
                totalRows={total}
                pageSize={Number(pageSize)}
                previousLabel="Previous"
                nextLabel="Next"
                currentPageDataLength={data?.length}
                onPageChange={onPageChange}
                defaultPageSize={defaultPageSize}
                pageSizeOptions={customerProductPageSizeOptions}
                showPagination
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProductListPage;
