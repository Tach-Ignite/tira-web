/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import { useToast } from '@context/ToastContext';
import { useAuthContext } from '@context/AuthContext';
import { Button, LabelInput, Spinner } from '@src/atoms';
import { Checkbox } from '@src/flowbite';
import { emailPattern } from '@src/lib/constants/validation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { useGetSingleTeam } from '@queries/useTeamsQuery';
import { useInviteUser } from '@queries/useInviteQuery';

function InviteMembersPage() {
  const { orgFriendlyId: organizationId, teamId } = useParams() || {};
  const { setSinglePageName } = useAuthContext();
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

  useEffect(() => {
    if (!teamId && organizationDetails?.id) {
      const { name = '' } = organizationDetails || {};
      setSinglePageName?.(`Invite Users to ${name || ''}`);
    }
    if (teamId && teamDetails?.id) {
      const { name = '' } = teamDetails || {};
      setSinglePageName?.(`Invite Users to ${name || ''}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationDetails]);

  return isLoading || isTeamLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
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
  );
}

export default InviteMembersPage;
