'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetAdminProfile, useUpdateAdminProfile } from '@queries';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { AdminProfileEntity } from '@services/adminProfile/adminProfile.type';
import NotificationsCard from './NotificationsCard';
import ContactInformationCard from './ContactInformationCard';

function ProfilePage() {
  const profileForm = useForm<AdminProfileEntity>({ mode: 'all' });

  const {
    handleSubmit,
    formState: { dirtyFields },
    reset,
  } = profileForm;

  const isDirty = Object.keys(dirtyFields)?.length;

  const { data: adminProfileDetails } = useGetAdminProfile();

  const { data } = adminProfileDetails || {};

  const { mutateAsync: updateProfileDetails } = useUpdateAdminProfile({
    failureMessage: true,
    successMessage: 'Changes have been saved!',
  });

  useEffect(() => {
    if (data?.adminProfileId) {
      reset({ ...data });
    }
  }, [data, reset]);

  const onDiscardChanges = () => {
    if (data?.adminProfileId) {
      reset({ ...data });
    } else reset({});
  };

  const onSaveAdminProfileChanges = async (
    profileDetails: AdminProfileEntity,
  ) => {
    const {
      lowInventoryEmailSchedule,
      lowInventorySmsSchedule,
      orderCancelEmailSchedule,
      orderCancelSmsSchedule,
      ...rest
    } = profileDetails || {};

    const { data } =
      (await updateProfileDetails({
        ...rest,
        lowInventoryEmailSchedule: lowInventoryEmailSchedule || undefined,
        lowInventorySmsSchedule: lowInventorySmsSchedule || undefined,
        orderCancelEmailSchedule: orderCancelEmailSchedule || undefined,
        orderCancelSmsSchedule: orderCancelSmsSchedule || undefined,
      })) || {};
    reset(data);
  };

  return (
    <div className="flex flex-col gap-3 mt-1 mr-1">
      <BreadcrumbWithActions
        onDiscard={onDiscardChanges}
        shouldDisabledSaveButton={!isDirty}
        onSaveChange={handleSubmit(onSaveAdminProfileChanges)}
        isEditing
        showBreadcrumb={false}
      />
      <NotificationsCard profileForm={profileForm} />
      <ContactInformationCard profileForm={profileForm} />
    </div>
  );
}

export default ProfilePage;
