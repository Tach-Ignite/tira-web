/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';
import { Spinner } from '@src/atoms';

function AccountSetupCompleted({ onHandleNext }: { onHandleNext: () => void }) {
  useEffect(() => {
    setTimeout(() => {
      onHandleNext();
    }, 2000);
  }, []);
  return (
    <div className="flex flex-col items-start justify-start gap-4 py-4 md:py-4 px-2 md:!px-20 rounded-lg w-full md:!mb-10">
      <div className="flex gap-5 w-full md:!w-3/5 md:!flex-row flex-col">
        <p className="font-[600] mt-10 text-[36px] leading-[43.57px] text-primary-900 dark:text-blue-400">
          Your Account is Ready!
        </p>
      </div>
      <div className="flex gap-5 w-full md:!w-3/5 md:!flex-row flex-col">
        <p className="font-[300] mt-2 text-[20px] leading-[24.2px] text-primary-250 dark:text-gray-100">
          Thank you for completing the onboarding process. We’re setting up your
          personalized dashboard with everything you need to get started.
        </p>
      </div>
      <div className="flex gap-5 w-full md:!w-3/5 md:!flex-row flex-col py-2 md:!py-10">
        <div className="w-full h-full flex items-center justify-center">
          <Spinner
            size="lg"
            className="fill-black dark:fill-blue-400 ml-8 my-10 h-[50px] w-[50px]"
          />
        </div>
      </div>
      <div className="flex gap-5 w-full md:!w-3/5 md:!flex-row flex-col">
        <p className="font-[400] mt-2 text-[20px] leading-[24.2px] text-primary-250 dark:text-gray-100">
          In just a moment, you’ll be redirected to your dashboard.
        </p>
      </div>
      <div className="flex gap-5 w-full md:!w-3/5 md:!flex-row flex-col">
        <p className="font-[300] mt-2 text-[20px] leading-[24.2px] text-primary-250 dark:text-gray-100">
          Feel free to explore
        </p>
      </div>
    </div>
  );
}

export default AccountSetupCompleted;
