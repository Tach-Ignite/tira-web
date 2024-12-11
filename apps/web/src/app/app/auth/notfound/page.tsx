'use client';

import Image from 'next/image';

import { ArrowLeftIcon } from '@src/icons';
import Link from 'next/link';
import notFound from '../../../../../public/assets/404.png';

function NotFoundPage() {
  return (
    <div className="pt-14 flex justify-center xs:px-15">
      <div className="flex flex-col items-center rounded-[25px] bg-white dark:bg-gray-800 shadow-3xl p-6 sm:p-10 xs:p-8 xs:mx-5 mb-16">
        <Image
          alt="Home Landing"
          src={notFound}
          className="w-full aspect-[1.54] max-w-[737px] rounded-[25px] max-md:max-w-full"
        />
        <Link
          href={process.env.APP_URL || ''}
          replace
          className="relative bg-gradient-to-r my-5 w-fit rounded-lg py-2 px-10 flex items-center from-purple-600 to-blue-500 text-white dark:from-yellow-400 dark:to-red-400 dark:text-black dark:focus:ring-cyan-800"
        >
          <ArrowLeftIcon size={20} className="mr-2" /> Explore
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
