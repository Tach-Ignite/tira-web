'use client';

import { NavigationWizardPageProps } from './types';
import { getSideBarContent } from './getSideBarContent';
import NavigationWizardInfo from './NavigationWizardInfo';

function NavigationWizardPage(props: NavigationWizardPageProps) {
  const {
    steps,
    currentStepIndex = 0,
    onChangeWizardTab,
    additionalHeaders,
    showStepInfo = true,
  } = props || {};

  const { component, description, title, name } = steps[currentStepIndex] || {};

  return (
    <div className="w-full gap-x-5 grid grid-cols-1 !space-y-5 md:!grid-cols-[1fr_5fr] place-content-center">
      <div className="px-3 md:!block !hidden !space-y-5 relative md:!w-full w-auto md:!min-w-[300px]">
        {getSideBarContent(steps, currentStepIndex, onChangeWizardTab)}
      </div>
      <div className="space-y-5">
        {showStepInfo ? (
          <NavigationWizardInfo
            title={title || name}
            description={description}
            additionalHeaders={additionalHeaders}
          />
        ) : null}
        {component}
      </div>
    </div>
  );
}

export default NavigationWizardPage;
