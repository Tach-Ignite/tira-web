'use client';

import { Button } from '@src/atoms';
import { NextArrowIcon, BackArrowIcon } from '@src/icons';
import { WizardFooterProps } from './types';

function WizardFooter(props: WizardFooterProps) {
  const {
    onHandleNext,
    onHandleLastButton,
    onHandleBack,
    shouldDisableBackButton,
    shouldDisableLastButton,
    shouldDisableNextButton,
    lastButtonText,
  } = props;

  return (
    <div className="flex flex-col lg:!flex-row gap-10 lg:gap-8 flex-wrap w-full h-full items-center justify-center lg:!justify-end py-8 lg:!py-0">
      {lastButtonText ? (
        <div className="flex gap-2 max-h-[48px] items-center justify-center p-[1px]">
          <Button
            className="w-full h-full inline-flex items-center justify-center min-w-[200px] max-h-[48px] border-none !bg-transparent dark:!bg-transparent md:-ml-4 !ring-0 focus:!ring-0 focus-visible:!outline-none"
            onClick={onHandleLastButton}
            disabled={shouldDisableLastButton}
          >
            <span className="h-full inline-flex justify-center items-center text-transparent bg-clip-text dark:bg-wizard-btn-gradient bg-gray-400">
              Not Sure?
            </span>
            <span className="pl-2 h-full inline-flex justify-center items-center underline bg-clip-text text-textLink dark:text-textLink-dark">
              {lastButtonText || 'Skip'}
            </span>
          </Button>
        </div>
      ) : null}
      <div className="grid grid-cols-2 lg:!grid-cols-1 gap-1">
        <div className="lg:!hidden inline-flex w-fit items-center justify-center py-0 px-2">
          <div className="relative h-[42px] w-[140px] items-center justify-center p-[1px]">
            <Button
              className={`max-w-[140px] max-h-[48px] border-[1px] inline-flex items-center justify-center !bg-transparent !ring-0 focus:!ring-0 focus-visible:!outline-none gap-0 ${shouldDisableBackButton || typeof onHandleBack !== 'function' ? '!bg-surfaceDisabled dark:!bg-surfaceDisabled-dark !border-disabledBorder dark:!border-disabledBorder-dark' : 'border-action !bg-transparent dark:!bg-transparent border-action dark:!dark:border-action-dark'}`}
              onClick={onHandleBack}
              disabled={
                shouldDisableBackButton || typeof onHandleBack !== 'function'
              }
            >
              <span className={`"w-full h-full grid grid-cols-2 gap-4`}>
                <BackArrowIcon
                  className={`w-[20px] h-full mx-1 ${shouldDisableBackButton || typeof onHandleBack !== 'function' ? '!text-disabledText' : 'text-action'}`}
                />
                <span
                  className={`"w-full h-full inline-flex justify-center items-center font-[600] text-[16px] !leading-[24px] ${shouldDisableBackButton || typeof onHandleBack !== 'function' ? '!text-disabledBtnText dar:!text-!text-disabledBtnText' : 'text-action'}`}
                >
                  Back
                </span>
              </span>
            </Button>
          </div>
        </div>
        <Button
          className={`max-w-[140px] max-h-[48px] border-[1px] inline-flex items-center justify-center !bg-transparent !ring-0 focus:!ring-0 focus-visible:!outline-none gap-0 ${shouldDisableNextButton ? '!bg-surfaceDisabled dark:!bg-surfaceDisabled-dark !border-disabledBorder dark:!border-disabledBorder-dark' : 'border-action !bg-transparent dark:!bg-transparent border-action dark:!dark:border-action-dark'}`}
          onClick={onHandleNext}
          disabled={shouldDisableNextButton}
        >
          <span className={`"w-full h-full grid grid-cols-2 gap-4`}>
            <span
              className={`"w-full h-full inline-flex justify-center items-center font-[600] text-[16px] !leading-[24px] ${shouldDisableNextButton ? '!text-disabledBtnText dar:!text-!text-disabledBtnText' : 'text-action'}`}
            >
              Next
            </span>
            <NextArrowIcon
              className={`w-[20px] h-full mx-1 ${shouldDisableNextButton ? '!text-disabledText' : 'text-action'}`}
            />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default WizardFooter;
