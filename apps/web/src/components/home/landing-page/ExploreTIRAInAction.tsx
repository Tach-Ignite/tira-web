'use client';

import { ArrowRightIcon } from '@src/icons';
import Link from 'next/link';
import { Button } from '@src/atoms';

function ExploreTIRAInAction() {
  return (
    <>
      <div id="explore-tira-in-action" />
      <div className="md:!px-[8rem] px-[1rem] md:pt-[50px] pt-[35px] mb-10 text-center">
        <div className="font-bold text-[48px] text-black dark:text-white">
          Explore TIRA in Action
        </div>
        <div className="mt-4 text-[18px] !leading-[24px] text-neutral-light dark:text-white">
          Experience the power of the TIRA framework through our demo app, Tach
          Color Shop.
        </div>
        <div className="w-full flex justify-items-center">
          <Link href="/tach-color-shop" className="m-auto" target="_blank">
            <Button className="w-[160px] !bg-primary hover:!opacity-80 dark:text-white mt-4">
              Try Demo <ArrowRightIcon size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ExploreTIRAInAction;
