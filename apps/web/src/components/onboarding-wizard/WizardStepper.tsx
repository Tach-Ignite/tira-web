/* eslint-disable no-nested-ternary */
/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { Button } from '@src/atoms';
import { BackArrowIcon } from '@src/icons';
import { WizardStepperProps } from './types';

const completedStepsClass = 'bg-action h-4';
const filledStepClass = 'bg-action h-full';
const unfilledStepClass = 'bg-[#d9dbf0] dark:bg-white h-full';

function WizardStepper(props: WizardStepperProps) {
  const {
    steps,
    totalSteps,
    currentStepIndex = 0,
    onHandleBack,
    shouldDisableBackButton,
  } = props;
  const checkStep = totalSteps === 6 ? 5 : 3;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === checkStep;
  const isBackButtonVisible = !!(
    steps?.length > 0 &&
    steps?.length - 1 > currentStepIndex &&
    currentStepIndex > 0 &&
    typeof onHandleBack === 'function'
  );

  return (
    <div
      className={`grid grid-cols-1 lg:!grid-cols-[1fr_20fr] place-items-start ${isLastStep ? 'lg:!pl-16' : ''} rounded-lg pt-1 pb-10 w-full h-[6px] relative`}
    >
      <div className="hidden lg:!inline-flex !h-full w-[180px] rounded-lg items-center justify-end p-[1px] -ml-4">
        <Button
          className="w-full h-full border-none inline-flex items-center justify-center !bg-transparent !ring-0 focus:!ring-0 focus-visible:!outline-none gap-1"
          onClick={onHandleBack}
          disabled={shouldDisableBackButton || !isBackButtonVisible}
        >
          <span className={`"w-full h-full grid grid-cols-2 gap-2`}>
            <BackArrowIcon
              className={`w-[20px] h-full mx-1 ${shouldDisableBackButton || !isBackButtonVisible ? '!text-disabledText' : 'text-action'}`}
            />
            <span
              className={`"w-full h-full inline-flex justify-center items-center font-[600] text-[16px] !leading-[24px] ${shouldDisableBackButton || !isBackButtonVisible ? '!text-disabledText' : 'text-action'}`}
            >
              Back
            </span>
          </span>
        </Button>
      </div>

      <div className="py-8 lg:!py-0 lg:!px-24 lg:!ml-12 !w-full h-full flex items-center justify-center lg:!justify-start">
        <div className="flex items-center w-[350px] justify-center lg:!w-3/4 h-full rounded-lg gap-0">
          {steps?.map(({ title }, index) => {
            const isStepsCompleted = currentStepIndex > index;
            const isCurrentStep = currentStepIndex === index;

            return (
              <div
                key={title}
                className={`w-full flex ${index === 0 ? 'rounded-l-lg' : ''} ${index === checkStep ? 'rounded-r-lg' : ''}`}
              >
                {isStepsCompleted || isLastStep ? (
                  <div
                    className={`${completedStepsClass} w-full ${index === 0 ? 'rounded-l-lg' : ''} ${index === checkStep ? 'rounded-r-lg' : ''}`}
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
                        className={`${unfilledStepClass} ${index === checkStep ? 'rounded-r-lg' : ''}`}
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
