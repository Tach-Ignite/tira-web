/* eslint-disable no-unused-vars */
import { Row } from '@tanstack/react-table';
import { CategoryType } from '@services';
import { TableActionButtons } from '@src/atoms';

interface GetCategoryColumnsProps {
  onEdit: (categoryId: string) => void;
  onDelete: (category: CategoryType) => void;
}

export const getCategoryColumns = (props: GetCategoryColumnsProps) => {
  const { onDelete, onEdit } = props;
  return [
    {
      header: 'Category Name',
      enableSorting: false,
      cell: ({ row }: { row: Row<CategoryType> }) => {
        const { name = '' } = row?.original || {};
        return <p className="text-gray-900 dark:text-gray-300">{name}</p>;
      },
    },
    {
      header: 'Category Parent',
      enableSorting: false,
      cell: ({ row }: { row: Row<CategoryType> }) => {
        const { parent } = row?.original || {};
        return (
          <p className="text-gray-900 dark:text-gray-300">
            {parent?.name || '-'}
          </p>
        );
      },
    },

    {
      header: 'Action',
      enableSorting: false,
      cell: ({ row }: { row: Row<CategoryType> }) => {
        const { categoryId } = row?.original || {};

        const onDeleteClick = () => {
          onDelete(row.original);
        };

        const onEditClick = () => {
          onEdit(categoryId);
        };

        return (
          <TableActionButtons
            onClickDeleteButton={onDeleteClick}
            onEditButton={onEditClick}
          />
        );
      },
    },
  ];
};

export default getCategoryColumns;
