/* eslint-disable no-unused-vars */

import { OnboardingFormType } from '@components/onboarding/types';
import { UseFormReturn } from 'react-hook-form';

export interface WizardHeaderProps {
  title: string;
  description: string;
}

export enum OnboardingWizard {
  SelectUserType,
  SelectRole,
  PersonalInformation,
  BusinessType,
  BusinessInformation,
  ToolsInformation,
  CompleteBasics,
}

export interface OnboardingContextProps {
  activeStep: number;
  onHandleSkip: () => void;
  shouldDisableNextButton: boolean;
  onHandleNext: () => void;
  onHandleBack: () => void;
  totalSteps: number;
  setTotalSteps: (totalSteps: number) => void;
  onboardingForm: UseFormReturn<OnboardingFormType>;
}

export interface WizardFooterProps {
  showSkipButton?: boolean;
}

export interface OnboardingWizardStepType {
  title: string;
  description: string;
  content: React.ReactNode;
  showSkipButton?: boolean;
}

export interface WizardStepperProps {
  steps: OnboardingWizardStepType[];
}

export interface OnboardingWizardProps
  extends WizardFooterProps,
    WizardStepperProps {}
