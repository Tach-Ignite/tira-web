'use client';

import { useParams } from 'next/navigation';
// import { OrgConsoleRoutes } from '@src/routes';
import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { useGetSingleTeam } from '@queries/useTeamsQuery';
import { Spinner } from '@src/atoms';
import { UserConsoleUserTable } from './components';

function UsersPage() {
  const { orgFriendlyId, teamFriendlyId: teamId } = useParams() || {};
  const { data: organizationDetails, isLoading } = useGetSingleOrganization(
    orgFriendlyId as string,
  );

  const { data: teamDetails, isLoading: isTeamLoading } = useGetSingleTeam(
    teamId as string,
  );

  return (
    <div className="space-y-5">
      {isLoading || isTeamLoading ? (
        <div className="m-auto text-center">
          <Spinner className="fill-primary-dark dark:fill-primary-dark" />
        </div>
      ) : (
        <UserConsoleUserTable
          orgId={organizationDetails?.id as string}
          orgFriendlyId={orgFriendlyId as string}
          teamId={teamDetails?.id as string}
          includeInvite
        />
      )}
    </div>
  );
}

export default UsersPage;
