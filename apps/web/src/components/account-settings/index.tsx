/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */

'use client';

import { NavigationWizard } from '@components/common/navigation-wizard';
import { useAuthContext } from '@context/AuthContext';
import { useToast } from '@context/ToastContext';
import {
  useGetUserProfile,
  // useGetCurrentUser,
  useUpdateUserProfile,
} from '@queries/useUsersQuery';
import { FileService, UserProfileEntity } from '@services';
import { AccountSettingsRoutes } from '@src/routes';
import { Spinner } from '@src/atoms';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AccountSettingsWizard } from './types';
import Billing from './Billing';
import Subscriptions from './Subscriptions';
import ProfileSettings from './ProfileSettings';
import Overview from './Overview';

function AccountSettings({ pathname }: { pathname: string }) {
  const accountSettingsForm = useForm({ mode: 'all' });

  const accountSettingSteps = [
    {
      name: 'Overview',
      component: <Overview form={accountSettingsForm} />,
      url: AccountSettingsRoutes.AccountSettings,
      type: AccountSettingsWizard.Overview,
    },
    {
      name: 'Profile settings',
      component: <ProfileSettings form={accountSettingsForm} />,
      url: AccountSettingsRoutes.AccountSettingsProfile,
      type: AccountSettingsWizard.ProfileSettings,
    },
    {
      name: 'Subscriptions',
      component: <Subscriptions form={accountSettingsForm} />,
      url: AccountSettingsRoutes.AccountSettingsSubscriptions,
      type: AccountSettingsWizard.Subscriptions,
    },
    {
      name: 'Billing',
      component: <Billing form={accountSettingsForm} />,
      url: AccountSettingsRoutes.AccountSettingsBilling,
      type: AccountSettingsWizard.Billing,
    },
  ];

  const { authenticatedUser, setAuthenticatedUser } = useAuthContext() || {};

  const [activeWizardIndex, setActiveWizardIndex] = useState(
    accountSettingSteps?.find((step) => step?.url === pathname)?.type ||
      AccountSettingsWizard.Overview,
  );

  const [isSavePending, setIsSavePending] = useState(false);

  const router = useRouter();

  const { showSuccessToast, showErrorToast } = useToast();

  const { mutateAsync: updateProfileAsync, isPending } = useUpdateUserProfile(
    {},
  );

  const getFileUrl = async (file?: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('files', file);

      const res = await FileService.uploadMultiImage(formData);
      return res?.data?.[0];
    }
    return undefined;
  };

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid },
  } = accountSettingsForm;

  const { data: profileData, isLoading } = useGetUserProfile();

  const { user, ...userProfile } = profileData?.data || {};

  useEffect(() => {
    if (profileData?.data?.userId) {
      reset({ ...userProfile });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData?.data?.userId, user?.email]);

  const updateUserProfile = async (
    data: UserProfileEntity,
    isSaveButton?: boolean,
  ) => {
    try {
      isSaveButton ? setIsSavePending(true) : null;
      const updatedData = await updateProfileAsync(data);
      isSaveButton ? setIsSavePending(false) : null;
      if (isSaveButton) {
        showSuccessToast({ message: 'Profile has been updated.' });
      }
      const { data: updatedUserProfile } = updatedData || {};

      if (activeWizardIndex === AccountSettingsWizard.Overview) {
        setAuthenticatedUser?.({
          ...authenticatedUser,
          userProfile: updatedUserProfile,
          userId: authenticatedUser?.userId || '',
          role: updatedUserProfile?.user?.role || null,
          ...(updatedUserProfile?.user || {}),
        });
      }
    } catch (e) {
      isSaveButton ? setIsSavePending(false) : null;
      showErrorToast({ message: 'Failed to update Profile.' });
    }
  };

  const handleOnSaveChanges = async (
    formValues: UserProfileEntity,
    isSaveButton?: boolean,
    wizardIndex?: number,
  ) => {
    const {
      files,
      firstName,
      lastName,
      phoneNumber,
      countryRegion,
      postalCode,
      city,
      state,
    } = formValues;

    const profileImageUrl = await getFileUrl(files?.[0]);

    const updateWizardIndex = () => {
      typeof wizardIndex === 'number'
        ? setActiveWizardIndex(wizardIndex)
        : setActiveWizardIndex(activeWizardIndex + 1);
    };

    if (activeWizardIndex === AccountSettingsWizard.Overview) {
      // console.log('formValues ::', formValues, profileImageUrl);
      await updateUserProfile(
        {
          profileImageUrl,
          firstName,
          lastName,
          phoneNumber,
          countryRegion,
          postalCode,
          city,
          state,
        },
        isSaveButton,
      );
    } else if (activeWizardIndex === AccountSettingsWizard.Subscriptions) {
      updateWizardIndex();
    } else if (activeWizardIndex === AccountSettingsWizard.Billing) {
      typeof wizardIndex === 'number' && setActiveWizardIndex(wizardIndex);
    }
    reset(formValues, { keepValues: true });
  };

  const handleOnNext = async (index?: number) => {
    try {
      await handleSubmit((formValues) =>
        handleOnSaveChanges(formValues, false, index),
      )();
    } catch (error) {
      return error;
    }
  };

  const handleOnDiscardChanges = () => {
    if (userProfile?.userId) {
      reset(userProfile);
    }
  };

  const onChangeWizardTab = async (index: number) => {
    await handleOnNext(index);
  };

  const handleBack = () => {
    if (activeWizardIndex === AccountSettingsWizard.Overview) {
      if (isDirty) {
        showErrorToast({
          message:
            'There are unsaved changes, please save or discard changes to continue',
        });
        return;
      }
      router.back();
    } else router.back();
  };

  return isLoading ? (
    <div className="text-center m-auto md:!pt-[2rem]">
      <Spinner size="xl" />
    </div>
  ) : (
    <div className="w-full ">
      <NavigationWizard
        steps={accountSettingSteps}
        onChangeWizardTab={onChangeWizardTab}
        currentStepIndex={activeWizardIndex}
        showGoBack
        showStepInfo={false}
        onHandleBack={handleBack}
        actionButtons={[
          {
            label: 'Discard changes',
            shouldDisable: !isDirty,
            onClick: handleOnDiscardChanges,
          },
          {
            label: 'Save Changes',
            shouldDisable: !isValid || !isDirty,
            isPending: isPending && isSavePending,
            onClick: () => handleOnSaveChanges(watch(), true),
            popover: {
              show: !isValid || !isDirty,
              content: 'No Changes to save or missing required fields',
            },
          },
        ]}
      />
    </div>
  );
}

export default AccountSettings;
