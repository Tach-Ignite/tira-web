export interface BreadcrumbType {
  name: string;
  onClick?: () => void;
  url?: string;
  content?: React.ReactNode;
}

export interface BreadcrumbWithActionsProps {
  onDiscard?: () => void;
  shouldDisabledSaveButton?: boolean;
  onSaveChange?: () => void;
  breadcrumbs: BreadcrumbType[];
  isSavePending?: boolean;
  additionalActions?: React.ReactNode;
  shouldDisabledDiscardButton?: boolean;
  className?: string;
}
