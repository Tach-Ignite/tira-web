'use client';

import { Popover } from 'flowbite-react';
// import { Button } from '@src/flowbite';
import { Button, Spinner } from '@src/atoms';
import { NavigationWizardFooterProps } from './types';

function NavigationWizardFooter(props: NavigationWizardFooterProps) {
  const { actionButtons } = props;

  return (
    <div className="flex gap-5 lm:flex-nowrap flex-wrap justify-center md:!justify-end pt-4">
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
              className={`py-3 !bg-transparent dark:text-aqua text-indigo20 border border-indigo20 dark:border-aqua hover:!bg-opacity-80 ${className}`}
              size="sm"
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
