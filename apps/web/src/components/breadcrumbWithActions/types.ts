import React from 'react';

export interface BreadcrumbWithActionsProps {
  isEditing?: boolean;
  pageName?: string;
  onDiscard?: () => void;
  shouldDisabledSaveButton?: boolean;
  onSaveChange?: () => void;
  showBreadcrumb?: boolean;
  isCustomer?: boolean;
  additionalActions?: React.ReactNode;
  shouldDisabledDiscardButton?: boolean;
}
