/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useOnboarding } from '@context/OnboardingContext';
import { UseCaseTypeEnum } from './types';
import SelectCard from './cards/SelectCard';
import { userTypes } from './onboardingConstants';

function ChooseUseCaseType() {
  const { onboardingForm } = useOnboarding();

  const { watch, setValue } = onboardingForm;

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
      {userTypes?.map((userTypeOption) => {
        const { type } = userTypeOption || {};
        const isSelected = selectedUseCaseType === type;

        const handleOnClick = () => {
          onSelectBusinessType(type);
        };

        return (
          <SelectCard
            key={type}
            label={type}
            isSelected={isSelected}
            handleOnClick={handleOnClick}
            {...userTypeOption}
          />
        );
      })}
    </div>
  );
}

export default ChooseUseCaseType;
