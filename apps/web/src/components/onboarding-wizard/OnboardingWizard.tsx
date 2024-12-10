/* eslint-disable no-unsafe-optional-chaining */

'use client';

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
      <div className="flex flex-col w-full h-full items-center justify-start mt-2 lg:mt-8 pb-10">
        {content}
        {showFooter ? (
          <div className="w-full lg:!h-full pb-8 px-10 lg:!pt-4 lg:!pb-0">
            <WizardFooter
              {...footerProps}
              lastButtonText={lastButtonText}
              onHandleBack={onHandleBack}
              shouldDisableBackButton={shouldDisableBackButton}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default OnboardingWizard;
