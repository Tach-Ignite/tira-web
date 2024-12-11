/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';
import { Spinner } from '@src/atoms';
import { useOnboarding } from '@context/OnboardingContext';
import { useRouter } from 'next/navigation';
import { TachColorShopConsoleRoutes } from '@src/routes';

function AccountSetupCompleted() {
  const { onHandleNext, onboardingForm } = useOnboarding();

  const { watch } = onboardingForm;

  const { onboardingCompleted } = watch();

  const router = useRouter();

  useEffect(() => {
    setTimeout(async () => {
      await onHandleNext();
      if (onboardingCompleted) {
        router?.push(TachColorShopConsoleRoutes.Overview);
      }
    }, 2000);
  }, [onboardingCompleted]);

  return (
    <div className="grid grid-cols-1 place-items-start gap-4 lg:!gap-2 px-8 xl:!pl-24 md:pl-0 lg:!ml-24 tab-!ml-0 pb-8 w-full lg:!w-4/5">
      <div className="flex gap-5 w-full lg:!w-4/5 justify-start items-center py-16 2xl:!py-10 lg:!py-16">
        <div className="w-full h-full flex items-center justify-center">
          <Spinner
            size="lg"
            variant="dotted"
            className="fill-action dark:fill-action-dark lg:!ml-8 h-[50px] w-[50px]"
          />
        </div>
      </div>
      <div className="flex gap-5 w-full lg:!w-4/5 lg:!mt-8 justify-center items-center text-center">
        <p className="font-600 mt-2 text-[16px] leading-[24px] tab:!text-[20px] tab:!leading-[24px] text-neutral dark:!text-textBody-dark">
          In just a moment, you’ll be redirected to your dashboard.
        </p>
      </div>
      <div className="flex gap-5 w-full lg:!w-4/5 justify-center items-center">
        <p className="font-400 mt-2 text-[14px] leading-[20px] tab:!text-[16px] tab:!leading-[24px] text-neutral dark:!text-textBody-dark">
          Feel free to explore
        </p>
      </div>
    </div>
  );
}

export default AccountSetupCompleted;
