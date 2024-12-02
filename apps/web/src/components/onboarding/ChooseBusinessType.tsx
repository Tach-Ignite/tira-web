/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { ImagePlaceholderIcon } from '@src/icons';
import { OnboardingForm, BusinessTypeEnum } from './types';

const BusinessTypes = [
  BusinessTypeEnum.PaintSupplier,
  BusinessTypeEnum.BusinessPartner,
  BusinessTypeEnum.ColorConsultant,
  BusinessTypeEnum.Other,
];

const content = [
  {
    type: BusinessTypeEnum.PaintSupplier,
    description:
      'A business creating and delivering paint products and color solutions for various applications',
  },
  {
    type: BusinessTypeEnum.BusinessPartner,
    description:
      'An organization collaborating with color-related business to support their growth and expansion efforts',
  },
  {
    type: BusinessTypeEnum.ColorConsultant,
    description:
      'A company or individual offering expertise and services to assist color shops in meeting their business needs',
  },
  {
    type: BusinessTypeEnum.Other,
    description: '',
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
    <div className="w-full grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-14 md:!gap-4 lg:!gap-10 mt-1 mb-10 md:!mt-2 md:!mb-0 py-10 md:!py-10 md:!pb-4 md:!px-10 place-items-center">
      {BusinessTypes?.map((businessType) => {
        const isSelected = selectedBusinessType === businessType;

        const handleOnClick = () => {
          onSelectBusinessType(businessType);
        };

        return (
          <div
            key={businessType}
            onClick={handleOnClick}
            className={`min-h-[160px] w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-[1fr_4fr] gap-6 md:gap-[16px] rounded-3xl cursor-pointer no-select shadow-l dark:shadow-sm outline-4 outline outline-black dark:!outline-white py-8 px-4 md:!p-4 ${isSelected ? '!bg-indigo !bg-opacity-60 outline outline-secondary' : ''}`}
          >
            <div className="grid grid-cols-1 place-items-center">
              <ImagePlaceholderIcon className="w-[80px] h-[80px] dark:text-white" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:!gap-1">
              <p className="flex items-end justify-start font-semibold leading-[30px] text-[18px] text-gray-900 dark:text-white">
                {businessTypeLabel(businessType)}
              </p>
              <p className="w-full flex items-start justify-start leading-[18px] text-[12px] text-black dark:text-white">
                {content?.find((c) => c.type === businessType)?.description ||
                  ''}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChooseBusinessType;
