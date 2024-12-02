export interface PaginationMetaType {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number;
  next: number;
  pageSize?: number;
}
export interface Pagination<T> {
  data: T[];
  meta: PaginationMetaType;
}

export interface PaginationArgs {
  page?: number;
  perPage?: number;
  searchTerm?: string;
}
