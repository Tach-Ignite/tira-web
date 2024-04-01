/* eslint-disable no-unused-vars */

export interface PaginationProps {
  totalRows?: number;
  currentPage?: number;
  withPageCount?: boolean;
  onPageChange?: (page: number) => void;
  currentPageDataLength?: number;
  pageSize?: number;
  nextLabel?: string;
  paginationClassName?: string;
  previousLabel?: string;
  showPagination?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
}
