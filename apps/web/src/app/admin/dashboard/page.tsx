'use client';

import { useAuthContext } from '@context/AuthContext';
import { useGetAdminDashboardOverview } from '@queries';
import { currentMonth, currentYear, getTimeOfDay } from '@src/lib/date';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  DashboardMonthlyEarnings,
  NotificationsTable,
  OrdersInfoGrid,
  ProductCategorySalesCard,
} from '@components/admin/dashboard';
import { DashboardInfoGraph } from '@src/cards';

const timeOfDay = getTimeOfDay();

const graphClassName =
  'grid-cols-subgrid min-[450px]:col-span-1 max-[450px]:col-span-3';

function DashboardPage() {
  const dashboardForm = useForm({
    mode: 'onChange',
    defaultValues: {
      earningsFilterYear: currentYear.toString(),
      categoryFilterMonth: currentMonth.toString(),
      categoryFilterYear: currentYear.toString(),
    },
  });

  const { authenticatedUser } = useAuthContext();

  const { name, email } = authenticatedUser || {};

  const params = useSearchParams();
  const earningsFilterYear = params.get('earningsYear') || '';
  const categoryFilterYear = params.get('categoryYear') || '';
  const categoryFilterMonth = params.get('categoryMonth') || '';

  const userName = name || email?.split('@')[0];

  const { data: adminDashboardOverview } = useGetAdminDashboardOverview({
    earningsFilterYear,
    categoryFilterMonth,
    categoryFilterYear,
  });

  const {
    monthlyEarnings = [],
    totalCanceledOrders = 0,
    totalOpenOrders = 0,
    totalOrders = 0,
    totalSalesAmount = 0,
    totalShippedOrders = 0,
    totalUsers = 0,
    categoryPercentages = [],
  } = adminDashboardOverview || {};

  return (
    <div className="w-full">
      <div className="font-bold text-lg leading-[24px] text-black dark:text-white mb-4">
        Good {timeOfDay} {userName},
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5">
          <div className={graphClassName}>
            <DashboardInfoGraph cardName="Sales" count={totalSalesAmount} />
          </div>
          <div className={graphClassName}>
            <DashboardInfoGraph
              cardName="Orders"
              count={totalOrders}
              isRedGraph
            />
          </div>
          <div className={graphClassName}>
            <DashboardInfoGraph cardName="Users" count={totalUsers} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="grid-cols-subgrid min-[950px]:col-span-2 max-[950px]:col-span-3">
            <DashboardMonthlyEarnings
              form={dashboardForm}
              monthlyEarnings={monthlyEarnings}
            />
          </div>
          <div className="grid-cols-subgrid min-[950px]:col-span-1 max-[950px]:col-span-3 justify-between">
            <OrdersInfoGrid
              totalCanceledOrders={totalCanceledOrders}
              totalOpenOrders={totalOpenOrders}
              totalShippedOrders={totalShippedOrders}
            />
          </div>
        </div>
        <div className="flex min-[950px]:flex-row max-[950px]:flex-col gap-5 w-full">
          <div className="min-[950px]:w-1/2 max-[950px]:w-full">
            <NotificationsTable />
          </div>
          <div className="min-[950px]:w-1/2 max-[950px]:w-full">
            <ProductCategorySalesCard
              form={dashboardForm}
              categoryPercentages={categoryPercentages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
