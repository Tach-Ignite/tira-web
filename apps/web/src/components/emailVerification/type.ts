export interface EmailVerificationProps {
  page?: 'requested' | 'verified';
  onResendEmailVerification?: () => void;
}
