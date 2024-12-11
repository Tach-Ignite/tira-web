/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unused-prop-types */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button, Spinner, Table, TableActionButtons } from '@src/atoms';
import { Row } from '@src/atoms/Table/types';
import Link from 'next/link';
import { AdminConsoleRoutes } from '@src/routes';
import { OrgUsers, TeamUsers, UserStatusMap } from '@services';
import { ArrowBack } from '@src/icons';
import { RoleLabels, UserRoles } from '@src/types/modules/UserType';
import {
  useGetSingleUser,
  useRemoveUser,
  useUpdateAnyUserDetailsAsAdmin,
} from '@queries';
import { useState } from 'react';
import { useDeleteTeamUser } from '@queries/useTeamsQuery';
import {
  useGetSingleOrganization,
  useDeleteOrgUser,
} from '@queries/useOrganizationsQuery';
import { DeleteModal } from '@src/modals';
import ViewPageInfo from '../../ViewPageInfo';

function UserView() {
  const { userId, organizationId, teamId } = useParams() || {};
  const router = useRouter();

  const { data: organizationDetails, isLoading: isLoadingOrg } =
    useGetSingleOrganization(organizationId as string);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const { data: userDetails, isLoading } = useGetSingleUser(
    userId as string,
    organizationDetails?.id as string,
  );

  const { mutateAsync: updateUserAsync } = useUpdateAnyUserDetailsAsAdmin({
    failureMessage: 'Failed to update the status',
    successMessage: 'User status are updated successfully',
  });

  const goBack = () => {
    router.back();
  };

  const { mutateAsync: removeUser } = useRemoveUser({
    failureMessage: 'Failed to remove the user',
    successMessage: 'User removed from system successfully',
    onSuccessCallback: () => {
      goBack();
    },
  });

  const { mutateAsync: removeTeamUser } = useDeleteTeamUser({
    failureMessage: 'Failed to remove the user from team',
    successMessage: 'User removed from team successfully',
    onSuccessCallback: () => {
      goBack();
    },
  });

  const { mutateAsync: removeOrgUser } = useDeleteOrgUser({
    failureMessage: 'Failed to remove the user from Organization',
    successMessage: 'User removed from Organization successfully',
    onSuccessCallback: () => {
      goBack();
    },
  });

  const { name = '', email, role, orgUsers, teamUsers } = userDetails || {};

  const orgColumns = [
    {
      header: 'Organization',
      cell: ({ row }: { row: Row<OrgUsers> }) => {
        const {
          orgId,
          organizations: { name, orgFriendlyId },
        } = row?.original || {};
        return name ? (
          <Link
            key={orgId}
            className="relative underline text-blue-400"
            href={`${AdminConsoleRoutes.Organizations}/${orgFriendlyId}/users/${userId}/view`}
          >
            {name}
          </Link>
        ) : (
          '-'
        );
      },
    },
    {
      header: 'Role',
      cell: ({ row }: { row: Row<OrgUsers> }) => {
        const {
          role: { name: roleName },
        } = row?.original || {};

        return (
          <div className="flex gap-3 flex-wrap">
            {RoleLabels[roleName as UserRoles]}
          </div>
        );
      },
    },
    {
      header: 'Action',
      cell: ({ row }: { row: Row<OrgUsers> }) => {
        const {
          organizations: { orgFriendlyId },
        } = row?.original || {};

        return (
          <TableActionButtons
            viewUrl={`${AdminConsoleRoutes.Organizations}/${orgFriendlyId}/users/${userId}/view`}
          />
        );
      },
    },
  ].filter(Boolean);

  const teamColumns = [
    {
      header: 'Team',
      cell: ({ row }: { row: Row<TeamUsers> }) => {
        const { teamId, team } = row?.original || {};
        return team?.name ? (
          <Link
            key={teamId}
            className="relative underline text-blue-400"
            href={`${AdminConsoleRoutes.Organizations}/${team?.organization?.orgFriendlyId}/teams/${teamId}/users/${userId}/view`}
          >
            {team?.name}
          </Link>
        ) : (
          '-'
        );
      },
    },
    {
      header: 'Role',
      cell: ({ row }: { row: Row<TeamUsers> }) => {
        const {
          role: { name: roleName },
        } = row?.original || {};

        return (
          <div className="flex gap-3 flex-wrap">
            {RoleLabels[roleName as UserRoles]}
          </div>
        );
      },
    },
    {
      header: 'Action',
      cell: ({ row }: { row: Row<TeamUsers> }) => {
        const {
          teamId,
          team: { organization },
        } = row?.original || {};

        return (
          <TableActionButtons
            viewUrl={`${AdminConsoleRoutes.Organizations}/${organization?.orgFriendlyId}/teams/${teamId}/users/${userId}/view`}
          />
        );
      },
    },
  ].filter(Boolean);

  const handleRemove = async () => {
    setShowRemoveModal(true);
  };

  const orgIdParam =
    organizationId && organizationDetails?.id
      ? `?orgId=${organizationDetails?.id}`
      : '';

  const roleModifyLink = teamId ? `?teamId=${teamId}` : orgIdParam;

  const getRole = () => {
    if (teamId) {
      return (
        teamUsers?.find((teamUser) => teamUser.teamId === teamId)?.role.name ||
        ''
      );
    }
    if (organizationId && organizationDetails?.id) {
      return (
        orgUsers?.find((orgUser) => orgUser.orgId === organizationDetails?.id)
          ?.role.name || ''
      );
    }
    return role?.name || '';
  };

  const handleUserStatusConfirmModal = () => {
    setShowStatusModal(true);
  };

  const handleUserStatusClose = () => {
    setShowStatusModal(false);
  };

  const handleUserRemoveClose = () => {
    setShowRemoveModal(false);
  };

  const handleUserRemoveConfirm = async () => {
    if (teamId) {
      await removeTeamUser({
        teamId: teamId as string,
        userId: userId as string,
      });
    } else if (organizationId && organizationDetails?.id) {
      await removeOrgUser({
        orgId: organizationDetails?.id as string,
        userId: userId as string,
      });
    } else {
      await removeUser(userId as string);
    }
    setShowRemoveModal(false);
  };

  const handleUserModalConfirm = async () => {
    updateUserAsync({
      data: {
        userStatus:
          userDetails?.userStatus === 'DeActive' ? 'Active' : 'DeActive',
      },
      userId: userId as string,
    });
    setShowStatusModal(false);
  };

  const userViewInfo = [
    { key: 'User Id#', value: userId as string },
    { key: 'Name', value: name },
    { key: 'Email', value: email },
  ]?.filter(({ value }) => Boolean(value));

  return isLoadingOrg || isLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div>
      <div className="flex items-center text-[24px] border-b border-gray-300 mb-5 !text-black dark:!text-white gap-3 font-bold">
        <ArrowBack onClick={goBack} size={42} className="cursor-pointer" />{' '}
        {name || email?.split('@')?.[0]}
      </div>
      <ViewPageInfo
        title="User Info"
        info={userViewInfo}
        editUrl={`${AdminConsoleRoutes.Users}/${userId}/edit`}
      />
      <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-8 shadow-xl mt-4 w-fit">
        <div className="flex gap-3 flex-wrap items-center mb-5 text-black dark:text-gray-400 text-[14px] leading-[21px] mt-2">
          <p>Role :</p>
          <p className="font-semibold dark:text-gray-50">
            {getRole() ? RoleLabels[getRole() as UserRoles] : '-'}
          </p>
        </div>
        <div className="flex mt-3 gap-4 justify-between">
          {!teamId && !organizationId && !organizationDetails?.id && (
            <Button
              size="sm"
              onClick={handleUserStatusConfirmModal}
              theme={{
                color: {
                  info: '!bg-transparent text-indigo-600 dark:text-yellow-400 border border-indigo-600 dark:border-yellow-400 hover:!bg-opacity-80',
                },
                size: { sm: 'py-1 px-5 text-[16px] font-medium' },
              }}
            >
              {userDetails?.userStatus
                ? UserStatusMap[userDetails.userStatus]
                : '-'}
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleRemove}
            theme={{
              color: {
                info: '!bg-transparent text-indigo-600 dark:text-yellow-400 border border-indigo-600 dark:border-yellow-400 hover:!bg-opacity-80',
              },
              size: { sm: 'py-1 px-5 text-[16px] font-medium' },
            }}
          >
            Remove
          </Button>
          <Link
            href={`${AdminConsoleRoutes.Users}/${userId}/modify-role${roleModifyLink}`}
          >
            <Button
              size="sm"
              theme={{
                color: {
                  info: '!bg-transparent text-indigo-600 dark:text-yellow-400 border border-indigo-600 dark:border-yellow-400 hover:!bg-opacity-80',
                },
                size: { sm: 'py-1 px-5 text-[16px] font-medium' },
              }}
            >
              Modify Role
            </Button>
          </Link>
        </div>
      </div>
      {!teamId && (
        <div className="bg-white shadow-xl mt-10 rounded-lg dark:bg-gray-800">
          <div className="font-semibold p-4 text-lg text-gray-900 dark:text-white">
            {organizationId ? 'Teams' : 'Organizations'}
          </div>
          <Table
            columns={organizationId ? teamColumns : orgColumns}
            data={organizationId ? teamUsers : orgUsers}
            noDataMessage="No Orgs Found!"
            withBorder={false}
            childrenClassName="pt-0 rounded-b-lg"
            tableBodyClassName="divide-y"
            baseClassName="rounded-b-lg"
          />
        </div>
      )}
      {showStatusModal ? (
        <DeleteModal
          showModal={showStatusModal}
          onCloseModal={handleUserStatusClose}
          buttonNames={['Confirm', 'Cancel']}
          onHandleConfirm={handleUserModalConfirm}
          description={`Are you sure you want to ${
            userDetails?.userStatus
              ? UserStatusMap[userDetails.userStatus]
              : '-'
          } this user?`}
        />
      ) : null}
      {showRemoveModal ? (
        <DeleteModal
          showModal={showRemoveModal}
          onCloseModal={handleUserRemoveClose}
          buttonNames={['Confirm', 'Cancel']}
          onHandleConfirm={handleUserRemoveConfirm}
          description="Are you sure you want to remove this user?"
        />
      ) : null}
    </div>
  );
}

export default UserView;
