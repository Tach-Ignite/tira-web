/* eslint-disable no-nested-ternary */
/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { useOnboarding } from '@context/OnboardingContext';
import { WizardStepperProps } from './types';
import OnboardingBackButton from './OnboardingBackButton';

const completedStepsClass = 'bg-action h-4';
const filledStepClass = 'bg-action h-full';
const unfilledStepClass = 'bg-[#d9dbf0] dark:bg-white h-full';

function WizardStepper(props: WizardStepperProps) {
  const { steps } = props;
  const { totalSteps, activeStep = 0 } = useOnboarding();

  const checkStep = totalSteps - 1;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === checkStep;

  return (
    <div
      className={`grid grid-cols-1 lg:!grid-cols-[1fr_20fr] place-items-start ${isLastStep ? 'lg:!pl-16' : ''} rounded-lg pt-1 pb-10 w-full h-[6px] relative`}
    >
      <div className="hidden lg:!inline-flex !h-full w-[180px] rounded-lg items-center justify-end p-[1px] -ml-4">
        <OnboardingBackButton />
      </div>

      <div className="py-8 lg:!py-0 lg:!px-24 lg:!ml-12 !w-full h-full flex items-center justify-center lg:!justify-start">
        <div className="flex items-center w-[350px] justify-center lg:!w-3/4 h-full rounded-lg gap-0">
          {steps?.map(({ title }, index) => {
            const isStepsCompleted = activeStep > index;
            const isCurrentStep = activeStep === index;
            const isLastStepIndex = index === checkStep;

            return (
              <div
                key={title}
                className={`w-full flex ${index === 0 ? 'rounded-l-lg' : ''} ${isLastStepIndex ? 'rounded-r-lg' : ''}`}
              >
                {isStepsCompleted || isLastStep ? (
                  <div
                    className={`${completedStepsClass} w-full ${index === 0 ? 'rounded-l-lg' : ''} ${isLastStepIndex ? 'rounded-r-lg' : ''}`}
                  />
                ) : isCurrentStep ? (
                  <div className="w-full flex h-4">
                    <div className="w-[20%]">
                      <div
                        className={`${filledStepClass} ${isFirstStep ? 'rounded-l-lg' : ''}`}
                      />
                    </div>
                    <div className="w-[80%]">
                      <div className={unfilledStepClass} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex h-4">
                    <div className="w-full">
                      <div
                        className={`${unfilledStepClass} ${isLastStepIndex ? 'rounded-r-lg' : ''}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WizardStepper;
