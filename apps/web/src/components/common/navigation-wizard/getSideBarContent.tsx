'use client';

/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

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
  steps?.map(({ name, url = '', onClick }, index) => {
    const isActiveStep = currentStepIndex === index;

    const onChange = () => {
      if (typeof onClick === 'function') {
        onClick();
      } else {
        onChangeWizardTab?.(index);
        setShow?.();
      }
    };

    const renderLinks = () => {
      if (url) {
        return (
          <Link
            key={name}
            className={`${linkClass} ${hoverStepClass} ${isActiveStep ? activeStepClass : ''}`}
            href={url}
          >
            {name}
          </Link>
        );
      }
      return (
        <div
          key={name}
          onClick={onChange}
          className={`${linkClass} ${hoverStepClass} ${isActiveStep ? activeStepClass : ''}`}
        >
          {name}
        </div>
      );
    };

    return name ? (
      renderLinks()
    ) : (
      <div
        key={index}
        className="h-[10px] border-b border-b-gray-200 dark:border-b-gray-700"
      />
    );
  });
