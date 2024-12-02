import React from 'react';

export interface BreadcrumbDataType {
  name: string;
  url?: string;
  onClick?: () => void;
  content?: React.ReactNode;
}

export interface BreadcrumbWithActionsProps {
  isEditing?: boolean;
  pageName?: string;
  onDiscard?: () => void;
  shouldDisabledSaveButton?: boolean;
  onSaveChange?: () => void;
  showBreadcrumb?: boolean;
  isCustomer?: boolean;
  breadcrumbs?: BreadcrumbDataType[];
  additionalActions?: React.ReactNode;
  shouldDisabledDiscardButton?: boolean;
}
