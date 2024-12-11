/* eslint-disable no-unused-vars */

import { BreadcrumbType } from '@components/common/breadcrumb/types';
import React from 'react';

export interface WizardStepType {
  name?: string;
  url?: string;
  title?: string;
  description?: string;
  component?: React.ReactNode;
  onClick?: () => void;
  pageDescription?: string;
  additionalInfo?: string;
}

export interface AdditionalHeaderElementType {
  className?: String;
  component?: React.ReactNode;
}

export interface NavigationWizardPageHeaderProps {
  steps: WizardStepType[];
  currentStepIndex?: number;
  showGoBack?: boolean;
  fullBreadcrumbs?: BreadcrumbType[];
  onChangeWizardTab?: (index: number) => void;
  onHandleBack?: () => void;
  showBreadcrumbDivider?: boolean;
  isFullPage?: boolean;
}

export interface MobileNavigationSideMenuProps {
  show: boolean;
  setShow: () => void;
  steps: WizardStepType[];
  currentStepIndex: number;
  onChangeWizardTab?: (index: number) => void;
}

export interface FooterActionButtonType {
  label: string;
  shouldDisable?: boolean;
  onClick: () => void;
  className?: string;
  isPending?: boolean;
  popover?: {
    show?: boolean;
    content: string;
  };
}

export interface NavigationWizardFooterProps {
  actionButtons?: FooterActionButtonType[];
}

export interface NavigationWizardPageProps {
  steps: WizardStepType[];
  currentStepIndex?: number;
  onChangeWizardTab?: (index: number) => void;
  additionalHeaders?: AdditionalHeaderElementType;
  showStepInfo?: boolean;
  pageComponent?: React.ReactNode;
  isFullPage?: boolean;
  isNestedNavigationComponent?: boolean;
}

export interface NavigationWizardProps
  extends NavigationWizardPageHeaderProps,
    NavigationWizardFooterProps {
  id?: string;
  handleCurrentPathBreadcrumb?: () => void;
  initialBreadcrumbs?: BreadcrumbType[];
  additionalHeaders?: AdditionalHeaderElementType;
  showStepInfo?: boolean;
  pageComponent?: React.ReactNode;
  breadcrumbReplacements?: string[];
  showCurrentPathBreadcrumb?: boolean;
  splitSegment?: string;
  isNestedNavigationComponent?: boolean;
}

export interface NavigationWizardInfoProps {
  title?: string;
  description?: string;
  additionalHeaders?: AdditionalHeaderElementType;
}
