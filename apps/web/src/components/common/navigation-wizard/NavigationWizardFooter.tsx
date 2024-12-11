'use client';

import { Popover } from 'flowbite-react';
// import { Button } from '@src/flowbite';
import { Button, Spinner } from '@src/atoms';
import { NavigationWizardFooterProps } from './types';

function NavigationWizardFooter(props: NavigationWizardFooterProps) {
  const { actionButtons } = props;

  return (
    <div className="flex sm:!mx-10 !mx-5 gap-5 lm:flex-nowrap flex-wrap justify-center md:!justify-end pt-4">
      {actionButtons?.map(
        ({
          label,
          shouldDisable,
          onClick,
          className = '',
          isPending,
          popover,
        }) => {
          const { show: showPopover, content: popoverContent } = popover || {};

          const renderButton = () => (
            <Button
              className={`py-3 !bg-transparent dark:text-primary text-primary border border-primary dark:border-primary hover:!bg-opacity-80 ${className}`}
              size="sm"
              key={label}
              onClick={onClick}
              disabled={shouldDisable}
              theme={{
                size: { sm: 'px-8 text-[16px] font-medium' },
              }}
            >
              {isPending ? <Spinner /> : label}
            </Button>
          );

          return showPopover ? (
            <Popover content={popoverContent} trigger="hover" placement="top">
              {renderButton()}
            </Popover>
          ) : (
            renderButton()
          );
        },
      )}
    </div>
  );
}

export default NavigationWizardFooter;
