/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { WizardPageProps } from './types';

const activeStepClass =
  'bg-indigo20 text-white rounded dark:bg-opacity-30 dark:!text-aqua';

const hoverStepClass =
  'hover:bg-indigo20 hover:text-white hover:rounded hover:dark:bg-opacity-30 hover:dark:text-aqua';

function WizardPage(props: WizardPageProps) {
  const { steps, currentStepIndex = 0, onChangeWizardTab } = props || {};

  const pageDescription = steps[currentStepIndex]?.pageDescription;

  const pageName = steps[currentStepIndex]?.name;
  const pageAdditionalInfo = steps[currentStepIndex]?.additionalInfo;

  return (
    <div className="flex w-full lg:!flex-row flex-col">
      <div className="border-gradient rounded-y-lg rounded-l-lg wizard-side-bar px-3 py-10 pt-7 dark:bg-dark10 dark:bg-opacity-70 bg-red100 relative lg:!w-fit w-auto">
        {steps?.map(({ name }, index) => {
          const isActiveStep = currentStepIndex === index;
          const isLinkDetails =
            name === 'Links' ||
            name === 'Team' ||
            name === 'Testimonials' ||
            name === 'General information' ||
            name === 'Investor Information';

          const isBigName = name === 'Service Packages and Pricing';

          const onChange = () => {
            onChangeWizardTab?.(index);
          };

          return (
            <div
              key={name}
              onClick={onChange}
              className={`font-medium mb-1 uppercase relative cursor-pointer pl-3 py-4 pr-16 text-[16px] w-max leading-[24px] dark:text-white text-black ${isActiveStep ? activeStepClass : ''} ${hoverStepClass} ${isLinkDetails ? 'w-auto' : ''} ${isBigName ? 'sm:!w-max w-auto' : ''}`}
            >
              {name}
            </div>
          );
        })}
      </div>
      <div className="border-gradient rounded-r-lg wizard-page px-5 pb-10 dark:bg-dark10 bg-white relative w-full">
        <div className="flex justify-between items-center">
          <div
            className={`font-semibold text-sm dark:text-white text-black pt-7 ${pageDescription ? 'pb-2' : 'pb-5'}`}
          >
            {pageName}
          </div>
          <div className="font-semibold text-[16px] leading-[24px] dark:text-white text-[#6B6B6B]">
            {pageAdditionalInfo}
          </div>
        </div>
        {pageDescription ? (
          <div className="text-xs leading-[18px] font-normal dark:text-white text-gray05 pb-5">
            {pageDescription}
          </div>
        ) : null}
        <div className="border-t border-lightGray pt-5">
          {steps[currentStepIndex]?.component}
        </div>
      </div>
    </div>
  );
}

export default WizardPage;
