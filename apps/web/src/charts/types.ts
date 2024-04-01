import { ChartData, ChartOptions } from 'chart.js';

export interface PieChartOptionsType extends ChartOptions<'pie'> {}

export interface BarChartOptionsType extends ChartOptions<'bar'> {}

export interface PieChartProps {
  data: ChartData<'pie', number[], string>;
  options: ChartOptions<'pie'>;
}

export interface BarChartProps {
  data: ChartData<'bar', number[], string>;
  options: ChartOptions<'bar'>;
}
