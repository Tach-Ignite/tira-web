'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PieChartProps } from './types';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function PieChart(props: PieChartProps) {
  return <Pie {...props} />;
}

export default PieChart;
