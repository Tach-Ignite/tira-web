import React, { useCallback } from 'react';
import { CircleCheckMarkIcon, WarningCircleIcon } from '@src/icons';
import Link from 'next/link';
import { StepperProps } from './types';

function Stepper(props: StepperProps) {
  const {
    steps,
    completedSteps,
    inCompletedSteps,
    currentStep,
    className = '',
  } = props;

  const renderStepperIcon = useCallback(
    (currentIndex: number) => {
      if (inCompletedSteps?.includes(currentIndex)) {
        return (
          <WarningCircleIcon
            className="text-red-600  dark:text-red-400"
            size={20}
          />
        );
        // eslint-disable-next-line no-else-return
      } else if (completedSteps?.includes(currentIndex)) {
        return (
          <CircleCheckMarkIcon
            className="text-green-500 dark:text-green-400"
            size={20}
          />
        );
      }

      return (
        <div
          className={`h-[20px] w-[20px] pt-[2px] rounded-[50%] border ${currentStep === currentIndex ? 'border-indigo-600 dark:border-indigo-600' : 'border-gray-500 dark:border-gray-400'} flex justify-center items-center text-xs leading-[15px]`}
        >
          {currentIndex + 1}
        </div>
      );
    },
    [completedSteps, inCompletedSteps, currentStep],
  );

  return (
    <div
      className={`border flex border-gray-300 overflow-auto items-center dark:border-gray-700 bg-white rounded-lg p-4 dark:bg-gray-800 shadow-sm w-full ${className}`}
    >
      {steps?.map((step, index) => {
        const isLastStep = index !== steps.length - 1;
        const isCurrentStep = index === currentStep;

        return (
          <React.Fragment key={step}>
            <Link
              href={`#${step}`}
              className={`flex gap-2 items-center font-medium ${isCurrentStep ? 'text-indigo-600 dark:text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {renderStepperIcon(index)}
              <div className="text-base leading-[20px] w-max">{step}</div>
            </Link>
            {isLastStep && (
              <div className="flex-1 h-[2px] mx-[5%] max-[1500px]:px-[2%] max-[1500px]:mx-[2%] bg-gray-500 dark:bg-gray-400" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Stepper;
