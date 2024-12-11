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
  currentUser?: {
    readAccess: boolean;
    writeAccess: boolean;
    role: any;
  };
}

export interface PaginationArgs {
  page?: number;
  perPage?: number;
  searchTerm?: string;
}
