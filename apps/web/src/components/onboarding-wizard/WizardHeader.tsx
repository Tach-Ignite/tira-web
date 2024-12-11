'use client';

import { WizardHeaderProps } from './types';

function WizardHeader({ description, title }: WizardHeaderProps) {
  return (
    <div className="w-full pt-16 pb-2 px-4 2xl:!pt-24 2xl:!pb-12 lg:!pt-12 lg:!pb-6 grid-cols-1 place-items-center">
      <div className="w-full flex-col lg:!w-3/5 2xl:!w-2/4 text-center">
        <p className="font-[600] text-[24px] leading-[36px] tab:!text-[48px] tab:!leading-[56px] text-textBody dark:text-textBody-dark">
          {title}
        </p>
        <p className="font-[400] pt-2 text-[14px] leading-[24px] tab:!text-[16px] tab:!leading-[24px] text-textBody dark:text-textBody-dark">
          {description}
        </p>
      </div>
    </div>
  );
}

export default WizardHeader;
