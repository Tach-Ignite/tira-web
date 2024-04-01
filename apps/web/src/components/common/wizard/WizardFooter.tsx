'use client';

import { Button } from '@src/atoms/Button';
import { UserProfileWizard } from '@components/customer/account/profile/ProfileWizard';
import { Spinner } from '@src/atoms';
import { WizardFooterProps } from './types';

function WizardFooter(props: WizardFooterProps) {
  const {
    onDiscardChanges,
    onSaveChanges,
    onNext,
    currentStepIndex = 0,
    isNextPending,
    isSavePending,
    updateButtonLabel,
    shouldDisableSave,
  } = props;

  const isLastWizard = currentStepIndex === UserProfileWizard.Links;

  const lastStepButtonLabel = isLastWizard ? updateButtonLabel : 'Next';

  return (
    <div className="flex gap-5 lm:flex-nowrap flex-wrap justify-end">
      <Button
        className="py-3"
        size="sm"
        onClick={onDiscardChanges}
        theme={{
          color: {
            info: '!bg-transparent dark:text-aqua text-indigo20 border border-indigo20 dark:border-aqua hover:!bg-opacity-80',
          },
          size: { sm: 'px-8 text-[16px] font-medium' },
        }}
      >
        Discard Changes
      </Button>
      <Button
        className="py-3"
        size="sm"
        theme={{
          color: {
            info: '!bg-transparent dark:text-aqua text-indigo20 border border-indigo20 dark:border-aqua hover:!bg-opacity-80',
          },
          size: { sm: 'px-8 text-[16px] font-medium' },
        }}
        disabled={isSavePending || shouldDisableSave}
        onClick={onSaveChanges}
      >
        {isSavePending ? <Spinner /> : 'Save Changes'}
      </Button>
      <div>
        <Button
          className="py-3"
          size="sm"
          onClick={onNext}
          disabled={isNextPending}
          theme={{
            color: {
              info: '!bg-indigo20 dark:!bg-aqua dark:text-black text-white hover:!bg-opacity-80',
            },
            size: {
              sm: `text-[16px] font-medium ${isLastWizard ? 'px-8' : 'px-16'}`,
            },
          }}
        >
          {isNextPending ? <Spinner /> : lastStepButtonLabel}
        </Button>
      </div>
    </div>
  );
}

export default WizardFooter;
