import { FlowBiteTableHead, TableHeadCell } from '@src/flowbite';
import { flexRender } from '@tanstack/react-table';
import { TableHeadProps } from './types';

function TableHead(props: TableHeadProps) {
  const { headerGroups } = props || {};

  return (
    <FlowBiteTableHead className="border-b border-gray-200 dark:border-gray-600">
      {headerGroups?.map(({ headers }) =>
        headers?.map(({ id, isPlaceholder, column, getContext }) => (
          <TableHeadCell
            key={id}
            theme={{
              base: 'bg-gray-50 px-6 py-3 dark:bg-gray-700',
            }}
            className="text-gray-500 dark:text-gray-300 font-semibold text-xs leading-[18px] py-5"
          >
            {isPlaceholder
              ? null
              : flexRender(column.columnDef.header, getContext())}
          </TableHeadCell>
        )),
      )}
    </FlowBiteTableHead>
  );
}

export default TableHead;
