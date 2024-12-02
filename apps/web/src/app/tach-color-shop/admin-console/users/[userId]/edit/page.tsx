'use client';

import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { PersonalInformation } from '@components/customer';
import Links from '@components/customer/account/profile/Links';
import PersonalBackground from '@components/customer/account/profile/PersonalBackground';
import { useGetUser, useUpdateAnyUserDetailsAsAdmin } from '@queries';
import { UpdatedUserProfileDto } from '@services';
import { Button, Spinner } from '@src/atoms';
import { DashboardIcon } from '@src/icons';
import { AdminConsoleRoutes } from '@src/routes';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ViewPageInfoCard from '../../components/ViewUserInfoCard';

function UserEditPage() {
  const { userId: paramUserId } = useParams() || {};

  const [isSavePending, setIsSavePending] = useState(false);

  const { data: user, isLoading } = useGetUser(paramUserId as string);

  const { name: userFullName, role, email, userProfile } = user || {};

  const profileForm = useForm<any>({ mode: 'all' });

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = profileForm;
  const router = useRouter();

  const goback = () => {
    router?.back();
  };

  const { mutateAsync: updateUserAsync } = useUpdateAnyUserDetailsAsAdmin({
    failureMessage: 'Failed to update the details',
    successMessage: 'User details are updated successfully',
  });

  const {
    fullName,
    phoneNumber,
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
  } = userProfile || {};

  const infoValues = [
    {
      label: `User's Role`,
      value: role?.name || '-',
    },
    {
      label: `User's Name`,
      value: userFullName || '',
    },
    {
      label: 'LinkedIn',
      isLink: true,
      linkName: 'LinkedIn link',
      value: linkedInURL || '',
    },
    {
      label: 'Email',
      value: email || '',
    },
  ]?.filter(({ value }) => Boolean(value));

  const breadcrumbs = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Users', onClick: goback },
    { name: userFullName || email || '-' },
  ];

  const profileData = {
    fullName,
    phoneNumber,
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
  };

  useEffect(() => {
    if (userProfile?.userId || user?.email) {
      reset({ ...profileData, emailAddress: user?.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile?.userId, user?.email]);

  const onDiscardChanges = () => {
    reset({ ...userProfile, emailAddress: user?.email });
    router.push(`${AdminConsoleRoutes.Users}/${paramUserId}/view`);
  };

  const onSaveChanges = async (data: UpdatedUserProfileDto) => {
    try {
      setIsSavePending(true);
      const updatedData = await updateUserAsync({
        data: { userProfile: data },
        userId: paramUserId as string,
      });
      const { userId } = updatedData || {};
      if (userId) {
        router.push(`${AdminConsoleRoutes.Users}/${paramUserId}/view`);
      }
    } catch (e) {
      setIsSavePending(false);
    }
  };

  return isLoading ? (
    <div className="text-center m-auto">
      <Spinner size="xl" className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div className="w-full space-y-8">
      <div className="pl-1 w-full text-black dark:!text-white font-medium text-[24px] border-b border-gray-200">
        Edit User
      </div>
      <BreadcrumbWithActions breadcrumbs={breadcrumbs} />
      <ViewPageInfoCard infoValues={infoValues} />
      <div className="rounded-lg mt-5 border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="font-semibold text-md xl:!px-36 !px-8 text-indigo-600 dark:text-yellow-400 pt-7 pb-5 border-b">
          User Profile
        </div>
        <div className="space-y-8 xl:!px-36 !px-8 my-8">
          <PersonalInformation form={profileForm} />
          <PersonalBackground form={profileForm} />
          <Links form={profileForm} />
        </div>
        <div className="flex gap-3 justify-end p-12 sm:!flex-row flex-col">
          <Button
            className="py-3"
            size="sm"
            onClick={onDiscardChanges}
            theme={{
              color: {
                info: '!bg-transparent dark:text-yellow-400 text-indigo-600 border border-indigo-600 dark:border-yellow-400 hover:!bg-opacity-80',
              },
              size: { sm: 'px-8 text-[16px] font-medium' },
            }}
          >
            Discard
          </Button>
          <Button
            className="py-3"
            size="sm"
            theme={{
              color: {
                info: '!bg-transparent dark:text-yellow-400 text-indigo-600 border border-indigo-600 dark:border-yellow-400 hover:!bg-opacity-80',
              },
              size: { sm: 'px-8 text-[16px] font-medium' },
            }}
            disabled={!isDirty}
            onClick={handleSubmit(onSaveChanges)}
          >
            {isSavePending ? (
              <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserEditPage;
