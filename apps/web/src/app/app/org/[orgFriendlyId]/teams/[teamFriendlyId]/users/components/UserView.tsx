/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unused-prop-types */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button, Spinner, Table } from '@src/atoms';
import { Row } from '@src/atoms/Table/types';
import Link from 'next/link';
import { OrgConsoleRoutes } from '@src/routes';
import { TeamUsers } from '@services';
import { OrgUsersRoles, TeamUsersRoles } from '@src/types/modules/UserType';
import { useEffect, useState } from 'react';
// import { useDeleteTeamUser } from '@queries/useTeamsQuery';
import {
  useGetSingleOrganization,
  useDeleteOrgUser,
  useGetOrgUserData,
} from '@queries/useOrganizationsQuery';
import { useAuthContext } from '@context/AuthContext';
import { DeleteModal } from '@src/modals';
import UserBasicInfo from './UserBasicInfo';
import AssignOrgUserRole from './AssignOrgUserRole';
import AssignTeamUserRole from './AssignTeamUserRole';

function UserView() {
  const { userId, orgFriendlyId: organizationId } = useParams() || {};
  const router = useRouter();

  const { setSinglePageName } = useAuthContext();

  const { data: organizationDetails, isLoading: isLoadingOrg } =
    useGetSingleOrganization(organizationId as string);

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const {
    data: userDetails,
    refetch: reloadUser,
    isLoading,
  } = useGetOrgUserData(organizationDetails?.id as string, userId as string);

  const goBack = () => {
    router.back();
  };

  const { mutateAsync: removeOrgUser } = useDeleteOrgUser({
    failureMessage: 'Failed to remove the user from Organization',
    successMessage: 'User removed from Organization successfully',
    onSuccessCallback: () => {
      goBack();
    },
  });

  const { role, users } = userDetails || {};
  const { email = '', teamUsers = [] } = users || {};

  const { firstName = '', lastName = '' } = users?.userProfile || {};

  const teamColumns = [
    {
      header: 'Team Name',
      cell: ({ row }: { row: Row<TeamUsers> }) => {
        const { teamId, team } = row?.original || {};
        return team?.name ? (
          <Link
            key={teamId}
            className="relative underline text-blue-400"
            href={`${OrgConsoleRoutes.OrganizationTeams?.replace(':orgFriendlyId', organizationId as string)}/teams/${teamId}`}
          >
            {team?.name}
          </Link>
        ) : (
          '-'
        );
      },
    },
    {
      header: 'Access',
      cell: ({ row }: { row: Row<TeamUsers> }) => {
        const { id = '' } = row?.original || {};
        const { name: roleName = '' } = row?.original?.role || {};
        const { userId, teamId } = row?.original || {};
        return (
          <AssignTeamUserRole
            id={id}
            userId={userId as string}
            orgId={organizationDetails?.id as string}
            teamId={teamId as string}
            value={roleName}
            onSuccessCallback={reloadUser}
            options={TeamUsersRoles}
            isDisabled={false}
          />
        );
      },
    },
  ].filter(Boolean);

  const handleRemove = async () => {
    setShowRemoveModal(true);
  };

  const handleUserRemoveClose = () => {
    setShowRemoveModal(false);
  };

  const handleUserRemoveConfirm = async () => {
    if (organizationId && organizationDetails?.id) {
      await removeOrgUser({
        orgId: organizationDetails?.id as string,
        userId: userId as string,
      });
    }
    setShowRemoveModal(false);
  };

  const userViewInfo = [
    { key: 'User Id#', value: userId as string },
    { key: 'Name', value: `${firstName || ''} ${lastName || ''}` },
    { key: 'Email', value: email },
  ]?.filter(({ value }) => Boolean(value));

  useEffect(() => {
    if (userDetails?.users?.userProfile) {
      const { firstName = '', lastName = '' } =
        userDetails?.users?.userProfile || {};
      if (firstName?.length || lastName?.length) {
        setSinglePageName?.(`${firstName || ''} ${lastName || ''}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  return isLoadingOrg || isLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div>
      <div className="grid grid-cols-1 place-items-center shadow-xl">
        <UserBasicInfo title="User Info" info={userViewInfo} />
        <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-8 mt-4 w-full">
          <div className="grid grid-cols-2 gap-3 mb-5 mt-2">
            <p className="text-black dark:text-gray-400 text-[20px] leading-[21px]">
              Role in {organizationDetails?.name || '-'}:
            </p>
            <AssignOrgUserRole
              id={userDetails?.id || 'id-12'}
              userId={users?.userId as string}
              orgId={organizationDetails?.id as string}
              value={role?.name || 'org-member'}
              onSuccessCallback={() => {}}
              options={OrgUsersRoles}
            />
          </div>
          <div className="flex mt-10 gap-4 justify-between">
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
              Remove from the Organization
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl mt-10 rounded-lg dark:bg-gray-800">
        <div className="p-4 text-lg text-gray-900 dark:text-white">
          Teams Membership
        </div>
        <Table
          columns={teamColumns}
          data={teamUsers}
          noDataMessage="No Teams Found!"
          withBorder={false}
          childrenClassName="pt-0 rounded-b-lg"
          tableBodyClassName="divide-y"
          baseClassName="rounded-b-lg"
        />
      </div>
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
