'use client';

import { Button } from '@src/atoms';
import { WizardFooterProps } from './types';

function WizardFooter(props: WizardFooterProps) {
  const {
    onHandleNext,
    onHandleLastButton,
    shouldDisableLastButton,
    shouldDisableNextButton,
    lastButtonText,
  } = props;

  return (
    <div className="flex gap-10 flex-wrap w-full h-full items-center justify-center md:!justify-end">
      {lastButtonText ? (
        <div className="flex gap-0 max-h-[42px] items-center justify-center p-[1px]">
          <Button
            className="w-full h-full inline-flex items-center justify-center min-w-[200px] max-h-[42px] border-none !bg-transparent dark:!bg-transparent md:-ml-4 !ring-0 focus:!ring-0 focus-visible:!outline-none"
            onClick={onHandleLastButton}
            disabled={shouldDisableLastButton}
          >
            <span className="h-full inline-flex justify-center items-center text-transparent bg-clip-text dark:bg-wizard-btn-gradient bg-gray-400">
              Not Sure?
            </span>
            <span className="pl-1 h-full inline-flex justify-center items-center text-blue-600 bg-clip-text dark:!bg-transparent bg-gray-400">
              {lastButtonText || 'Skip'}
            </span>
          </Button>
        </div>
      ) : null}
      <Button
        className="!px-14 max-w-[140px] max-h-[42px] dark:!bg-aqua rounded-3xl"
        onClick={onHandleNext}
        disabled={shouldDisableNextButton}
      >
        Next
      </Button>
    </div>
  );
}

export default WizardFooter;
