'use client';

import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { useGetSingleTeam } from '@queries/useTeamsQuery';
import HighlightBox from '@src/app/tach-color-shop/admin-console/HighlightBox';
import ViewPageInfo from '@src/app/tach-color-shop/admin-console/ViewPageInfo';
import { Spinner } from '@src/atoms';
import { DashboardIcon } from '@src/icons';
import { AdminConsoleRoutes } from '@src/routes';
import { useParams } from 'next/navigation';

function TeamViewPageInOrganizationLevel() {
  const { organizationId, teamId } = useParams() || {};

  const { data: organizationDetails } = useGetSingleOrganization(
    organizationId as string,
  );

  const { data: teamDetails, isLoading: isTeamLoading } = useGetSingleTeam(
    teamId as string,
  );

  const { highlights, name } = teamDetails || {};

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
    {
      name: 'Teams',
      url: `${AdminConsoleRoutes.Organizations}/${organizationId}/teams`,
    },
    { name: name || '-' },
  ];

  const viewInfo = [
    { key: 'Team Id#', value: teamId as string },
    { key: 'Team Name', value: name },
  ];

  return isTeamLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div className="space-y-5">
      <BreadcrumbWithActions breadcrumbs={breadcrumbs} />
      <ViewPageInfo title="Team Info" info={viewInfo} />
      {highlights?.length ? <HighlightBox items={highlights || []} /> : null}
    </div>
  );
}

export default TeamViewPageInOrganizationLevel;
