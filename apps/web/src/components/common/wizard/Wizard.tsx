'use client';

import WizardFooter from './WizardFooter';
import WizardPage from './WizardPage';
import WizardStepper from './WizardStepper';
import { WizardProps } from './types';

function Wizard(props: WizardProps) {
  const {
    progressName,
    steps,
    currentStepIndex,
    isNextPending,
    isSavePending,
    onChangeWizardTab,
    ...footerProps
  } = props || {};

  const { onDiscardChanges, onNext, onSaveChanges } = footerProps || {};

  const isEditPage =
    typeof onDiscardChanges === 'function' &&
    typeof onNext === 'function' &&
    typeof onSaveChanges === 'function';

  return (
    <div>
      {isEditPage ? (
        <WizardStepper
          progressName={progressName}
          steps={steps}
          currentStepIndex={currentStepIndex}
        />
      ) : null}
      <div className="my-10">
        <WizardPage
          progressName={progressName}
          steps={steps}
          onChangeWizardTab={onChangeWizardTab}
          currentStepIndex={currentStepIndex}
        />
      </div>
      {isEditPage && (
        <WizardFooter
          {...footerProps}
          currentStepIndex={currentStepIndex}
          isNextPending={isNextPending}
          isSavePending={isSavePending}
        />
      )}
    </div>
  );
}

export default Wizard;
