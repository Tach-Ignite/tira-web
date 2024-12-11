/* eslint-disable react/no-unstable-nested-components */

'use client';

import CtaSection from '@components/cta';
import PlaceholderCTAImage from '@public/assets/placeholder-cta-sections.png';
import {
  ArrowRightIcon,
  OutlinedClosedLockIcon,
  UserCircleIcon,
} from '@src/icons';

const StoreFrontPortalData = {
  title: 'Experience the Customer Storefront',
  subTitle: '',
  description1:
    'Explore the intuitive and responsive shopping experience designed for e-commerce. Browse products, interact with features, and navigate the storefront to see how TIRA-WEB delivers a seamless user experience for customers.<div class="mt-4">Start your demo and see the e-commerce platform in action from the shopper’s perspective.</div>',
  description2: '',
  image: PlaceholderCTAImage,
  listItems: [
    {
      icon: <UserCircleIcon className="h-5 w-5 text-neutral dark:text-white" />,
      checked: true,
      description: 'Email: user@example.com',
    },
    {
      checked: true,
      icon: (
        <OutlinedClosedLockIcon className="h-6 w-6 text-neutral dark:text-white" />
      ),
      description: 'Password: user@Password1',
    },
  ],
};

function ExploreStorefront() {
  const buttonLink = `${process.env.APP_URL}/app/marketplace/products`;

  return (
    <CtaSection
      id="store-front"
      type="default"
      sectionData={StoreFrontPortalData}
      sectionProperties={{
        titleClassName:
          'xl:text-[42px] font-bold xl:leading-[50px] text-[32px] mb-[16px] flex justify-start w-full text-black dark:text-white bg-clip-text to-primary from-primary2 bg-gradient-to-r',
        imagePosition: 'right',
        leftComponentAnimation: 'animate-slide-in-bottom',
        rightComponentAnimation: 'animate-fadeInUp',
        buttonLink,
        btnGradient: '',
        buttonText: 'Explore Storefront',
        linkType: 'button',
        showDivider: false,
        isOpenInNewTab: true,
        btnClassName: 'w-[250px] !bg-primary dark:text-white hover:!opacity-80',
        buttonIcon: () => <ArrowRightIcon size={20} className="ml-2" />,
      }}
      className="md:pt-[30px] pt-[10px] pb-2 "
    />
  );
}

export default ExploreStorefront;
