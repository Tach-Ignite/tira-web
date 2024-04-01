'use client';

import {
  FlowBiteDropdown,
  DropdownItem,
  FlowBitePagination,
} from '@src/flowbite';
import { ArrowDownIcon } from '@src/icons';
import { useSearchParams } from 'next/navigation';
import { addQueryParam } from '@src/lib/functions';
import { PaginationProps } from './types';

function Pagination(props: PaginationProps) {
  const {
    pageSize = 10,
    currentPage = 0,
    totalRows = 0,
    currentPageDataLength = 0,
    onPageChange = () => {},
    paginationClassName = '',
    withPageCount = false,
    nextLabel = '',
    previousLabel = '',
    pageSizeOptions,
    defaultPageSize,
    showPagination = false,
  } = props || {};

  const params = useSearchParams();

  const selectedPageSize = params.get('page_size');

  const showingFrom = pageSize * currentPage;

  const numbersClass = 'text-black font-semibold dark:text-white';

  const totalPages = Math.ceil(totalRows / pageSize);

  const borderClassName = withPageCount
    ? 'border-gray-200 dark:border-gray-600 p-4'
    : '';

  const onPageSizeChange = (pageSize: number) => {
    if (Number(selectedPageSize) !== pageSize) {
      addQueryParam('page', '1');
      addQueryParam('page_size', `${pageSize}`);
    }
  };

  return (
    <div
      className={`flex justify-between ${borderClassName} flex-wrap items-center ${paginationClassName}`}
    >
      {withPageCount ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm font-normal">
          Showing{' '}
          <span className={numbersClass}>
            {totalRows ? showingFrom + 1 : 0}-
            {showingFrom + currentPageDataLength}{' '}
          </span>
          of <span className={numbersClass}>{` ${totalRows}`}</span>
        </div>
      ) : null}
      {totalPages > 1 || showPagination ? (
        <FlowBitePagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons={!previousLabel}
          previousLabel={previousLabel}
          nextLabel={nextLabel}
        />
      ) : null}
      {pageSizeOptions?.length ? (
        <FlowBiteDropdown
          label=""
          renderTrigger={() => (
            <span className="border cursor-pointer items-center gap-2 rounded-lg justify-center flex border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-500 px-5 py-2.5">
              Show {selectedPageSize || defaultPageSize}
              <ArrowDownIcon />
            </span>
          )}
        >
          {pageSizeOptions?.map((pageSize) => (
            <DropdownItem
              key={pageSize}
              onClick={() => onPageSizeChange(pageSize)}
            >
              Show {pageSize}
            </DropdownItem>
          ))}
        </FlowBiteDropdown>
      ) : null}
    </div>
  );
}

export default Pagination;
