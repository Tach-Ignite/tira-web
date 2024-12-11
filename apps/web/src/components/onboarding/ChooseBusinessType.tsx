/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useOnboarding } from '@context/OnboardingContext';
import { BusinessTypeEnum } from './types';
import SelectCard from './cards/SelectCard';
import { businessTypes } from './onboardingConstants';

function ChooseBusinessType() {
  const { onboardingForm } = useOnboarding();

  const { watch, setValue } = onboardingForm;

  const { businessType: selectedBusinessType } = watch();

  const onSelectBusinessType = (selectedBusiness: BusinessTypeEnum) => {
    if (selectedBusinessType === selectedBusiness) {
      setValue('businessType', undefined, {
        shouldDirty: true,
      });
    } else {
      setValue('businessType', selectedBusiness, {
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="w-full 2xl:!w-2/3 grid grid-cols-1 tab:!grid-cols-1 !md:!grid-cols-1 lg:!grid-cols-2 xl:!grid-cols-2 gap-14 md:!gap-4 lg:!gap-8 mt-1 mb-10 xl:!my-16 py-10 xl:!py-10 md:!px-2 place-items-center">
      {businessTypes?.map((typeOptions) => {
        const { type } = typeOptions || {};
        const isSelected = selectedBusinessType === type;

        const handleOnClick = () => {
          onSelectBusinessType(type);
        };

        return (
          <SelectCard
            key={type}
            isSelected={isSelected}
            handleOnClick={handleOnClick}
            {...typeOptions}
          />
        );
      })}
    </div>
  );
}

export default ChooseBusinessType;
