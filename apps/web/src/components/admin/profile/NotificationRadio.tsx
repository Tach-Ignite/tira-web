'use client';

import { Radio } from '@src/atoms/Radio';
import React, { useMemo } from 'react';
import { ToggleSwitch } from '@src/atoms/ToggleSwitch';
import { Controller } from 'react-hook-form';
import { AdminProfileEntity } from '@services/adminProfile/adminProfile.type';
import { NotificationRadioProps, notificationTypes } from './types';

function NotificationRadio(props: NotificationRadioProps) {
  const { profileForm, isEmail = true, name = '' } = props;

  const { control, setValue, watch } = profileForm;

  const {
    orderCancelEmail,
    lowInventorySms,
    lowInventoryEmail,
    orderCancelSms,
  } = watch();

  const shouldDisableNotificationSchedule = useMemo(() => {
    if (name === 'orderCancel') {
      return isEmail ? !orderCancelEmail : !orderCancelSms;
    }
    return isEmail ? !lowInventoryEmail : !lowInventorySms;
  }, [
    isEmail,
    lowInventoryEmail,
    lowInventorySms,
    name,
    orderCancelEmail,
    orderCancelSms,
  ]);

  const radioName =
    `${name}${isEmail ? 'Email' : 'Sms'}Schedule` as keyof AdminProfileEntity;

  const onToggleNotifications = (checked: boolean) => {
    checked ? setValue(radioName, 'Instantly') : setValue(radioName, undefined);
  };

  return (
    <div className="flex gap-x-10 gap-y-5 mb-5 max-[804px]:flex-wrap max-[550px]:justify-between">
      <div className="text-gray-900 w-[25%] max-[1800px]:w-[40%] max-[1100px]:w-[60%] max-[750px]:w-[100%] dark:text-white font-medium text-sm leading-[18px]">
        <ToggleSwitch
          control={control}
          label={`${isEmail ? 'Email' : 'SMS'} Notifications`}
          name={`${name}${isEmail ? 'Email' : 'Sms'}`}
          onChange={onToggleNotifications}
        />
      </div>
      <div className="flex gap-5">
        <Controller
          control={control}
          name={radioName}
          render={({ field: { onChange, name, value } }) => (
            <div className="flex gap-4">
              {notificationTypes?.map(({ label, value: propValue }) => {
                const onHandleChange = (
                  event: React.ChangeEvent<HTMLInputElement>,
                ) => {
                  onChange(event);
                  setValue(name, propValue, { shouldDirty: true });
                };
                return (
                  <Radio
                    control={control}
                    name={name}
                    isChecked={propValue === value}
                    disabled={shouldDisableNotificationSchedule}
                    key={label}
                    label={label}
                    onChange={onHandleChange}
                  />
                );
              })}
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default NotificationRadio;
