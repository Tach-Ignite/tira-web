/* eslint-disable react/require-default-props */

'use client';

import { useOnboarding } from '@context/OnboardingContext';
import { Button } from '@src/atoms';
import { BackArrowIcon } from '@src/icons';

function OnboardingBackButton({ isFooter }: { isFooter?: boolean }) {
  const { activeStep, onHandleBack } = useOnboarding();

  const isFirstStep = activeStep === 0;

  const btnClass = isFooter
    ? `lg:!hidden max-w-[140px] max-h-[48px] border-[1px] inline-flex items-center justify-center !bg-transparent !ring-0 focus:!ring-0 focus-visible:!outline-none gap-0 ${isFirstStep ? '!bg-surfaceDisabled dark:!bg-surfaceDisabled-dark !border-disabledBorder dark:!border-disabledBorder-dark' : 'border-action !bg-transparent dark:!bg-transparent dark:!dark:border-action-dark'}`
    : 'w-full h-full border-none inline-flex items-center justify-center !bg-transparent !ring-0 focus:!ring-0 focus-visible:!outline-none gap-1';

  return (
    <Button onClick={onHandleBack} className={btnClass} disabled={isFirstStep}>
      <span className={`"w-full h-full grid grid-cols-2 gap-2`}>
        <BackArrowIcon
          className={`w-[20px] h-full mx-1 ${isFirstStep ? '!text-disabledText' : 'text-action'}`}
        />
        <span
          className={`"w-full h-full inline-flex justify-center items-center font-[600] text-[16px] !leading-[24px] ${isFirstStep ? '!text-disabledText' : 'text-action'}`}
        >
          Back
        </span>
      </span>
    </Button>
  );
}

export default OnboardingBackButton;
