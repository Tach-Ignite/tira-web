import React from 'react';
import { TrashIcon, PencilIcon, ArrowExpandIcon } from '@src/icons';
import { TableActionButtonProps } from './types';

function TableActionButtons(props: TableActionButtonProps) {
  const { onClickDeleteButton, onEditButton, onViewButton } = props || {};

  const buttonStyles = {
    className: 'cursor-pointer text-gray-900 dark:text-white',
    size: 20,
  };

  return (
    <div className="flex gap-4">
      {onClickDeleteButton ? (
        <TrashIcon onClick={onClickDeleteButton} {...buttonStyles} />
      ) : null}
      {onViewButton ? (
        <ArrowExpandIcon onClick={onViewButton} {...buttonStyles} />
      ) : null}
      {onEditButton ? (
        <PencilIcon onClick={onEditButton} {...buttonStyles} />
      ) : null}
    </div>
  );
}

export default TableActionButtons;
