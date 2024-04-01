/* eslint-disable react/no-array-index-key */

'use client';

import { WizardStepperProps } from './types';

const completedStepsClass = 'dark:bg-aqua bg-indigo20 h-2';
const inCompletedStepsClass = 'bg-gray70 dark:bg-white h-1';

function WizardStepper(props: WizardStepperProps) {
  const { progressName, steps, currentStepIndex = 0 } = props;

  const activeStep = Number(currentStepIndex) + 1;

  return (
    <div className="dark:bg-dark10 bg-pink20 rounded-lg px-5 py-6 border-gradient stepper-gradient relative">
      <p className="font-medium  text-[20px] pb-5 leading-[16px] text-black dark:text-white">
        Complete {progressName} Progress
      </p>
      <p className="text-[14px] text-black pb-3 dark:text-white leading-[11px]">
        Step {activeStep || 0} of {steps?.length}
      </p>
      <div className="flex gap-2 items-center">
        {steps?.map(({ name }, index) => {
          const isStepsCompleted = currentStepIndex >= index;

          return (
            <div
              key={name}
              className={`${isStepsCompleted ? completedStepsClass : inCompletedStepsClass} rounded-[35px] w-full`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WizardStepper;
