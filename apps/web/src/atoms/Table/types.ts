// eslint-disable-next-line import/extensions
import { HeaderGroup, RowModel } from '@tanstack/react-table';
import React from 'react';
import { PaginationProps } from '../Pagination/types';

export type { Row } from '@tanstack/react-table';

export interface TableProps extends PaginationProps {
  withPagination?: boolean;
  columns: any;
  noDataMessage?: string;
  modalDescription?: string;
  tableBodyClassName?: string;
  modalButtonNames?: string[];
  renderHeader?: React.ReactNode;
  deletedName?: string;
  onConfirmDeleteRow?: () => void;
  onCancelModel?: () => void;
  showDeleteModal?: boolean;
  data?: any;
  baseClassName?: string;
  childrenClassName?: string;
  withBorder?: boolean;
}

export interface TableBodyProps {
  rowModels?: RowModel<unknown>;
  tableBodyClassName?: string;
  noDataMessage?: string;
  headerLength?: number;
}

export interface TableHeadProps {
  headerGroups: HeaderGroup<unknown>[];
}
