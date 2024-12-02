import React from 'react';
import { TrashIcon, PencilIcon, ArrowExpandIcon, EyeIcon } from '@src/icons';
import Link from 'next/link';
import { TableActionButtonProps } from './types';

function TableActionButtons(props: TableActionButtonProps) {
  const { onClickDeleteButton, onEditButton, onViewButton, editUrl, viewUrl } =
    props || {};

  const buttonStyles = {
    className: 'cursor-pointer text-gray-900 dark:text-white',
    size: 20,
  };

  return (
    <div className="flex gap-4 relative">
      {onClickDeleteButton ? (
        <TrashIcon onClick={onClickDeleteButton} {...buttonStyles} />
      ) : null}
      {onViewButton ? (
        <ArrowExpandIcon onClick={onViewButton} {...buttonStyles} />
      ) : null}
      {onEditButton ? (
        <PencilIcon onClick={onEditButton} {...buttonStyles} />
      ) : null}
      {viewUrl ? (
        <Link href={viewUrl} className="relative">
          <EyeIcon {...buttonStyles} />
        </Link>
      ) : null}
      {editUrl ? (
        <Link href={editUrl} className="relative">
          <PencilIcon {...buttonStyles} />
        </Link>
      ) : null}
    </div>
  );
}

export default TableActionButtons;
