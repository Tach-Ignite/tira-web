/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */

'use client';

import { FlowBiteButton as Button } from '@src/flowbite';
import Image from 'next/image';
import Link from 'next/link';
import { CustomerRoutes } from '@src/routes';
import ProfileCompletedImage from '../../../../../../public/assets/profile_completed.png';

interface ProfileSubmittedProps {
  withoutImage?: boolean;
  title: string;
  description: string;
}

function ProfileSubmitted(props: ProfileSubmittedProps) {
  const { description, title, withoutImage } = props || {};

  return (
    <div className="flex flex-col gap-5 mt-24 mb-24 items-center">
      <div className="font-semibold text-[40px] leading-[48px] dark:bg-text-gradient text-center dark:bg-clip-text dark:text-transparent text-black">
        {title}
      </div>
      <div className="dark:text-white xxl:w-[50%] xl:w-[45%] lm:w-[75%] w-[100%] mb-5 text-indigo20 font-medium text-[20px] leading-[24px] text-center">
        {description}
      </div>
      {withoutImage ? null : (
        <Image
          src={ProfileCompletedImage}
          alt="Profile_completed"
          width={ProfileCompletedImage.width}
          height={ProfileCompletedImage.height}
        />
      )}
      <div className="flex gap-3">
        <Link href={CustomerRoutes.MyAccount} className="mt-5">
          <Button
            size="sm"
            theme={{
              color: {
                info: 'dark:!bg-aqua !bg-indigo20 text-white dark:text-black hover:!bg-opacity-80',
              },
              size: {
                sm: 'px-6 py-2.5 text-[16px] leading-[24px] font-medium',
              },
            }}
          >
            Back to My Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ProfileSubmitted;
