'use client';

import CtaSection from '@components/cta';
import {
  CalendarMonthIcon,
  ClipboardCheckIcon,
  CreditCardIcon,
  WindowRestoreIcon,
} from '@src/icons';

const KeyFlowData = {
  title: 'Key Flows',
  subTitle: '',
  description1:
    'Includes critical user flows for building efficient applications:',
  description2: '',
  listItems: [
    {
      checked: true,
      icon: (
        <ClipboardCheckIcon className="h-5 w-5 text-neutral-light dark:text-white" />
      ),
      description: 'Onboarding Flow',
    },
    {
      checked: true,
      icon: (
        <CreditCardIcon className="h-5 w-5 text-gray-700 dark:text-white" />
      ),
      description: 'Payment Flow',
    },
    {
      checked: true,
      icon: (
        <CalendarMonthIcon className="h-5 w-5 text-neutral-light dark:text-white" />
      ),
      description: 'Scheduling Flow',
    },
  ],
  icon: (
    <WindowRestoreIcon className="h-48 w-48 text-neutral-light dark:text-white" />
  ),
};

function KeyFlows() {
  return (
    <CtaSection
      id="key-flow-data"
      type="default"
      sectionData={KeyFlowData}
      sectionProperties={{
        titleClassName:
          'xl:text-[42px] font-bold xl:leading-[50px] text-[32px] mb-[16px] flex justify-start w-full text-black dark:text-white',
        imagePosition: 'right',
        leftComponentAnimation: 'animate-slide-in-bottom',
        rightComponentAnimation: 'animate-fadeInUp',
        showDivider: false,
        buttonText: 'Learn More',
        btnClassName:
          '!border-neutral-light !border-opacity-10 bg-inherit dark:!bg-transparent !border-opacity-100 !text-neutral-800 dark:!text-white hover:bg-neutral !bg-opacity-5',
        btnGradient: '',
        buttonLink: 'https://github.com/Tach-Ignite/tira-web#readme',
        linkType: 'button',
        isOpenInNewTab: true,
      }}
      className="md:pt-[100px] pt-[30px] pb-2"
    />
  );
}

export default KeyFlows;
