'use client';

import { useParams } from 'next/navigation';
// import { OrgConsoleRoutes } from '@src/routes';
import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { Spinner } from '@src/atoms';
import { UserConsoleUserTable } from './components';

function UsersPage() {
  const { orgFriendlyId } = useParams() || {};
  const { data: organizationDetails, isLoading } = useGetSingleOrganization(
    orgFriendlyId as string,
  );

  return (
    <div className="space-y-5">
      {isLoading ? (
        <div className="m-auto text-center">
          <Spinner className="fill-primary-dark dark:fill-primary-dark" />
        </div>
      ) : (
        <UserConsoleUserTable
          // urlPrefix={`${OrgConsoleRoutes.OrganizationUsers.replace(':orgFriendlyId', orgFriendlyId as string)}`}
          orgId={organizationDetails?.id as string}
          orgFriendlyId={orgFriendlyId as string}
          includeInvite
        />
      )}
    </div>
  );
}

export default UsersPage;
