'use client';

import React from 'react';
import { useThemeMode } from '@src/flowbite';
import Image from 'next/image';
import { PageInfo } from '../../components/home';
import DemoLightLandingImage from '../../../public/assets/demo-light-landing-img.webp';
import DemoDarkLandingImage from '../../../public/assets/demo-dark-landing-img.webp';

function DemoLandingPage() {
  const { mode } = useThemeMode();

  return (
    <div className="bg-light-bg-image h-full justify-between dark:bg-dark-bg-image bg-cover bg-no-repeat flex flex-col gap-48 max-[1100px]:gap-24 max-[600px]:gap-20">
      <div className="flex max-[1150px]:flex-col max-[1150px]:gap-10 min-[300px]:justify-center min-[1150px]:justify-between pt-32 lg:px-20 sm:px-10 xs:px-5 min-[1700px]:px-80 min-[2700px]:px-[500px]">
        <PageInfo
          title="Customer Storefront"
          titleClassName="max-[700px]:text-4xl min-[700px]:text-5xl"
          navigateTarget="_blank"
          description={
            <div className="text-gray-500 dark:text-gray-400 max-[700px]:text-lg min-[700px]:text-xl">
              <div>Email: user@example.com</div>
              <div>Password: user@Password1</div>
            </div>
          }
          navigateUrl="announcement"
        />
        <PageInfo
          title="Admin Dashboard"
          titleClassName="max-[700px]:text-4xl min-[700px]:text-5xl"
          description={
            <div className="text-gray-500 dark:text-gray-400 max-[700px]:text-lg min-[700px]:text-xl">
              <div>Email: admin@example.com</div>
              <div>Password: admin@Password1</div>
            </div>
          }
          navigateUrl="admin/dashboard"
          navigateTarget="_blank"
        />
      </div>
      <div className="mb-[-5px] pb-0">
        <Image
          alt="Home Landing"
          className="w-screen"
          width="0"
          height="0"
          src={mode === 'dark' ? DemoDarkLandingImage : DemoLightLandingImage}
        />
      </div>
    </div>
  );
}

export default DemoLandingPage;
