'use client';

import React, { useEffect } from 'react';
import { FlowBiteToast } from '@src/flowbite';
import { TickIcon, ErrorIcon, CrossIcon } from '@src/icons';
import { useToast } from '../../../context/ToastContext';
import { ErrorVariant } from '../../../types/modules/ErrorType';

function Toast() {
  const { toasts, removeToast } = useToast() || {};

  useEffect(() => {
    if (toasts?.length) {
      toasts?.forEach(({ id, autoClose, duration }) => {
        if (autoClose) {
          setTimeout(() => removeToast?.(id), duration);
        }
      });
    }
  }, [removeToast, toasts]);

  return (
    <div className="flex flex-col gap-3 fixed w-max top-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[500]">
      {toasts?.map(({ type, id, message }) => {
        let toastIconClass =
          'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200';
        let toastClass = '';

        if (type === ErrorVariant.Error) {
          toastIconClass =
            'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-100';
          toastClass =
            'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-400';
        } else if (type === ErrorVariant.Warning) {
          toastClass =
            'border-yellow-400 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-400';
        }

        const onRemoveToast = () => {
          removeToast?.(id);
        };

        return (
          <FlowBiteToast
            theme={{
              root: {
                base: 'flex w-full sm:!max-w-md !max-w-xs items-center rounded-lg border  border-green-300 bg-green-50 p-4 text-gray-500 shadow dark:border-green-600 dark:bg-green-900 dark:text-green-200',
              },
              toggle: {
                base: '-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-green-50 p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-green-900 dark:text-green-900 dark:hover:bg-gray-700 dark:hover:text-white',
              },
            }}
            key={id}
            className={`gap-3 ${toastClass}`}
          >
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toastIconClass}`}
            >
              {type === ErrorVariant.Success ? (
                <TickIcon className="h-5 w-5" />
              ) : (
                <ErrorIcon className="h-5 w-5" />
              )}
            </div>
            <div>{message}</div>
            <CrossIcon
              className="h-5 w-5 cursor-pointer"
              onClick={onRemoveToast}
            />
          </FlowBiteToast>
        );
      })}
    </div>
  );
}

export default Toast;
