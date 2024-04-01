'use client';

import React from 'react';
import { Select } from '@src/atoms';
import {
  NotificationsCardProps,
  TitleWithSettingsProps,
  lowInventoryThresholdOptions,
} from './types';
import NotificationRadio from './NotificationRadio';

function TitleWithSettings(props: TitleWithSettingsProps) {
  const { profileForm, title, children, name = 'orderCancel' } = props;

  return (
    <div className="grid grid-cols-3 gap-5 pt-6">
      <div className="grid-cols-subgrid min-[1004px]:col-span-1 max-[1004px]:col-span-3">
        <div className="text-black dark:text-white text-sm font-normal">
          {title}
        </div>
      </div>
      <div className="grid-cols-subgrid min-[1004px]:col-span-2 max-[1004px]:col-span-3">
        {children}
        <NotificationRadio profileForm={profileForm} name={name} />
        <NotificationRadio
          profileForm={profileForm}
          name={name}
          isEmail={false}
        />
      </div>
    </div>
  );
}

function NotificationsCard(props: NotificationsCardProps) {
  const { profileForm } = props;

  const { control } = profileForm;

  return (
    <div className="shadow-xl rounded-2xl bg-white dark:bg-gray-800">
      <div className="text-black dark:text-white font-semibold text-sm border-b px-6 pt-6 pb-2 border-gray-200 dark:border-gray-600">
        Notifications
      </div>
      <div className="px-6 pb-6">
        <TitleWithSettings {...props} title="Order Cancellations" />
        <div className="mt-5">
          <TitleWithSettings
            {...props}
            title="Low Inventory"
            name="lowInventory"
          >
            <div className="w-max">
              <Select
                control={control}
                className="mb-5"
                name="lowInventoryThresholdUnit"
                label="Set Low Inventory Threshold"
                optionTitle="Select Threshold"
                options={lowInventoryThresholdOptions}
              />
            </div>
          </TitleWithSettings>
        </div>
      </div>
    </div>
  );
}

export default NotificationsCard;
