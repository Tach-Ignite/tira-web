import Image from 'next/image';

import { Button } from '@src/atoms';
import { ArrowLeftIcon } from '@src/icons';
import Link from 'next/link';
import { UnAuthenticatedTopNavBar } from '@components/layouts/unAuthenticated';
import notFound from '../../public/assets/404.png';

export default function NotFound() {
  return (
    <div className="h-full">
      <UnAuthenticatedTopNavBar />
      <div className="bg-light-bg-image h-full dark:bg-dark-bg-image bg-cover bg-no-repeat min-h-[75vh]">
        <div className="pt-14 flex justify-center xs:px-15">
          <div className="flex flex-col rounded-[25px] bg-white dark:bg-gray-800 shadow-3xl p-6 sm:p-10 xs:p-8 xs:mx-5 mb-16">
            <Image
              alt="Home Landing"
              src={notFound}
              className="w-full aspect-[1.54] max-w-[737px] rounded-[25px] max-md:max-w-full"
            />
            <div className="flex flex-col items-center mb-5 mt-4">
              <Link href="/" rel="noreferrer">
                <Button
                  gradientDuoTone="purpleToBlue"
                  className="flex items-center w-[200px]"
                >
                  <ArrowLeftIcon size={20} className="mr-2" /> Explore
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
