'use client';

import CtaSection from '@components/cta';
import { CodeIcon, FiLoginIcon, ToolsIcon } from '@src/icons';

const PowerUtilitiesData = {
  title: 'Powerful Utilities',
  subTitle: '',
  description1:
    'Includes essential utilities to enhance development and operations:',
  description2: '',
  listItems: [
    {
      checked: true,
      icon: <CodeIcon className="h-5 w-5 text-neutral-light dark:text-white" />,
      description: 'Dev Container',
    },
    {
      checked: true,
      icon: (
        <FiLoginIcon className="h-5 w-5 text-neutral-light dark:text-white" />
      ),
      description: 'Logging',
    },
  ],
  icon: <ToolsIcon className="h-48 w-48 text-neutral-light dark:text-white" />,
};

function PowerfulUtilities() {
  return (
    <CtaSection
      id="power-utilities"
      type="default"
      sectionData={PowerUtilitiesData}
      sectionProperties={{
        titleClassName:
          'xl:text-[42px] font-bold xl:leading-[50px] text-[32px] mb-[16px] flex justify-start w-full text-black dark:text-white ',
        imagePosition: 'right',
        leftComponentAnimation: 'animate-slide-in-bottom',
        rightComponentAnimation: 'animate-fadeInUp',
        showDivider: false,
        btnClassName:
          '!border-neutral-light !border-opacity-10  bg-inherit dark:!bg-transparent !border-opacity-100 !text-neutral-800 dark:!text-white hover:bg-neutral !bg-opacity-5',
        btnGradient: '',
        isOpenInNewTab: true,
        buttonText: '',
        buttonLink: 'https://github.com/Tach-Ignite/tira-web#readme',
        linkType: 'button',
      }}
      className="md:pt-[30px] pt-[10px] pb-2"
    />
  );
}

export default PowerfulUtilities;
