'use client';

import React, { useCallback, useMemo } from 'react';
import { useThemeMode } from '@src/flowbite';
import { formatNumberToKFormat } from '@src/lib/numbers';
import Image from 'next/image';
import LightGreenGraph from '../../public/assets/db-green-graph.webp';
import DarkRedGraph from '../../public/assets/db-dark-red-graph.webp';
import LightRedGraph from '../../public/assets/db-red-graph.webp';
import DarkGreenGraph from '../../public/assets/db-dark-green-graph.webp';
import { DashboardInfoCardProps } from './types';

function DashboardInfoGraph(props: DashboardInfoCardProps) {
  const { cardName, count, isRedGraph } = props;
  const { mode } = useThemeMode();

  const getGraphByMode = useCallback(
    (mode: string) => {
      if (isRedGraph) {
        return mode === 'dark' ? DarkRedGraph : LightRedGraph;
      }
      return mode === 'dark' ? DarkGreenGraph : LightGreenGraph;
    },
    [isRedGraph],
  );

  const graphImage = useMemo(() => {
    const localStorageMode = localStorage?.getItem('flowbite-theme-mode') || '';
    if (mode) {
      return getGraphByMode(mode);
    }
    return getGraphByMode(localStorageMode);
  }, [mode, getGraphByMode]);

  const formattedCount = formatNumberToKFormat(count);

  return (
    <div className="flex items-center justify-center">
      <Image
        src={graphImage}
        alt="bg-graph"
        priority
        height="0"
        width="0"
        className="pt-4 bg-white dark:bg-gray-800 shadow-xl rounded-2xl"
      />
      <div className="absolute text-center text-black dark:text-white ">
        <div className="text-sm leading-[21px] font-medium">
          Total {cardName}
        </div>
        <div className="font-bold text-2xl leading-[36px]">
          {formattedCount}
        </div>
      </div>
    </div>
  );
}

export default DashboardInfoGraph;
