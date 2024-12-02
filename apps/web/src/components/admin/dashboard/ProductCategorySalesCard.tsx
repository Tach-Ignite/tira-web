/* eslint-disable react/no-unstable-nested-components */

'use client';

import { Select } from '@src/atoms';
import {
  MonthOptions,
  currentMonth,
  currentYear,
  months,
  yearOptions,
} from '@src/lib/date';
import { addQueryParam } from '@src/lib/functions';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PieChart } from '@src/charts';
import { PieChartOptionsType } from '@src/charts/types';
import { ProductCategorySalesCardProps } from './types';

const getRandomColor = () => {
  const getLightColorValue = () => Math.floor(Math.random() * 128) + 127;
  const r = getLightColorValue();
  const g = getLightColorValue();
  const b = getLightColorValue();
  return `rgb(${r}, ${g}, ${b})`;
};

function ProductCategorySalesCard(props: ProductCategorySalesCardProps) {
  const { form, categoryPercentages } = props;

  const { control, watch, setValue } = form;

  const params = useSearchParams();
  const paramsCategoryFilterYear = params.get('categoryYear') || '';
  const paramsCategoryFilterMonth = params.get('categoryMonth') || '';

  const { categoryFilterMonth, categoryFilterYear } = watch() || {};

  const selectedMonth = useMemo(
    () =>
      MonthOptions?.find(
        ({ value }) => value === (Number(categoryFilterMonth) || currentMonth),
      )?.label,
    [categoryFilterMonth],
  );

  const selectedYear = useMemo(
    () =>
      yearOptions?.find(
        ({ value }) =>
          Number(value) === (Number(categoryFilterYear) || currentYear),
      )?.label,
    [categoryFilterYear],
  );

  const isCategoriesSaled = categoryPercentages?.some(
    ({ percentage }) => percentage > 0,
  );

  const onCategoryFilterMonthChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event?.target || {};
    setValue('categoryFilterMonth', value);
    addQueryParam('categoryMonth', value.toString());
  };

  const onCategoryFilterYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event?.target || {};
    setValue('categoryFilterYear', value);
    addQueryParam('categoryYear', value.toString());
  };

  const randomColors = categoryPercentages.map(() => getRandomColor());

  const pieChartData = {
    labels: categoryPercentages?.map((data) => data?.category),
    datasets: [
      {
        label: 'Percentage',
        backgroundColor: randomColors,
        hoverBackgroundColor: randomColors,
        borderColor: categoryPercentages?.map(() => '#ffffff'),
        data: categoryPercentages?.map((data) => data?.percentage),
      },
    ],
  };

  const { datasets } = pieChartData;

  const pieChartOptions: PieChartOptionsType = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value, context) => {
          const category = context?.chart?.data?.labels?.[context?.dataIndex];
          return `${category}\n${value}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14,
        },
        align: 'center',
        anchor: 'center',
        textAlign: 'center',
      },
    },
  };

  return (
    <div className="pt-5 pb-10 px-5 shadow-xl h-full rounded-2xl bg-white dark:bg-gray-800">
      <div className="flex justify-between gap-5 items-center flex-wrap">
        <div className="font-medium text-base !leading-[20px] text-black dark:text-primary-700">
          Product Category Sales For {selectedMonth}-{selectedYear}
        </div>
        <div className="flex gap-1">
          <Select
            control={control}
            options={MonthOptions}
            name="categoryFilterMonth"
            onChange={onCategoryFilterMonthChange}
            optionTitle="Select Month"
            value={paramsCategoryFilterMonth}
          />

          <Select
            control={control}
            options={yearOptions}
            name="categoryFilterYear"
            optionTitle="Select Year"
            onChange={onCategoryFilterYearChange}
            value={paramsCategoryFilterYear}
          />
        </div>
      </div>
      {isCategoriesSaled ? (
        <>
          <div className="h-[14rem] xl:h-[21rem] w-[14rem] xl:w-[21rem] flex justify-center m-auto mt-12">
            <PieChart data={pieChartData} options={pieChartOptions} />
          </div>
          <div className="flex gap-4 mt-8 justify-center">
            {categoryPercentages?.map(({ category }, index) => (
              <div className="flex items-center gap-1" key={category}>
                <div
                  className="h-[8px] w-[8px] mb-[1px] rounded-full"
                  style={{
                    backgroundColor: datasets[0].backgroundColor[index],
                  }}
                />
                <div className="text-gray-500 dark:text-gray-400 font-medium text-[12px] leading-[12px]">
                  {category}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-black dark:text-white font-semibold text-2xl !leading-[36px] mt-12">
          No Product Categories Sold For{' '}
          {months[Number(paramsCategoryFilterMonth) - 1] || currentMonth}-
          {paramsCategoryFilterYear || currentYear}
        </div>
      )}
    </div>
  );
}

export default ProductCategorySalesCard;
