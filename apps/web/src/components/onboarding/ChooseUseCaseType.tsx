/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

// import { ImagePlaceholderIcon } from '@src/icons';
import { OnboardingForm, UseCaseTypeEnum } from './types';
import SelectCard from './cards/SelectCard';

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
    <div className="w-full grid grid-cols-1 lg:!grid-cols-2 2xl:!grid-cols-3 gap-14 tab:!gap-8 lg:!gap-4 xl:!gap-8 place-items-center">
      {useCaseTypes?.map((useCaseType) => {
        const isSelected = selectedUseCaseType === useCaseType;

        const handleOnClick = () => {
          onSelectBusinessType(useCaseType);
        };

        return (
          <SelectCard
            value={useCaseType}
            label={useCaseType}
            content={content}
            isSelected={isSelected}
            handleOnClick={handleOnClick}
          />
        );
      })}
    </div>
  );
}

export default ChooseUseCaseType;
