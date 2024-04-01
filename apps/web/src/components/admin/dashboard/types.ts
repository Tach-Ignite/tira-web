import {
  CategoriesPercentageEntity,
  GetDashboardOverviewArgs,
  MonthlyEarningsEntity,
} from '@services';
import { UseFormReturn } from 'react-hook-form';

export interface DashboardFormProps {
  form: UseFormReturn<GetDashboardOverviewArgs>;
}

export interface DashboardMonthlyEarningProps extends DashboardFormProps {
  monthlyEarnings: MonthlyEarningsEntity[];
}

export interface ProductCategorySalesCardProps extends DashboardFormProps {
  categoryPercentages: CategoriesPercentageEntity[];
}

export interface OrdersInfoGridProps {
  totalShippedOrders: number;
  totalCanceledOrders: number;
  totalOpenOrders: number;
}
