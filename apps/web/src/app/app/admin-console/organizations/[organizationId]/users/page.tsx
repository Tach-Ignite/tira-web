'use client';

import { useParams } from 'next/navigation';
import { DashboardIcon } from '@src/icons';
import { AdminConsoleRoutes } from '@src/routes';
import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { AdminConsoleUserTable } from '@src/app/app/admin-console/users/components';

function UsersPage() {
  const { organizationId } = useParams() || {};
  const { data: organizationDetails, isLoading } = useGetSingleOrganization(
    organizationId as string,
  );
  const breadcrumbs = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Organizations', url: AdminConsoleRoutes.Organizations },
    {
      name: organizationDetails?.name || '-',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}`,
    },
    { name: 'Users' },
  ];

  return (
    <div className="space-y-5">
      {isLoading ? null : <BreadcrumbWithActions breadcrumbs={breadcrumbs} />}
      <AdminConsoleUserTable
        urlPrefix={`${AdminConsoleRoutes.Organizations}/${organizationId}/users`}
        orgId={organizationDetails?.id as string}
        includeInvite
      />
    </div>
  );
}

export default UsersPage;
