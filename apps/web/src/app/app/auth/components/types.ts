/* eslint-disable no-unused-vars */

import { LoginType } from '@src/types/modules';
import { UseFormReturn } from 'react-hook-form';

export interface AuthSubmitButtonProps {
  label: string;
  isPending?: boolean;
  onSubmit: () => void;
}

export interface EmailVerificationProps {
  form: UseFormReturn<LoginType>;
  resendCount?: number;
  handleResendEmail: () => void;
  isSuccessFull?: boolean;
  isResendPending?: boolean;
  isForgotVerification?: boolean;
}

export interface AuthPageProps {
  form: UseFormReturn<LoginType>;
  onSubmit: (data: LoginType) => Promise<void>;
  isLoginPage?: boolean;
  isPending?: boolean;
}
