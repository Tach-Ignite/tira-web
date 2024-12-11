/* eslint-disable no-unused-vars */

'use client';

import { useAuthContext } from '@context/AuthContext';
import { useGetAllRoles, useGetUser, useUpdateUserRole } from '@queries';
import { Button, Select, Spinner } from '@src/atoms';
import { ArrowBack } from '@src/icons';
import { UserRoles } from '@src/types/modules';
import { RoleLabels } from '@src/types/modules/UserType';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

function UserRoleModifyPage() {
  const { userId } = useParams() || {};
  const params = useSearchParams();
  const router = useRouter();
  const { authenticatedUser, currentUserRole, setAuthenticatedUserRole } =
    useAuthContext();

  const orgIdInParam = params.get('orgId') as string;
  const teamIdInParam = params.get('teamId') as string;

  const { control, reset, watch } = useForm({ mode: 'all' });

  const [isSavePending, setIsSavePending] = useState(false);

  const { data: userDetails, isLoading } = useGetUser(userId as string);

  const { mutateAsync: updateUserRoleAsync } = useUpdateUserRole({
    successMessage: 'Role has been updated!',
    failureMessage: true,
  });

  const goBack = () => {
    router.back();
  };

  const { data: allRoles, isLoading: isAllRolesLoading } = useGetAllRoles();

  const adminLevelOptions = allRoles?.filter(
    ({ name }) =>
      name === UserRoles.User ||
      name === UserRoles.SuperAdmin ||
      name === UserRoles.SystemAdmin,
  );

  const orgLevelOptions = allRoles?.filter(
    ({ name }) => name === UserRoles.OrgMember || name === UserRoles.OrgAdmin,
  );

  const teamLevelOptions = allRoles?.filter(
    ({ name }) => name === UserRoles.TeamMember || name === UserRoles.TeamAdmin,
  );

  const { role: selectedRoleId } = watch();

  const { roleId, orgUsers, teamUsers, name, email } = userDetails || {};

  const orgUserRoleId = orgUsers?.find(
    ({ orgId, userId: orgUserId }) =>
      orgId === orgIdInParam && orgUserId === userId,
  )?.roleId;

  const teamUserRoleId = teamUsers?.find(
    ({ teamId, userId: teamUserId }) =>
      teamId === teamIdInParam && teamUserId === userId,
  )?.roleId;

  const { name: authenticatedUserRole } = currentUserRole || {};

  const enableRoleOption = useMemo(() => {
    if (orgIdInParam) {
      return (
        authenticatedUserRole === UserRoles.SuperAdmin ||
        authenticatedUserRole === UserRoles.SystemAdmin ||
        authenticatedUserRole === UserRoles.OrgAdmin
      );
    }
    if (teamIdInParam) {
      return (
        authenticatedUserRole === UserRoles.SuperAdmin ||
        authenticatedUserRole === UserRoles.SystemAdmin ||
        authenticatedUserRole === UserRoles.OrgAdmin ||
        authenticatedUserRole === UserRoles.TeamAdmin
      );
    }
    return true;
  }, [authenticatedUserRole, teamIdInParam, orgIdInParam]);

  const disableSaveButton = useMemo(() => {
    if (orgIdInParam) {
      return orgUserRoleId === selectedRoleId;
    }
    if (teamIdInParam) {
      return teamUserRoleId === selectedRoleId;
    }
    return roleId === selectedRoleId;
  }, [
    orgIdInParam,
    roleId,
    teamUserRoleId,
    teamIdInParam,
    orgUserRoleId,
    selectedRoleId,
  ]);

  useEffect(() => {
    if (orgIdInParam) {
      reset({ role: orgUserRoleId });
    } else if (teamIdInParam) {
      reset({ role: teamUserRoleId });
    } else {
      reset({ role: roleId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId, orgIdInParam, teamUserRoleId, orgUserRoleId, teamIdInParam]);

  const getRoleOptions = () => {
    let adminOptions = [];
    if (authenticatedUserRole === UserRoles.SuperAdmin) {
      adminOptions = adminLevelOptions || [];
    } else if (authenticatedUserRole === UserRoles.SystemAdmin) {
      adminOptions =
        adminLevelOptions?.filter(
          ({ name }) => name !== UserRoles.SuperAdmin,
        ) || [];
    } else
      adminOptions =
        adminLevelOptions?.filter(({ name }) => name === UserRoles.User) || [];
    if (orgIdInParam) {
      return orgLevelOptions;
    }
    if (teamIdInParam) {
      return teamLevelOptions;
    }
    return adminOptions;
  };

  const onDiscardChanges = () => {
    router.back();
  };

  const onSaveChanges = async () => {
    try {
      setIsSavePending(true);
      const result = await updateUserRoleAsync({
        roleId: selectedRoleId,
        orgId: orgIdInParam as string,
        userId: userId as string,
        teamId: teamIdInParam as string,
      });
      if (authenticatedUser?.userId === userId) {
        setAuthenticatedUserRole?.(result?.role);
      }
      router.back();
    } catch (e) {
      setIsSavePending(false);
    }
  };

  const isDataLoading = isLoading || isAllRolesLoading;

  return isDataLoading ? (
    <div className="text-center m-auto">
      <Spinner size="xl" className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div>
      <div className="flex items-center text-[24px] border-b border-gray-300 mb-5 !text-black dark:!text-white gap-3 font-bold">
        <ArrowBack onClick={goBack} size={42} className="cursor-pointer" />{' '}
        {name || email?.split('@')?.[0]}
      </div>
      <div className="bg-white space-y-5 dark:bg-gray-800 rounded-2xl max-w-[600px] mt-10 p-[20px] py-7 shadow-xl">
        <div className="w-full dark:bg-clip-text text-black dark:!text-white font-medium text-[24px]">
          Asssign Role:
        </div>
        <div className="max-w-[400px]">
          <Select
            control={control}
            name="role"
            optionTitle="Select Role"
            disabled={!enableRoleOption}
            options={
              getRoleOptions()?.map(({ name, id }) => ({
                label: RoleLabels[name as UserRoles],
                value: id,
              })) || []
            }
          />
        </div>
        <div className="flex gap-3 justify-end pt-3 sm:!flex-row flex-col">
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
            disabled={disableSaveButton}
            onClick={onSaveChanges}
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

export default UserRoleModifyPage;
