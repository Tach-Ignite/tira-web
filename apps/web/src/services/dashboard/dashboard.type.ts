export interface MonthlyEarningsEntity {
  month: string;
  year: number;
  earnings: number;
}

export interface CategoriesPercentageEntity {
  category: string;
  percentage: number;
}

export interface AdminDashboardOverviewType {
  totalSalesAmount: number;
  totalOrders: number;
  monthlyEarnings: MonthlyEarningsEntity[];
  totalShippedOrders: number;
  totalOpenOrders: number;
  totalUsers: number;
  totalCanceledOrders: number;
  categoryPercentages: CategoriesPercentageEntity[];
}

export interface GetDashboardOverviewArgs {
  earningsFilterYear: string;
  categoryFilterMonth: string;
  categoryFilterYear: string;
}
