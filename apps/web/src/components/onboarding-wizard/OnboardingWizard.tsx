/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { useOnboarding } from '@context/OnboardingContext';
import WizardFooter from './WizardFooter';
import WizardHeader from './WizardHeader';
import WizardStepper from './WizardStepper';
import { OnboardingWizardProps } from './types';

function OnboardingWizard(props: OnboardingWizardProps) {
  const { steps } = props || {};

  const { activeStep, totalSteps } = useOnboarding();

  const activeStepDetails = steps[activeStep];

  const {
    description,
    title,
    content,
    showSkipButton = false,
  } = activeStepDetails || {};

  const isLastStep = activeStep === totalSteps - 1;

  return (
    <div className="py-2 flex flex-col w-full h-full items-center justify-center mb-0">
      <WizardStepper steps={steps} />
      <WizardHeader description={description} title={title} />
      <div className="flex flex-col w-full h-full items-center justify-start mt-2 lg:mt-8 pb-10">
        {content}
        {isLastStep ? null : (
          <div className="w-full lg:!h-full pb-8 xs:!px-10 !px-2 lg:!pt-4 lg:!pb-0">
            <WizardFooter showSkipButton={showSkipButton} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OnboardingWizard;
