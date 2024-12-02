'use client';

import { useParams } from 'next/navigation';
import { DashboardIcon } from '@src/icons';
import { AdminConsoleRoutes } from '@src/routes';
import { useGetSingleTeam } from '@queries/useTeamsQuery';
import { AdminConsoleUserTable } from '@src/app/tach-color-shop/admin-console/users/components';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';

function TeamUsersPage() {
  const { teamId, organizationId } = useParams() || {};
  const { data: teamDetails, isLoading } = useGetSingleTeam(teamId as string);

  const { name, organization } = teamDetails || {};

  const breadcrumbs = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Organizations', url: AdminConsoleRoutes.Organizations },
    {
      name: organization?.name || '-',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}`,
    },
    {
      name: 'Teams',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}/teams`,
    },
    {
      name: name || '-',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}/teams/${teamId}`,
    },
    {
      name: 'Users',
    },
  ];

  return (
    <div className="space-y-5">
      {isLoading ? null : <BreadcrumbWithActions breadcrumbs={breadcrumbs} />}
      <AdminConsoleUserTable
        urlPrefix={`${AdminConsoleRoutes.Organizations}/${organizationId}/teams/${teamId}/users`}
        orgId={organization?.id as string}
        teamId={teamId as string}
        includeInvite
      />
    </div>
  );
}

export default TeamUsersPage;
