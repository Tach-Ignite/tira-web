import { Row } from '@tanstack/react-table';
import { Badge } from '@src/flowbite';
import { UserType } from '@services';
import { TableActionButtons } from '@src/atoms';
import { months, getHalfYear } from '../../lib/date';
import { GetColumnsType, UserRoles } from '../../types/modules';

function getUserColumns(props: GetColumnsType) {
  const { onDeleteButton, onEditButton } = props || {};

  return [
    {
      header: 'Name',
      enableSorting: false,
      cell: ({ row }: { row: Row<UserType> }) => {
        const { email, name } = row?.original || {};
        return (
          <p className="text-gray-900 dark:text-gray-300">
            {name || email?.split('@')[0]}
          </p>
        );
      },
    },
    {
      header: 'Role',
      cell: ({ row }: { row: Row<UserType> }) => {
        const { role } = row?.original || {};
        return (
          <Badge
            size="sm"
            color={role?.name === UserRoles.SuperAdmin ? 'blue' : 'warning'}
            className="min-w-max capitalize"
            theme={{
              icon: { off: 'rounded-md px-2.5 py-0.5' },
              root: {
                color: {
                  warning:
                    'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 dark:bg-gray-700 dark:text-yellow-300 dark:border-[0.5px] dark:border-yellow-300 dark:group-hover:bg-yellow-300',
                },
                base: 'flex h-fit items-center gap-1 font-medium max-w-fit',
              },
            }}
          >
            {role?.name}
          </Badge>
        );
      },
    },
    {
      header: 'Email',
      enableSorting: false,
      accessorKey: 'email',
    },
    {
      header: 'Verified',
      cell: ({ row }: { row: Row<UserType> }) => {
        const { createdAt = '' } = row?.original || {};
        const date = new Date(createdAt);
        return <p>{`${months[date.getMonth()]} ${getHalfYear(date)}`}</p>;
      },
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: Row<UserType> }) => {
        const { userId } = row?.original || {};

        const onDelete = () => {
          onDeleteButton?.(row?.original);
        };

        const onEdit = () => {
          onEditButton(userId);
        };

        return (
          <TableActionButtons
            onClickDeleteButton={onDelete}
            onEditButton={onEdit}
          />
        );
      },
    },
  ];
}

export default getUserColumns;
