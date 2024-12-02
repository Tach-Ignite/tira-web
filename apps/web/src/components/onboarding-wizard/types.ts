/* eslint-disable no-unused-vars */
export interface WizardHeaderProps {
  title: string;
  description: string;
}

export interface WizardContentProps {
  children: React.ReactNode;
}

export interface WizardButtonType {
  name: string;
  shouldDisabled?: boolean;
  onClick?: () => void;
  color?: string;
  isOutlined?: boolean;
}

export interface WizardFooterProps {
  shouldDisableNextButton?: boolean;
  shouldDisableLastButton?: boolean;
  onHandleNext?: () => void;
  lastButtonText?: string;
  onHandleLastButton?: () => void;
}

export interface OnboardingWizardStepType {
  title: string;
  description: string;
  content: React.ReactNode;
  showFooter?: boolean;
  lastButtonText?: string;
}

export interface WizardStepperProps {
  steps: OnboardingWizardStepType[];
  totalSteps: number;
  currentStepIndex?: number;
  onHandleBack?: () => void;
  shouldDisableBackButton?: boolean;
}

export interface OnboardingWizardProps extends WizardFooterProps {
  steps: OnboardingWizardStepType[];
  totalSteps: number;
  activeStepIndex: number;
  onHandleBack?: () => void;
  shouldDisableBackButton?: boolean;
}

export enum OnboardingWizards {
  useCaseType,
  RoleSelect,
  PersonalInformation,
  ChooseBusinessType,
  BusinessInformation,
  AccountSetupCompleted,
}
