'use client';

import { NavigationWizardInfoProps } from './types';

function NavigationWizardInfo(props: NavigationWizardInfoProps) {
  const { title, description, additionalHeaders } = props;

  const { className, component } = additionalHeaders || {};

  return (
    <div className={`flex gap-10 justify-between ${className}`}>
      {title || description ? (
        <div className="space-y-5 lg:!w-[75%] !w-full">
          <div>
            {title ? (
              <p
                className={`text-[21px] font-medium leading-10 !text-black dark:!text-white mb-3 ${!description ? 'border-b pb-3 !border-black' : ''}`}
              >
                {title}
              </p>
            ) : null}
            {description ? (
              <p className="border-b pb-3 dark:text-white !border-black dark:!border-gray-400">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
      {component && component}
    </div>
  );
}

export default NavigationWizardInfo;
