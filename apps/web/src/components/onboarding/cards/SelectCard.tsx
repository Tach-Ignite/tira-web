/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */

import Image from 'next/image';
import PlaceholderImage from '@public/assets/select-card-placeholder.png';

type SelectCardType = {
  handleOnClick: (value: any) => void;
  type: string;
  label?: string;
  isSelected: boolean;
  description1: string;
  description2?: string;
};

export default function SelectCard({
  handleOnClick,
  isSelected,
  type,
  description1,
  description2,
  label,
}: SelectCardType) {
  return (
    <div
      key={type}
      onClick={handleOnClick}
      className={`min-h-[160px] w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-[2fr_4fr] gap-6 md:!gap-[4px] cursor-pointer no-select border-2 rounded-[2px] border-borderPrimary dark:border-borderPrimary-dark py-8 px-4 md:!p-[12px] lg:!p-[16px] !bg-surface dark:!bg-surface-dark ${isSelected ? '!outline !outline-3 !outline-action !bg-opacity-20' : ''}`}
    >
      <div className="grid grid-cols-1 place-items-center">
        <Image
          src={PlaceholderImage}
          alt="Select Card Placeholder"
          width={0}
          height={0}
          className="!w-[80px] !h-[80px] md:!w-[117px] md:!h-[117px]"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:!gap-1">
        <p className="flex items-center justify-start font-[600] leading-[24px] text-[20px] text-textBody dark:text-textBody-dark">
          {label || type}
        </p>
        <p className="w-full flex items-center justify-start font-[400] leading-[24px] text-[16px] text-textBody dark:text-textBody-dark">
          {description1}
        </p>
        <p className="w-full flex items-center justify-start font-[400] leading-[20px] text-[12px] text-textBody dark:text-textBody-dark">
          {description2}
        </p>
      </div>
    </div>
  );
}
