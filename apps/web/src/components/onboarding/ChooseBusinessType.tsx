/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { ImagePlaceholderIcon } from '@src/icons';
import { OnboardingForm, BusinessTypeEnum } from './types';
import SelectCard from './cards/SelectCard';

const BusinessTypes = [
  BusinessTypeEnum.PaintSupplier,
  BusinessTypeEnum.BusinessPartner,
  BusinessTypeEnum.ColorConsultant,
  BusinessTypeEnum.Other,
];

const content = [
  {
    type: BusinessTypeEnum.PaintSupplier,
    description1:
      'A business creating and delivering paint products and color solutions for various applications',
  },
  {
    type: BusinessTypeEnum.BusinessPartner,
    description1:
      'An organization collaborating with color-related business to support their growth and expansion efforts',
  },
  {
    type: BusinessTypeEnum.ColorConsultant,
    description1:
      'A company or individual offering expertise and services to assist color shops in meeting their business needs',
  },
  {
    type: BusinessTypeEnum.Other,
    description1: '',
  },
];

function ChooseBusinessType({ form }: OnboardingForm) {
  const { watch, setValue } = form;

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

  const businessTypeLabel = (businessType: BusinessTypeEnum) => {
    if (businessType === BusinessTypeEnum.PaintSupplier) {
      return 'Paint Supplier';
    }
    if (businessType === BusinessTypeEnum.BusinessPartner) {
      return 'Business Partner';
    }
    if (businessType === BusinessTypeEnum.ColorConsultant) {
      return 'Color Consultant';
    }
    return `${businessType}`;
  };

  return (
    <div className="w-full 2xl:!w-2/3 grid grid-cols-1 tab:!grid-cols-1 !md:!grid-cols-1 lg:!grid-cols-2 xl:!grid-cols-2 gap-14 md:!gap-4 lg:!gap-8 mt-1 mb-10 xl:!my-16 py-10 xl:!py-10 md:!px-2 place-items-center">
      {BusinessTypes?.map((businessType) => {
        const isSelected = selectedBusinessType === businessType;

        const handleOnClick = () => {
          onSelectBusinessType(businessType);
        };
        const businessLabel = businessTypeLabel(businessType);

        return (
          <SelectCard
            value={businessType}
            label={businessLabel}
            content={content}
            isSelected={isSelected}
            handleOnClick={handleOnClick}
          />
        );
      })}
    </div>
  );
}

export default ChooseBusinessType;
