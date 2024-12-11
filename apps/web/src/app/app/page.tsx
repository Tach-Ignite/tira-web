/* eslint-disable react/no-unstable-nested-components */

'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import CtaSection from '@components/cta';
import { ArrowRightIcon } from '@src/icons';
import { Button } from '@src/atoms';
import { useEffect } from 'react';
import Link from 'next/link';
import { CustomerRoutes, AdminRoutes, TachColorAuthPages } from '@src/routes';
import PlaceholderCTAImage from '../../../public/assets/placeholder-cta-sections.png';
import HeaderPlaceHolderImage from '../../../public/assets/tach-shop-header-placeholder.png';

const AdminPortalData = {
  title: 'Admin﻿ Features',
  subTitle: '',
  description1: `<div>Users with the Admin role could manage inventory including adding,<br/> editing, and deleting products, services, categories, users, and orders <br/> through the admin portal.</div>`,
  description2: '',
  image: PlaceholderCTAImage,
  listItems: [
    {
      checked: true,
      description: 'Admin Dashboard',
    },
    {
      checked: true,
      description: 'Product and Service Management',
    },
    {
      checked: true,
      description: 'Order Management',
    },
    {
      checked: true,
      description: 'Booking Management',
    },
    {
      checked: true,
      description: 'User Management',
    },
    {
      checked: true,
      description: 'Content Management',
    },
    {
      checked: true,
      description: 'Settings and Configurations',
    },
    {
      checked: true,
      description: 'Communication and Support',
    },
    {
      checked: true,
      description: 'Notifications Management',
    },
  ],
};

const onBoardingPortalData = {
  title: 'Onboarding',
  subTitle: '',
  description1: '',
  description2: '',
  image: PlaceholderCTAImage,
  listItems: [
    {
      checked: true,
      description:
        'Sign in/sign up via credentials and SSO providers  (Google, LinkedIn, Microsoft, GitHub)',
    },
    {
      checked: true,
      description: 'User onboarding flow',
    },
    {
      checked: true,
      description: 'Password recovery and reset',
    },
    {
      checked: true,
      description: 'Email verification',
    },
  ],
};

const ProfileManagementData = {
  title: 'Profile Management',
  subTitle: '',
  description1: ``,
  description2: '',
  image: PlaceholderCTAImage,
  listItems: [
    {
      checked: true,
      description: 'Edit personal information ',
    },
    {
      checked: true,
      description: 'Change password',
    },
  ],
};

const ProductAndServiceData = {
  title: 'Product and Service Browsing',
  subTitle: '',
  description1: '',
  description2: '',
  listItems: [
    {
      checked: true,
      description: 'View product list and details',
    },
    {
      checked: true,
      description: 'View service list and details',
    },
    {
      checked: true,
      description:
        'Search and filter products/services by category, price, etc.',
    },
    {
      checked: true,
      description: 'View announcements and promotional content',
    },
  ],
  image: PlaceholderCTAImage,
};

const CheckoutAndPaymentData = {
  title: 'Checkout and Payment',
  subTitle: '',
  description1: '',
  description2: '',
  listItems: [
    {
      checked: true,
      description: 'Checkout process',
    },
    {
      checked: true,
      description: 'Cart features',
    },
    {
      checked: true,
      description: 'Payment management',
    },
  ],
  image: PlaceholderCTAImage,
};

