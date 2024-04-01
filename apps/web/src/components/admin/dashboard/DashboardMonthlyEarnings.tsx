'use client';

import { Select } from '@src/atoms';
import { currentYear, yearOptions } from '@src/lib/date';
import { BarChart } from '@src/charts';
import { useThemeMode } from '@src/flowbite';
import { BarChartOptionsType } from '@src/charts/types';
import { addQueryParam } from '@src/lib/functions';
import { useSearchParams } from 'next/navigation';
import { DashboardMonthlyEarningProps } from './types';

function DashboardMonthlyEarnings(props: DashboardMonthlyEarningProps) {
  const { form, monthlyEarnings } = props;
  const { mode } = useThemeMode();

  const params = useSearchParams();
  const paramsEarningsFilterYear = params.get('earningsYear') || '';

  const { control, setValue } = form;

  const onMonthlyFilterYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event?.target || {};
    setValue('earningsFilterYear', value);
    addQueryParam('earningsYear', value.toString());
  };

  const isEarningsPresentInYear = monthlyEarnings?.some(
    ({ earnings }) => earnings > 0,
  );

  const barChartData = {
    labels: monthlyEarnings?.map((data) => data?.month),
    datasets: [
      {
        label: 'Monthly Earnings',
        hoverBackgroundColor: monthlyEarnings?.map(() =>
          mode === 'dark' ? '#FF8A4C' : '#AC94FA',
        ),
        data: monthlyEarnings?.map((data) => Number(data?.earnings)),
        backgroundColor: monthlyEarnings?.map(() =>
          mode === 'dark' ? '#FF8A4C' : '#AC94FA',
        ),
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const options: BarChartOptionsType = {
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: mode === 'dark' ? '#9CA3AF' : '#6B7280',
          maxRotation: 0,
          minRotation: 0,
        },
        border: { color: mode === 'dark' ? '#4B5563' : '#E5E7EB' },
        grid: {
          display: false,
        },
      },
      y: {
        border: { color: mode === 'dark' ? '#4B5563' : '#E5E7EB' },
        grid: {
          display: false,
        },
        ticks: {
          color: mode === 'dark' ? '#9CA3AF' : '#6B7280',
          callback: (value: string | number) => {
            if (typeof value === 'number') {
              return `${value / 1000}k`;
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-8 py-2 grid-cols-2 h-full">
      <div className="rounded-lg px-2">
        <div className="flex justify-between pt-3 pb-3 border-b border-gray-200 dark:border-b-0 flex-wrap gap-y-5">
          <div>
            <div className="text-sm	leading-[21px] text-gray-500 dark:text-white">
              Monthly Earnings
            </div>
            <div className="font-bold text-2xl leading-[24px] text-gray-900 dark:text-white">
              Jan - Dec {paramsEarningsFilterYear || currentYear}
            </div>
          </div>
          <div>
            <Select
              control={control}
              name="earningsFilterYear"
              optionTitle="Select year"
              value={paramsEarningsFilterYear}
              options={yearOptions}
              onChange={onMonthlyFilterYearChange}
            />
          </div>
        </div>
        <div className="px-7 my-8 max-[450px]:px-0 dark:pt-4">
          {isEarningsPresentInYear ? (
            <BarChart data={barChartData} options={options} />
          ) : (
            <div className="text-center text-black dark:text-white font-semibold text-2xl !leading-[36px]">
              No Earnings Found For {paramsEarningsFilterYear || currentYear}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardMonthlyEarnings;
