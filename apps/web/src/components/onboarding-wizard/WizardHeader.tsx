'use client';

import { WizardHeaderProps } from './types';

function WizardHeader({ description, title }: WizardHeaderProps) {
  return (
    <div className="w-full py-4 px-4 md:py-0 grid-cols-1 place-items-start md:flex">
      <div className="w-full text-start">
        <p className="font-[600] mt-10 text-[36px] leading-[43.57px] text-primary-900 dark:text-blue-400">
          {title}
        </p>
        <p className="font-[500] mt-2 text-[20px] leading-[24.2px] text-primary-250 dark:text-gray-100">
          {description}
        </p>
      </div>
      <div className="w-1/5 text-center" />
    </div>
  );
}

export default WizardHeader;
