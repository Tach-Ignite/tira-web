'use client';

import CtaSection from '@components/cta';
import { LinkIcon } from '@src/icons';
import StrapiLogo from '@public/assets/strapi-logo.png';
import StripeLogo from '@public/assets/stripe-logo.jpg';
import SupabaseLogo from '@public/assets/supabase-logo.png';
import Image from 'next/image';

const PaymentIntegrationsData = {
  title: 'Platform Integrations',
  subTitle: '',
  description1:
    'Seamlessly integrates with leading platforms to enhance functionality and scalability:',
  description2: '',
  listItems: [
    {
      checked: true,
      icon: (
        <Image
          src={StripeLogo}
          alt="Stripe Logo"
          className="w-6 h-6 rounded-md"
        />
      ),
      description: 'Stripe',
    },
    {
      checked: true,
      icon: (
        <Image src={SupabaseLogo} alt="Supabase Logo" className="w-6 h-6" />
      ),
      description: 'Supabase',
    },
    {
      checked: true,
      icon: <Image src={StrapiLogo} alt="Strapi Logo" className="h-6 w-6" />,
      description: 'Strapi',
    },
  ],
  icon: <LinkIcon className="h-48 w-48 text-neutral dark:text-white" />,
};

function PlatformIntegrations() {
  return (
    <CtaSection
      id="payment-integrations"
      type="default"
      sectionData={PaymentIntegrationsData}
      sectionProperties={{
        titleClassName:
          'xl:text-[42px] font-bold xl:leading-[50px] text-[32px] mb-[16px] flex justify-start w-full text-black dark:text-white bg-clip-text to-primary from-primary2 bg-gradient-to-r',
        imagePosition: 'left',
        leftComponentAnimation: 'animate-slide-in-bottom',
        rightComponentAnimation: 'animate-fadeInUp',
        showDivider: false,
        btnClassName:
          '!border-neutral-light !border-opacity-10  bg-inherit dark:!bg-transparent !border-opacity-100 !text-neutral-800 dark:!text-white hover:bg-neutral !bg-opacity-5',
        btnGradient: '',
        isOpenInNewTab: true,
        buttonText: 'Learn More',
        buttonLink: 'https://github.com/Tach-Ignite/tira-web#readme',
        linkType: 'button',
      }}
      className="md:pt-[100px] pt-[30px] pb-2"
    />
  );
}

export default PlatformIntegrations;
