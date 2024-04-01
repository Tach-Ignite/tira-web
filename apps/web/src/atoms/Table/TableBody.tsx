import {
  FlowBiteTableRow,
  FlowBiteTableBody,
  FlowBiteTableCell,
} from '@src/flowbite';
import { flexRender } from '@tanstack/react-table';
import { TableBodyProps } from './types';

function TableBody(props: TableBodyProps) {
  const { rowModels, tableBodyClassName = '' } = props;

  return (
    <FlowBiteTableBody className={tableBodyClassName}>
      {rowModels?.rows?.map(({ id, getVisibleCells }) => (
        <FlowBiteTableRow
          key={id}
          className={
            tableBodyClassName === 'divide-y'
              ? 'border-gray-200 dark:border-gray-600'
              : ''
          }
        >
          {getVisibleCells()?.map(({ id, column, getContext }) => (
            <FlowBiteTableCell
              key={id}
              className="text-sm text-gray-500 dark:text-gray-400 leading-[21px]"
            >
              {flexRender(column.columnDef.cell, getContext())}
            </FlowBiteTableCell>
          ))}
        </FlowBiteTableRow>
      ))}
    </FlowBiteTableBody>
  );
}

export default TableBody;
