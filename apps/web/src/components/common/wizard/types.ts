/* eslint-disable no-unused-vars */

import React from 'react';

export interface WizardStepType {
  name: string;
  component: React.ReactNode;
  pageDescription?: string;
  additionalInfo?: string;
}

export interface WizardStepperProps {
  progressName: string;
  steps: WizardStepType[];
  activeStep?: number;
  onChangeWizardTab?: (index: number) => void;
  currentStepIndex?: number;
}

export interface WizardFooterProps {
  onSaveChanges?: () => Promise<void>;
  onDiscardChanges?: () => void;
  onNext?: () => void;
  updateButtonLabel?: string;
  shouldDisableSave?: boolean;
  isNextPending?: boolean;
  isSavePending?: boolean;
  currentStepIndex?: number;
}

export interface WizardPageProps extends WizardStepperProps {}

export interface WizardProps extends WizardStepperProps, WizardFooterProps {}
