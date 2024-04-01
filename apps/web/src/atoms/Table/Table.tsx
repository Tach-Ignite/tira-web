'use client';

import React from 'react';
import { FlowBiteTable, Card } from '@src/flowbite';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { DeleteModal } from '@src/modals';
import { Pagination } from '../Pagination';
import { TableProps } from './types';
import TableHead from './TableHead';
import TableBody from './TableBody';

function Table(props: TableProps) {
  const {
    columns,
    data = [],
    showDeleteModal = false,
    withPagination = true,
    onCancelModel,
    modalButtonNames,
    modalDescription,
    renderHeader,
    tableBodyClassName = '',
    deletedName = '',
    onConfirmDeleteRow,
    childrenClassName,
    baseClassName,
    withBorder = true,
    ...paginationProps
  } = props || {};

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card
      theme={{
        root: {
          base: `flex ${withBorder ? 'border rounded-lg shadow-md' : 'border-none'} border-gray-200 bg-white dark:border-none dark:bg-gray-800 ${baseClassName}`,
          children: `flex h-full w-full flex-col justify-center gap-4 pt-4 relative ${childrenClassName}`,
        },
      }}
    >
      {renderHeader || null}
      <div>
        <FlowBiteTable
          theme={{ root: { wrapper: 'relative overflow-x-auto' } }}
        >
          <TableHead headerGroups={getHeaderGroups()} />
          <TableBody
            rowModels={getRowModel()}
            tableBodyClassName={tableBodyClassName}
          />
        </FlowBiteTable>
        {withPagination ? <Pagination {...paginationProps} /> : null}
      </div>
      {showDeleteModal ? (
        <DeleteModal
          showModal={showDeleteModal}
          onCloseModal={onCancelModel}
          onHandleConfirm={onConfirmDeleteRow}
          buttonNames={modalButtonNames}
          description={`${modalDescription || 'Are you sure you want to delete'}
      ${deletedName}?`}
        />
      ) : null}
    </Card>
  );
}

export default Table;
