import { ApiProperty } from '@nestjs/swagger';

export class MonthlyEarningsEntity {
  constructor(partial: Partial<MonthlyEarningsEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  month: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  earnings: number;
}

export class CategoriesPercentageEntity {
  constructor(partial: Partial<CategoriesPercentageEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  category: string;

  @ApiProperty()
  percentage: number;
}

export class AdminDashboardOverviewEntity {
  constructor(partial: Partial<AdminDashboardOverviewEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  totalSalesAmount: number;

  @ApiProperty()
  totalOrders: number;

  @ApiProperty({ type: [MonthlyEarningsEntity] })
  monthlyEarnings: MonthlyEarningsEntity[];

  @ApiProperty()
  totalShippedOrders: number;

  @ApiProperty()
  totalOpenOrders: number;

  @ApiProperty()
  totalCanceledOrders: number;

  @ApiProperty()
  totalUsers: number;

  @ApiProperty({ type: [CategoriesPercentageEntity] })
  categoryPercentages: CategoriesPercentageEntity[];
}
