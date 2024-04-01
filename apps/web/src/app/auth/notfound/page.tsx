import Image from 'next/image';

import { Button } from '@src/atoms';
import { ArrowLeftIcon } from '@src/icons';
import Link from 'next/link';
import notFound from '../../../../public/assets/404.png';

function ViewProductPage() {
  return (
    <div className="flex flex-col rounded-[25px] bg-white dark:bg-gray-800 shadow-3xl p-6 sm:p-10 xs:p-8 xs:mx-5 mb-16">
      <Image
        alt="Home Landing"
        src={notFound}
        className="w-full aspect-[1.54] max-w-[737px] max-md:max-w-full"
      />
      <div className="flex flex-col items-center mb-5">
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
  );
}

export default ViewProductPage;
