/* eslint-disable no-unused-vars */

import { ComponentProps, FC, RefObject, SVGProps } from 'react';
import { Control } from 'react-hook-form';

export interface InputProps {
  control: Control<any>;
  isRequired?: boolean;
  name: string;
  label?: string;
  errorLabel?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  rules?: Object;
  ref?: RefObject<HTMLTextAreaElement>;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  helperText?: string;
  isArrayInput?: boolean;
  placeholder?: string;
  rows?: number;
  errorMessage?: string;
  startAdornment?: FC<ComponentProps<'svg'>>;
  endAdornment?: React.ReactNode;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
}

export interface TextareaProps {
  control: Control<any>;
  isRequired?: boolean;
  name: string;
  label?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  rules?: Object;
  ref?: RefObject<HTMLTextAreaElement>;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  helperText?: string;
  isArrayInput?: boolean;
  placeholder?: string;
  rows?: number;
  errorMessage?: string;
  startAdornment?: FC<ComponentProps<'svg'>>;
  endAdornment?: React.ReactNode;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
}

export interface PasswordInputProps {
  control: Control<any>;
  name: string;
  isRequired?: boolean;
  rules?: Object;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

export interface PasswordFloatingInputProps {
  control: any;
  label?: string;
  name?: string;
  isRequired?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  rules?: Record<string, any>;
}

export interface ErrorLabelProps {
  message?: string;
}

export interface SearchInputProps {
  pageSize?: Number;
  className?: string;
  searchValue?: string;
  withIcon?: boolean;
  placeHolder?: string;
}
