/* eslint-disable no-unused-vars */
export default interface GetColumnsType {
  onDeleteButton?: (deletedRow: any) => void;
  onViewButton?: (id: string) => void;
  onEditButton: (id: string) => void;
  isCustomer?: boolean;
}
