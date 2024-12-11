/* eslint-disable no-unneeded-ternary */

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
    pageComponent,
    isFullPage = false,
    isNestedNavigationComponent,
  } = props || {};

  const { component, description, title, name } = steps[currentStepIndex] || {};

  return (
    <div
      className={`gap-x-5 grid grid-cols-1 !gap-y-5 ${isFullPage ? 'md:!grid-cols-1 place-items-center' : 'md:!grid-cols-[1fr_5fr]'} place-content-center`}
    >
      {isFullPage ? null : (
        <div className="px-3 md:!block !hidden !space-y-5 relative md:!w-full w-auto md:!min-w-[250px] lg:!min-w-[300px]">
          {getSideBarContent(steps, currentStepIndex, onChangeWizardTab)}
        </div>
      )}
      <div className={`space-y-5 mx-5 ${isFullPage ? 'md:w-3/5' : ''}`}>
        {showStepInfo ? (
          <NavigationWizardInfo
            title={title || name}
            description={description}
            additionalHeaders={additionalHeaders}
          />
        ) : null}
        {pageComponent || component}
      </div>
    </div>
  );
}

export default NavigationWizardPage;
