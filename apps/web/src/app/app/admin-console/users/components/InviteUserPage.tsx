/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import { useToast } from '@context/ToastContext';
import { Button, LabelInput, Spinner } from '@src/atoms';
import { Checkbox } from '@src/flowbite';
import { DashboardIcon } from '@src/icons';
import { emailPattern } from '@src/lib/constants/validation';
import { AdminConsoleRoutes } from '@src/routes';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { useGetSingleTeam } from '@queries/useTeamsQuery';
import { useInviteUser } from '@queries/useInviteQuery';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';

function InviteMembersPage() {
  const { organizationId, teamId } = useParams() || {};
  const [isAdmin, setIsAdmin] = useState(false);

  const { control, formState, watch } = useForm({ mode: 'all' });

  const { email = '' } = watch() || {};

  const { isValid } = formState;

  const { data: organizationDetails, isLoading } = useGetSingleOrganization(
    organizationId as string,
  );

  const { data: teamDetails, isLoading: isTeamLoading } = useGetSingleTeam(
    teamId as string,
  );

  const { name: teamName } = teamDetails || {};

  const { name: organizationName = '' } = organizationDetails || {};

  const { showSuccessToast, showErrorToast } = useToast();

  const { mutateAsync: inviteUser, isPending: isInvitePending } = useInviteUser(
    {},
  );

  const onInviteUser = async () => {
    const orgOrTeamId = teamId
      ? {
          teamId: teamId as string,
          orgId: organizationDetails?.id as string,
        }
      : {
          orgId: organizationDetails?.id as string,
        };
    try {
      const result = await inviteUser({
        email,
        ...orgOrTeamId,
        ...(isAdmin ? { isOrgTeamAdmin: isAdmin } : {}),
      });
      if (result?.error) {
        showErrorToast({
          message: `${typeof result.error === 'string' ? result.error : 'Something went wrong, Please try again later.'}`,
        });
      } else {
        showSuccessToast({ message: 'Invite has been sent.' });
      }
    } catch (e: any) {
      showErrorToast({ message: 'Failed to send invite.' });
    }
  };

  const breadcrumbs = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Organizations', url: AdminConsoleRoutes.Organizations },
    {
      name: organizationName || '-',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}`,
    },
    {
      name: 'Users',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}`,
    },
    { name: `Invite Users To ${organizationName}` || '-' },
  ];

  const teamBreadcrumbs = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Organizations', url: AdminConsoleRoutes.Organizations },
    {
      name: organizationName || '-',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}`,
    },
    {
      name: 'Teams',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}/teams`,
    },
    {
      name: teamName || '-',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}/teams/${teamId}`,
    },
    {
      name: 'Users',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}/teams/${teamId}`,
    },
    { name: `Invite Users To ${teamName}` || '-' },
  ];

  function IsAdminCheckbox() {
    const onSetIsAdmin = () => {
      setIsAdmin(!isAdmin);
    };
    return (
      <div className="flex gap-3 items-center w-max">
        <Checkbox
          onChange={onSetIsAdmin}
          checked={isAdmin}
          className="w-6 h-6"
        />
        <p className="text-black dark:text-white">Is Admin</p>
      </div>
    );
  }

  return isLoading || isTeamLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div>
      <BreadcrumbWithActions
        breadcrumbs={teamId ? teamBreadcrumbs : breadcrumbs}
      />
      <div className="mt-10 space-y-8 md:ml-[100px]">
        <LabelInput
          control={control}
          name="email"
          className="md:!w-[600px] !w-full"
          label="Email"
          placeholder="Email"
          rules={{
            pattern: emailPattern,
          }}
          errorMessage="Entered value does not match email format"
        />
        <IsAdminCheckbox />
        <Button
          className="py-3"
          size="sm"
          disabled={!isValid || !email || isInvitePending}
          onClick={onInviteUser}
          theme={{
            color: {
              info: '!bg-transparent dark:text-yellow-400 text-indigo-600 border border-indigo-600 dark:border-yellow-400 hover:!bg-opacity-80',
            },
            size: { sm: 'px-8 text-[16px] font-medium' },
          }}
        >
          Invite
        </Button>
      </div>
    </div>
  );
}

export default InviteMembersPage;
