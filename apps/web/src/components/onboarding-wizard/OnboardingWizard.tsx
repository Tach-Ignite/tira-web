/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { Button } from '@src/atoms';
import { BackArrowIcon } from '@src/icons';
import WizardFooter from './WizardFooter';
import WizardHeader from './WizardHeader';
import WizardStepper from './WizardStepper';
import { OnboardingWizardProps, OnboardingWizards } from './types';

function OnboardingWizard(props: OnboardingWizardProps) {
  const {
    steps,
    totalSteps,
    activeStepIndex = OnboardingWizards.useCaseType,
    onHandleBack,
    shouldDisableBackButton,
    ...footerProps
  } = props || {};

  const activeStep = steps[activeStepIndex];

  const {
    description,
    title,
    content,
    lastButtonText,
    showFooter = true,
  } = activeStep || {};

  return (
    <div className="py-2 flex flex-col w-full h-full items-center justify-center mb-0">
      <WizardStepper
        steps={steps}
        totalSteps={totalSteps}
        currentStepIndex={activeStepIndex}
        onHandleBack={onHandleBack}
        shouldDisableBackButton={shouldDisableBackButton}
      />
      <WizardHeader description={description} title={title} />
      <div
        className={`flex flex-col w-full md:!w-1/2'} h-full items-center justify-center pb-10`}
      >
        {content}
        {showFooter ? (
          <div className="w-full md:!h-full pb-8 px-10 md:!pt-4 md:!pb-0">
            <WizardFooter {...footerProps} lastButtonText={lastButtonText} />
          </div>
        ) : null}
        <div className="md:!hidden flex w-full items-center justify-center py-0 px-4">
          {typeof onHandleBack === 'function' ? (
            <div className="relative h-[42px] w-[140px] rounded-3xl items-center justify-center p-[1px] border-[1px] border-gray-400 dark:border-yellow-400">
              <Button
                className="w-full h-full inline-flex items-center justify-center !bg-transparent dark:!bg-textGray rounded-3xl"
                onClick={onHandleBack}
                disabled={shouldDisableBackButton}
              >
                <span className="w-full h-full inline-flex justify-center items-center text-transparent bg-clip-text dark:bg-wizard-btn-gradient bg-gray-400">
                  <BackArrowIcon className="w-[12px] h-full mx-1 text-gray-400 dark:!text-yellow-400 " />
                  Back
                </span>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default OnboardingWizard;
