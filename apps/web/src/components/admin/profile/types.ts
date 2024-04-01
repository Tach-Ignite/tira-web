import { AdminProfileEntity } from '@services/adminProfile/adminProfile.type';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface TitleWithSettingsProps {
  profileForm: UseFormReturn<AdminProfileEntity>;
  title?: string;
  children?: React.ReactNode;
  name?: 'orderCancel' | 'lowInventory';
}

export interface NotificationsCardProps extends TitleWithSettingsProps {}

export interface NotificationRadioProps extends TitleWithSettingsProps {
  isEmail?: boolean;
  name?: 'orderCancel' | 'lowInventory';
}

export const lowInventoryThresholdOptions = [
  { label: '0-5 Units', value: '0-5' },
  { label: '5-10 Units', value: '5-10' },
  { label: '10-15 Units', value: '10-15' },
  { label: '15-20 Units', value: '15-20' },
];

export const notificationTypes = [
  { label: 'Instantly', value: 'Instantly' },
  { label: 'Daily', value: 'Daily' },
];
