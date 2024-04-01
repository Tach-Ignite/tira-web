/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import React, { createContext, useContext, useState } from 'react';
import { ErrorVariant } from '../types/modules/ErrorType';

interface AddToastPropsType {
  message: string;
  duration?: number;
  autoClose?: boolean;
}

interface ToastProviderType extends AddToastPropsType {
  id: number;
  type: ErrorVariant;
}

interface ToastContextType {
  toasts: ToastProviderType[];
  showSuccessToast: (message: AddToastPropsType) => void;
  showErrorToast: (message: AddToastPropsType) => void;
  showWarningToast: (message: AddToastPropsType) => void;
  removeToast: (id: number) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  showSuccessToast(message: AddToastPropsType): void {},
  showErrorToast(message: AddToastPropsType): void {},
  showWarningToast(message: AddToastPropsType): void {},
  removeToast(id: number): void {},
  clearAllToasts(): void {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProviderType[]>([]);

  const showSuccessToast = (message: AddToastPropsType) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id: Date.now(),
        duration: 3000,
        autoClose: true,
        type: ErrorVariant.Success,
        ...message,
      },
    ]);
  };

  const showErrorToast = (message: AddToastPropsType) => {
    setToasts((prevToasts) => {
      const isSameMessage = prevToasts?.find(
        (toast) => toast?.message === message?.message,
      );
      if (isSameMessage) {
        return [...prevToasts];
      }
      return [
        ...prevToasts,
        {
          id: Date.now(),
          duration: 3000,
          autoClose: true,
          type: ErrorVariant.Error,
          ...message,
        },
      ];
    });
  };

  const showWarningToast = (message: AddToastPropsType) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id: Date.now(),
        duration: 3000,
        autoClose: true,
        type: ErrorVariant.Warning,
        ...message,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        removeToast,
        clearAllToasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
