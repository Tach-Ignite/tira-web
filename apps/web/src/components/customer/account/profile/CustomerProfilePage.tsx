/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

'use client';

import { Wizard } from '@components/common/wizard';
import {
  UserProfileEntity,
  GenderIdentityEnum,
} from '@src/services/users/users.type';
import {
  Links,
  PersonalBackground,
  PersonalInformation,
  UserProfileWizard,
} from '@components/customer/account/profile/ProfileWizard';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useGetUserProfile, useUpdateUserProfile } from '@queries';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '@context/AuthContext';
import { ArrowRightIcon } from '@src/icons';
import { CompletionStatusEnum } from '@src/types/modules/statusEnum';
import { CustomerRoutes } from '@src/routes';
import { useToast } from '@context/ToastContext';
import { Spinner } from '@src/atoms';

const defaultValues: UserProfileEntity = {
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  city: '',
  state: '',
  genderIdentity: GenderIdentityEnum?.NotToSay,
  race: [],
  militaryVeteran: '',
  linkedInURL: '',
  websiteURL: '',
  githubURL: '',
  mediumURL: '',
  status: CompletionStatusEnum?.Pending,
  stackOverflowURL: '',
  calendarLink: '',
  completedSteps: '',
  userId: '',
};

function CustomerProfilePage() {
  const { authenticatedUser, setAuthenticatedUser } = useAuthContext() || {};
  const { data: userProfileData, isLoading } = useGetUserProfile();

  const { ...userProfile } = userProfileData?.data || {};

  const customerProfileForm = useForm({
    mode: 'all',
    defaultValues: {
      ...(userProfile?.userId
        ? userProfile
        : { ...defaultValues, emailAddress: authenticatedUser?.email || '' }),
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { dirtyFields },
  } = customerProfileForm;

  const isDirty = Object.keys(dirtyFields)?.length;

  const { completedSteps } = watch();

  const resetForm = useCallback(() => {
    if (userProfile) {
      reset({ ...userProfile });
    }
  }, [reset, userProfile]);

  useEffect(() => {
    if (userProfile?.userId) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile?.userId]);

  // Wizard Work starts here//

  const { mutateAsync: updateProfileAsync, isPending } = useUpdateUserProfile(
    {},
  );

  const [activeWizardIndex, setActiveWizardIndex] = useState(
    UserProfileWizard.PersonalInformation,
  );

  const [isSavePending, setIsSavePending] = useState(false);

  const router = useRouter();

  const { showSuccessToast, showErrorToast } = useToast();

  const profileSteps = [
    {
      name: 'Personal information',
      component: <PersonalInformation form={customerProfileForm} />,
    },
    {
      name: 'Personal background',
      component: <PersonalBackground form={customerProfileForm} />,
      pageDescription: 'These answer will not be displayed publicly.',
    },
    { name: 'Links', component: <Links form={customerProfileForm} /> },
  ];

  const handleOnDiscardChanges = () => {
    if (userProfile?.userId) {
      reset(userProfile);
    }
  };

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

      if (activeWizardIndex === UserProfileWizard.PersonalInformation) {
        setAuthenticatedUser?.({
          ...authenticatedUser,
          userProfile: updatedUserProfile,
          userId: authenticatedUser?.userId || '',
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
      fullName,
      phoneNumber,
      emailAddress = authenticatedUser?.email,
      city,
      state,
      genderIdentity,
      race,
      militaryVeteran,
      linkedInURL,
      websiteURL,
      githubURL,
      mediumURL,
      stackOverflowURL,
      calendarLink,
    } = formValues;

    console.log('handleOnSaveChanges authenticatedUser >>', authenticatedUser);
    console.log('handleOnSaveChanges formvalues >>', formValues);

    const updateWizardIndex = () => {
      typeof wizardIndex === 'number'
        ? setActiveWizardIndex(wizardIndex)
        : setActiveWizardIndex(activeWizardIndex + 1);
    };

    if (activeWizardIndex === UserProfileWizard.PersonalInformation) {
      await updateUserProfile(
        {
          fullName,
          phoneNumber,
          emailAddress,
          city,
          state,
          completedSteps: isSaveButton
            ? completedSteps
            : completedSteps === '3'
              ? '3'
              : '1',
        },
        isSaveButton,
      );
      !isSaveButton && updateWizardIndex();
    } else if (activeWizardIndex === UserProfileWizard.PersonalBackground) {
      await updateUserProfile(
        {
          genderIdentity,
          race,
          militaryVeteran,
          completedSteps: isSaveButton
            ? completedSteps
            : completedSteps === '3'
              ? '3'
              : '2',
        },
        isSaveButton,
      );
      !isSaveButton && updateWizardIndex();
    } else if (activeWizardIndex === UserProfileWizard.Links) {
      await updateUserProfile(
        {
          linkedInURL,
          websiteURL,
          githubURL,
          mediumURL,
          stackOverflowURL,
          calendarLink,
          completedSteps: isSaveButton ? completedSteps : '3',
          status: CompletionStatusEnum.Completed,
        },
        isSaveButton,
      );
      typeof wizardIndex === 'number' && setActiveWizardIndex(wizardIndex);
      !isSaveButton &&
        typeof wizardIndex !== 'number' &&
        router.push(CustomerRoutes.ProfileCompleted);
    }
    reset(formValues, { keepValues: true });
  };

  // eslint-disable-next-line consistent-return
  const handleOnNext = async (index?: number) => {
    try {
      await handleSubmit((formValues) =>
        handleOnSaveChanges(
          { ...formValues, emailAddress: authenticatedUser?.email || '' },
          false,
          index,
        ),
      )();
    } catch (error) {
      return error;
    }
  };

  const onChangeWizardTab = async (index: number) => {
    await handleOnNext(index);
  };

  // Wizard work ends here //

  return isLoading ? (
    <div className="text-center m-auto">
      <Spinner size="xl" />
    </div>
  ) : (
    <div className="flex flex-col gap-5 w-full mt-2">
      <div className="w-full">
        <div className="dark:bg-text-gradient flex gap-2 items-center info-gradient relative py-2 pl-5 mb-1 w-full dark:bg-clip-text dark:text-white text-black dark:text-transparent font-medium text-[24px]">
          My Profile
        </div>
        <div className="border-t border-gray-300 mb-8" />
        <Wizard
          progressName="My Profile"
          steps={profileSteps}
          onChangeWizardTab={onChangeWizardTab}
          currentStepIndex={activeWizardIndex}
          onNext={handleOnNext}
          isNextPending={isPending && !isSavePending}
          isSavePending={isPending && isSavePending}
          updateButtonLabel="Update my personal profile"
          shouldDisableSave={!isDirty}
          onDiscardChanges={handleOnDiscardChanges}
          onSaveChanges={() => handleOnSaveChanges(watch(), true)}
        />
      </div>
    </div>
  );
}

export default CustomerProfilePage;
