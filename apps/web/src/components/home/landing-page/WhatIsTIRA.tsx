/* eslint-disable react/no-unstable-nested-components */

'use client';

import CtaSection from '@components/cta';
import PlaceholderCTAImage from '@public/assets/placeholder-cta-sections.png';
import { ArrowRightIcon } from '@src/icons';

function WhatIsTIRA() {
  return (
    <CtaSection
      id="what-is-tira"
      type="default"
      sectionData={{
        title: 'What is TIRA?',
        subTitle: '',
        description1:
          'Tach Ignite Reference Architecture (TIRA) is an open-source reference architecture designed to accelerate development with best-in-class frameworks and tools.',
        image: PlaceholderCTAImage,
      }}
      sectionProperties={{
        titleClassName:
          'xl:text-[42px] font-bold xl:leading-[50px] !text-[36px] mb-[16px] flex justify-start w-full text-black dark:text-white ',
        imagePosition: 'right',
        leftComponentAnimation: 'animate-slide-in-bottom',
        rightComponentAnimation: 'animate-fadeInUp',
        showPattern: false,
        btnClassName: '!bg-primary dark:text-white hover:opacity-80',
        btnGradient: '',
        buttonLink: '#features',
        linkType: 'button',
        showDivider: false,
        buttonText: 'Learn More',
        buttonIcon: () => <ArrowRightIcon size={20} className="ml-2" />,
      }}
      className="md:pt-[50px] pt-[25px] pb-2 "
    />
  );
}

export default WhatIsTIRA;
