/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */

'use client';

import React from 'react';

interface RecentActivitiesProps {
  userId: string;
}

const activityDataMock = [
  `Leonard joined your organization "Philips Limited" as Organization Member.`,
  `Louis Mckee invites new user with email testinguser@yopmail.com to your team "Engineering Team".`,
  `Howard Gregory invites new user with email rajput@yopmail.com to your team "Sales Team".`,
  `Sheldon Cooper joined your organization "IT Limited" as Organization Admin.`,
];

export default function RecentActivities({
  userId = '',
}: RecentActivitiesProps) {
  return (
    <div
      className={`min-h-[120px] w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-1 gap-6 md:gap-[16px] rounded-lg no-select shadow-l dark:shadow-sm outline-3 outline outline-black py-8 px-4 md:!p-4 `}
    >
      <div className="grid grid-cols-1 gap-4 md:!gap-1">
        <p className="flex items-center justify-start font-semibold leading-[30px] text-[20px] text-gray dark:text-white">
          Recent Activities
        </p>
        <div className="grid grid-cols-1 gap-4 md:!gap-2 px-2">
          {activityDataMock?.map((content: string) => (
            <p
              key={content}
              className="w-full flex items-start justify-start leading-[18px] text-[12px] text-gray dark:text-white"
            >
              {content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
