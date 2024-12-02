import React from 'react';
import { QuantityButtonProps } from './types';

function QuantityButton({
  addClick,
  quantity,
  removeClick,
  isAdmin,
}: QuantityButtonProps) {
  return (
    <div className="flex flex-wrap" role="group">
      {!isAdmin ? (
        <button
          onClick={addClick}
          type="button"
          className="px-3 py-2 !border-r-0 sm:w-auto bg-white text-gray-900 dark:bg-gray-800 dark:text-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-400 dark:focus:text-white"
        >
          +
        </button>
      ) : null}
      {isAdmin ? (
        <div className="text-sm	leading-[21px] font-semibold text-right">
          {quantity}
        </div>
      ) : (
        <button
          type="button"
          disabled
          className="px-3 py-2 sm:w-auto  !border-x-0 bg-white text-gray-900 border-t border-b border-gray-20  hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:unset dark:focus:ring-blue-400 dark:focus:text-white"
        >
          {quantity}
        </button>
      )}
      {!isAdmin ? (
        <button
          onClick={removeClick}
          type="button"
          className="px-3 py-2 sm:w-auto !border-l-0 bg-white text-gray-900 dark:bg-gray-800 dark:text-white rounded-r-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-400 dark:focus:text-white"
        >
          -
        </button>
      ) : null}
    </div>
  );
}

export default QuantityButton;
