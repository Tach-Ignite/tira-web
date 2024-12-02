/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { ImagePlaceholderIcon } from '@src/icons';
import { OnboardingForm, UseCaseTypeEnum } from './types';

const useCaseTypes = [
  UseCaseTypeEnum.Individual,
  UseCaseTypeEnum.Business,
  UseCaseTypeEnum.Both,
];

const content = [
  {
    type: UseCaseTypeEnum.Individual,
    description1: 'I’m here to explore colors, and contribute personally.',
    description2:
      'Suitable for visual artists or any users not representing a business.',
  },
  {
    type: UseCaseTypeEnum.Business,
    description1: 'I’m representing my company or organization.',
    description2:
      'Ideal for corporate or service providers representing a company.',
  },
  {
    type: UseCaseTypeEnum.Both,
    description1:
      'I’ll be using Color Shop both personally and on behalf of a business.',
    description2:
      'Suitable for individuals who have dual roles, like painters who also owns a color shop.',
  },
];

function ChooseUseCaseType({ form }: OnboardingForm) {
  const { watch, setValue } = form;

  const { useCaseType: selectedUseCaseType } = watch();

  const onSelectBusinessType = (selectedBusiness: UseCaseTypeEnum) => {
    if (selectedUseCaseType === selectedBusiness) {
      setValue('useCaseType', UseCaseTypeEnum.None);
    } else {
      setValue('useCaseType', selectedBusiness);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-14 md:!gap-4 lg:!gap-10 mt-1 mb-10 md:!my-16 py-10 md:!py-10 md:!px-10 place-items-center">
      {useCaseTypes?.map((useCaseType) => {
        const isSelected = selectedUseCaseType === useCaseType;

        const handleOnClick = () => {
          onSelectBusinessType(useCaseType);
        };

        return (
          <div
            key={useCaseType}
            onClick={handleOnClick}
            className={`min-h-[160px] w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-[1fr_4fr] gap-6 md:gap-[16px] rounded-3xl cursor-pointer no-select shadow-l dark:shadow-sm outline-4 outline outline-black dark:!outline-white py-8 px-4 md:!p-4 ${isSelected ? '!bg-indigo !bg-opacity-60 outline outline-secondary' : ''}`}
          >
            <div className="grid grid-cols-1 place-items-center">
              <ImagePlaceholderIcon className="w-[80px] h-[80px] dark:text-white" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:!gap-1">
              <p className="flex items-center justify-start font-semibold leading-[30px] text-[18px] text-gray-900 dark:text-white">
                {useCaseType}
              </p>
              <p className="w-full flex items-center justify-start leading-[18px] text-[12px] text-black dark:text-white">
                {content?.find((c) => c.type === useCaseType)?.description1 ||
                  ''}
              </p>
              <p className="w-full flex items-center justify-start leading-[18px] text-[12px] text-black dark:text-white">
                {content?.find((c) => c.type === useCaseType)?.description2 ||
                  ''}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChooseUseCaseType;
