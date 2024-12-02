export interface TableActionButtonProps {
  onClickDeleteButton?: () => void;
  onEditButton?: () => void;
  onViewButton?: () => void;
  viewUrl?: string;
  editUrl?: string;
}
