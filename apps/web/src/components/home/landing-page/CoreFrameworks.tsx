'use client';

import CtaSection from '@components/cta';
import {
  CodeIcon,
  NestjsIcon,
  NextjsFillIcon,
  TailwindCssFillIcon,
} from '@src/icons';

const CoreFrameworksData = {
  title: 'Core Frameworks',
  subTitle: '',
  description1:
    'TIRA-WEB is built on cutting-edge technologies to ensure high performance and flexibility:',
  description2: '',
  listItems: [
    {
      checked: true,
      icon: <TailwindCssFillIcon className="w-6 h-6 text-[#209DB3]" />,
      description: 'Tailwind CSS',
    },
    {
      checked: true,
      icon: <NextjsFillIcon className="w-7 h-7 dark:text-white text-black" />,
      description: 'Next.js',
    },
    {
      checked: true,
      icon: <NestjsIcon className="w-7 h-7 text-danger" />,
      description: 'NestJs',
    },
  ],
  icon: <CodeIcon className="h-48 w-48 text-neutral dark:text-white" />,
};

function CoreFrameworks() {
  return (
    <CtaSection
      id="core-frameworks"
      type="default"
      sectionData={CoreFrameworksData}
      sectionProperties={{
        titleClassName:
          'xl:text-[42px] font-bold xl:leading-[50px] text-[32px] mb-[16px] flex justify-start w-full text-black dark:text-white ',
        imagePosition: 'left',
        leftComponentAnimation: 'animate-slide-in-bottom',
        rightComponentAnimation: 'animate-fadeInUp',
        showDivider: false,
        btnClassName:
          'border-neutral-light/10 !border-opacity-10 bg-inherit dark:!bg-transparent border-neutral-light/100 !text-neutral-800 dark:!text-white hover:bg-neutral !bg-opacity-5',
        btnGradient: '',
        isOpenInNewTab: true,
        buttonText: 'Learn More',
        buttonLink: 'https://github.com/Tach-Ignite/tira-web#readme',
        linkType: 'button',
      }}
      className="md:pt-[100px] pt-[30px] pb-10"
    />
  );
}

export default CoreFrameworks;
