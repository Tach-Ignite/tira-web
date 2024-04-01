/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { ProductSortFields, ServiceSortFields } from '@services';
import { SortOrderEnum } from '@src/types/modules';
import { UseFormReturn } from 'react-hook-form';

export interface SelectOptionType {
  label?: string;
  field: ProductSortFields | ServiceSortFields;
  sortBy: SortOrderEnum;
}

export interface CustomerProductSortingProps {
  sortOptions?: SelectOptionType[];
}

export interface PriceRangeSelectProps extends PriceRangeDropdownProps {
  value: string;
  onFieldClick?: () => void;
  showDropdown?: boolean;
}

export interface PriceRangeDropdownProps {
  options?: SelectOptionType[];
  onSelect: (value: string) => void;
}

export interface PriceRangeFilterProps {
  minAmountOptions?: SelectOptionType[];
  maxAmountOptions?: SelectOptionType[];
}

export interface CustomerProductFiltersProps {
  form: UseFormReturn;
  searchValue?: string;
}
