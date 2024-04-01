'use client';

import Image from 'next/image';
import { useThemeMode } from '@src/flowbite';
import { UnAuthenticatedTopNavBar } from '@components/layouts/unAuthenticated';
import { PageInfo } from '../components/home';
import HomeLightLandingImage from '../../public/assets/home-light-landing-img.png';
import HomeDarkLandingImage from '../../public/assets/home-dark-landing-img.png';

function Home() {
  const { mode } = useThemeMode();

  return (
    <div className="h-full">
      <UnAuthenticatedTopNavBar />
      <div className="bg-light-bg-image h-full dark:bg-dark-bg-image bg-cover bg-no-repeat flex flex-col items-center gap-10 xs:gap-20">
        <div className="flex justify-center max-[600px]:pt-20 min-[600px]:pt-32">
          <PageInfo
            title="Tach Ignite"
            titleClassName="max-[600px]:text-4xl min-[600px]:text-6xl"
            description={
              <div className="text-gray-500 dark:text-gray-400 text-xl text-center">
                Web Reference Architecture
              </div>
            }
            buttonName="Try The Demo"
            navigateUrl="demo"
          />
        </div>
        <div className="mb-[-5px] px-3 pb-0 md:px-10 md:pb-0 xs:px-5 xs:pb-0">
          <Image
            alt="Home Landing"
            width="0"
            height="0"
            src={mode === 'dark' ? HomeDarkLandingImage : HomeLightLandingImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
