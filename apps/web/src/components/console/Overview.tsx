/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */

'use client';

import { useState, useEffect } from 'react';
import { AccountSettingsRoutes } from '@src/routes';
import {
  useGetUserProfile,
  // useGetCurrentUser,
  // useUpdateUserProfileRole,
  // useUpdateUserProfile,
} from '@queries/useUsersQuery';
import { Spinner } from '@src/atoms';
import ConsoleProgressCard from './ConsoleProgressCard';
import RecentActivities from './RecentActivities';

const totalAccountSettings = 5;

function UserConsole() {
  const [completedAccountSettings, setCompletedAccountSettings] = useState(1);

  const { data: profileData, isLoading } = useGetUserProfile();

  const {
    phoneNumber,
    countryRegion,
    city,
    profileImageUrl = '',
  } = profileData?.data || {};

  const getCompletedValue = () => {
    let checkedValue = 1;
    if (phoneNumber?.length) {
      checkedValue += 1;
    }
    if (countryRegion?.length) {
      checkedValue += 1;
    }
    if (city?.length) {
      checkedValue += 1;
    }
    if (profileImageUrl?.length) {
      checkedValue += 1;
    }
    return checkedValue;
  };

  useEffect(() => {
    const result = getCompletedValue() || 1;
    setCompletedAccountSettings(result);
  }, [profileData]);

  return isLoading ? (
    <div className="text-center m-auto my-10">
      <Spinner size="xl" />
    </div>
  ) : profileData?.data ? (
    <div className="w-full md:mt-20">
      <div className="relative py-2 pl-5 mb-6 w-full dark:bg-clip-text text-gray dark:text-white font-medium text-[24px]">
        How do you want to get started?
      </div>
      <div className="w-full md:!w-4/5 grid grid-cols-1 gap-8">
        <ConsoleProgressCard
          label="Complete Your Account Setting"
          url={AccountSettingsRoutes.AccountSettings}
          isProgressChart
          isLoading={isLoading}
          completed={completedAccountSettings}
          total={totalAccountSettings}
        />
        <ConsoleProgressCard
          label="Complete Your Profile"
          url={AccountSettingsRoutes.AccountSettings}
          isProgressChart
        />
        <RecentActivities userId="demo" />
      </div>
    </div>
  ) : null;
}

export default UserConsole;
