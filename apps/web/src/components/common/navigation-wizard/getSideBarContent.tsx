/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import Link from 'next/link';
import { WizardStepType } from './types';

const activeStepClass =
  'border-l-[4px] border-primary dark:!border-primary text-primary rounded dark:!text-primary dark:hover:!text-black';

const hoverStepClass =
  'hover:!text-black hover:bg-primary dark:hover:bg-primary hover:shadow-2xl';

const linkClass =
  'w-full flex items-center pl-2 py-4 pr-2 text-sm font-medium uppercase text-black dark:text-white cursor-pointer capitalize gap-3 text-[16px] leading-[24px]';

export const getSideBarContent = (
  steps: WizardStepType[],
  currentStepIndex: number,
  onChangeWizardTab?: (index: number) => void,
  setShow?: () => void,
) =>
  steps?.map(
    ({ name, component, url = '', isPageComponent = false }, index) => {
      const isActiveStep = currentStepIndex === index;

      const onChange = () => {
        onChangeWizardTab?.(index);
        setShow?.();
      };

      return component && !isPageComponent ? (
        <div
          key={name}
          onClick={onChange}
          className={`${linkClass} ${hoverStepClass} ${isActiveStep ? activeStepClass : ''}`}
        >
          {name}
        </div>
      ) : (
        <Link
          key={name}
          className={`${linkClass} ${hoverStepClass} ${isActiveStep ? activeStepClass : ''}`}
          href={url}
        >
          {name}
        </Link>
      );
    },
  );