function TachColorShop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window?.location?.hash?.substring(1);
      if (hash) {
        const element = document?.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname, searchParams]);

  return (
    <div className="bg-white dark:!bg-neutral bg-no-repeat flex flex-col items-center gap-10 xs:gap-20 max-[655px]:py-8">
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col justify-center items-center md:!px-[8rem] px-[1rem] md:pt-[50px] pt-[35px] mb-10 text-center">
          <div className="w-3/5 px-8 font-bold text-[48px] dark:text-white">
            Explore Tach Color Shop Capabilities
          </div>
          <div className="w-3/5 mt-4 px-8 text-xl text-neutral dark:text-white font-light">
            Tach Color Shop is a fictional e-commerce platform built with TIRA,
            showcasing key functionalities and features of the framework.
          </div>
          <div className="w-full flex justify-items-center">
            <Link href="#admin-features" className="m-auto">
              <Button className="w-[160px] mt-4 !bg-primary dark:text-white hover:opacity-80 focus:!ring-0">
                Learn More
              </Button>
            </Link>
          </div>
          <div className="w-full flex justify-center items-center py-8">
            <Image
              src={HeaderPlaceHolderImage}
              alt="About Image"
              width={500}
              height={300}
              quality={70}
              className="w-2/3"
              priority
            />
          </div>
        </div>
        <CtaSection
          id="admin-features"
          type="default"
          sectionData={AdminPortalData}
          sectionProperties={{
            titleClassName:
              'lm:text-[42px] font-bold lm:leading-[50px] !text-[36px] mb-[16px] flex justify-start w-full text-black dark:text-white',
            imagePosition: 'left',
            imageClassName:
              '!w-full h-[500px] sm:max-h-[500px] aspect-[1] rounded-lg',
            leftComponentAnimation: 'animate-slide-in-bottom',
            rightComponentAnimation: 'animate-fadeInUp',
            buttonLink: `${AdminRoutes.Dashboard}`,
            buttonText: 'Explore Admin Portal',
            linkType: 'button',
            showDivider: false,
            btnClassName:
              'w-[220px] flex items-center !bg-primary dark:text-white hover:!opacity-80',
            btnGradient: '',
            buttonIcon: () => <ArrowRightIcon size={20} className="ml-2" />,
            checkListClassName: 'md:!w-[500px] dark:text-white w-full',
            ctaContainerClassName: 'md:!px-[12rem]',
          }}
          className="md:pt-[50px] pt-[30px] pb-2"
        />
        <CtaSection
          id="onboarding"
          type="default"
          sectionData={onBoardingPortalData}
          sectionProperties={{
            titleClassName:
              'xl:text-[42px] font-bold xl:leading-[50px] !text-[36px] mb-[16px] flex justify-start w-full text-black dark:text-white',
            imagePosition: 'right',
            imageClassName:
              '!w-full h-[500px] sm:max-h-[500px] aspect-[1] rounded-lg',
            leftComponentAnimation: 'animate-slide-in-bottom',
            rightComponentAnimation: 'animate-fadeInUp',
            buttonLink: `${TachColorAuthPages.SignUp}`,
            buttonText: 'Try Onboarding',
            linkType: 'button',
            showDivider: false,
            btnClassName:
              'w-[220px] flex items-center !bg-primary dark:text-white hover:!opacity-80',
            btnGradient: '',
            buttonIcon: () => <ArrowRightIcon size={20} className="ml-2" />,
            checkListClassName: 'md:!w-[500px] dark:text-white w-full',
            ctaContainerClassName: 'md:!px-[12rem]',
          }}
          className="md:pt-[30px] pt-[10px] pb-2 "
        />
        <CtaSection
          id="profile-management"
          type="default"
          sectionData={ProfileManagementData}
          sectionProperties={{
            titleClassName:
              'xl:text-[42px] font-bold xl:leading-[50px] !text-[36px] mb-[16px] flex justify-start items-start !w-full text-black dark:text-white ',
            imagePosition: 'left',
            imageClassName:
              '!w-full h-[500px] sm:max-h-[500px] aspect-[1] rounded-lg',
            leftComponentAnimation: 'animate-slide-in-bottom',
            rightComponentAnimation: 'animate-fadeInUp',
            buttonLink: `${CustomerRoutes.MyAccount}`,
            buttonText: 'Explore Profile',
            linkType: 'button',
            showDivider: false,
            btnClassName:
              'w-[220px] flex items-center !bg-primary dark:text-white hover:!opacity-80',
            btnGradient: '',
            buttonIcon: () => <ArrowRightIcon size={20} className="ml-2" />,
            checkListClassName: 'md:!w-[500px] dark:text-white w-full',
            ctaContainerClassName: 'md:!px-[12rem]',
          }}
          className="md:pt-[30px] pt-[10px] pb-2 "
        />
        <CtaSection
          id="product-and-services"
          type="default"
          sectionData={ProductAndServiceData}
          sectionProperties={{
            titleClassName:
              'xl:text-[42px] font-bold xl:leading-[50px] !text-[36px] mb-[16px] flex justify-start w-full text-black dark:text-white ',
            imagePosition: 'right',
            imageClassName:
              '!w-full h-[500px] sm:max-h-[500px] aspect-[1] rounded-lg',
            leftComponentAnimation: 'animate-slide-in-bottom',
            rightComponentAnimation: 'animate-fadeInUp',
            buttonText: 'Explore Marketplace',
            linkType: 'button',
            showDivider: false,
            buttonLink: `${CustomerRoutes.MarketPlace}`,
            btnClassName:
              'w-[220px] flex items-center !bg-primary dark:text-white hover:!opacity-80',
            btnGradient: '',
            buttonIcon: () => <ArrowRightIcon size={20} className="ml-2" />,
            checkListClassName: 'md:!w-[500px] dark:text-white w-full',
            ctaContainerClassName: 'md:!px-[12rem]',
          }}
          className="md:pt-[30px] pt-[10px] pb-2 "
        />
        <CtaSection
          id="checkout-and-payments"
          type="default"
          sectionData={CheckoutAndPaymentData}
          sectionProperties={{
            titleClassName:
              'xl:text-[42px] font-bold xl:leading-[50px] !text-[36px] mb-[16px] flex justify-start w-full text-black dark:text-white',
            imagePosition: 'left',
            imageClassName:
              '!w-full h-[500px] sm:max-h-[500px] aspect-[1] rounded-lg',
            leftComponentAnimation: 'animate-slide-in-bottom',
            rightComponentAnimation: 'animate-fadeInUp',
            showDivider: false,
            buttonText: 'Try Checkout',
            buttonLink: '/cart',
            linkType: 'button',
            btnClassName:
              'w-[220px] flex items-center !bg-primary dark:text-white hover:!opacity-80',
            btnGradient: '',
            buttonIcon: () => <ArrowRightIcon size={20} className="ml-2" />,
            checkListClassName: 'md:!w-[500px] dark:text-white w-full',
            ctaContainerClassName: 'md:!px-[12rem]',
          }}
          className="md:pt-[30px] pt-[10px] pb-2 "
        />
      </div>
    </div>
  );
}

export default TachColorShop;
