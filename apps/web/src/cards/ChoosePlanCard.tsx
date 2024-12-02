'use client';

import { DotFillIcon } from '@src/icons';
import { ChoosePlanCardProps } from './types';

function ChoosePlanCard(props: ChoosePlanCardProps) {
  const { planName, amount, activePlanFeatures, selectedPlan } = props;

  const isSelected = selectedPlan === planName;

  return (
    <div
      className={`shadow-2xl no-select rounded-lg p-8 space-y-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-100  xs:min-w-[314px] min-h-[395px] border dark:border-[#2C2C2C] border-[#D9D9D9] ${isSelected ? 'dark:!bg-gray-700 !bg-gray-800' : ''}`}
    >
      <p className="font-medium text-[20px] leading-[30px]">{planName}</p>
      <p className="font-medium text-[18px] leading-[27px]">
        <span className="font-extrabold text-[48px] leading-[48px] text-gray-900 dark:text-white">
          ${amount}
        </span>{' '}
        /month
      </p>
      <div className="space-y-5 pt-4">
        {activePlanFeatures?.map((feature) => (
          <span className="flex items-center gap-3">
            <DotFillIcon className="text-black w-4 h-4 dark:text-white" />
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ChoosePlanCard;
