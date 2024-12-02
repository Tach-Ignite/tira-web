/* eslint-disable react/no-unstable-nested-components */

'use client';

import CtaSection from '@components/cta';
import {
  ArrowRightIcon,
  OutlinedClosedLockIcon,
  UserCircleIcon,
} from '@src/icons';
import PlaceholderCTAImage from '@public/assets/placeholder-cta-sections.png';
import { TachColorAuthPages } from '@src/routes';

const AdminPortalData = {
  title: 'Explore the Admin Portal',
  subTitle: '',
  description1: `<div>Gain full control and manage all aspects of the system through the powerful admin portal. From managing users and content to configuring key settings, the admin portal provides a seamless interface for administrators to oversee the platform’s functionality.</div><div class="mt-4">Start your demo and experience the full capabilities of TIRA-WEB’ admin tools.</div>`,
  description2: '',
  image: PlaceholderCTAImage,
  listItems: [
    {
      checked: true,
      icon: <UserCircleIcon className="h-5 w-5 text-neutral dark:text-white" />,
      description: 'Email: admin@example.com',
    },
    {
      checked: true,
      icon: (
        <OutlinedClosedLockIcon className="h-6 w-6 text-neutral dark:text-white" />
      ),
      description: 'Password: admin@Password1',
    },
  ],
};

function ExploreAdminPortal() {
  const buttonLink = `${process.env.APP_URL}${TachColorAuthPages.Login}`;

  return (
    <CtaSection
      id="admin-portal"
      type="default"
      sectionData={AdminPortalData}
      sectionProperties={{
        titleClassName:
          'lm:text-[42px] font-bold lm:leading-[50px] text-[24px] mb-[16px] flex justify-start w-full text-black dark:text-white',
        imagePosition: 'left',
        leftComponentAnimation: 'animate-slide-in-bottom',
        rightComponentAnimation: 'animate-fadeInUp',
        buttonLink,
        btnClassName: '!bg-primary dark:text-white hover:!opacity-80',
        btnGradient: '',
        buttonText: 'Explore Admin Portal',
        linkType: 'button',
        showDivider: false,
        isOpenInNewTab: true,
        buttonIcon: () => <ArrowRightIcon size={20} className="ml-2" />,
      }}
      className="md:pt-[30px] pt-[10px] pb-2 "
    />
  );
}

export default ExploreAdminPortal;
