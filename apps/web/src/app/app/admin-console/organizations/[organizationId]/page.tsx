'use client';

import { useGetSingleOrganization } from '@queries/useOrganizationsQuery';
import { DashboardIcon } from '@src/icons';
import { AdminConsoleRoutes } from '@src/routes';
import { useParams } from 'next/navigation';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { Spinner } from '@src/atoms';
// import HighlightBox from '../../HighlightBox';
import ViewPageInfo from '../../ViewPageInfo';

function OrganizationViewPage() {
  const { organizationId } = useParams() || {};

  const { data: organizationDetails, isLoading } = useGetSingleOrganization(
    organizationId as string,
  );

  const { id, name = '', websiteURL = '' } = organizationDetails || {};

  const breadcrumbs = [
    {
      content: <DashboardIcon className="h-10 w-10" />,
      name: 'Overview',
      url: AdminConsoleRoutes.Overview,
    },
    { name: 'Organizations', url: AdminConsoleRoutes.Organizations },
    { name: name || '-' },
  ];

  const viewInfo = [
    { key: 'Org Id#', value: id },
    { key: 'Name', value: name },
    { key: 'Website', value: websiteURL },
  ];

  return isLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div className="space-y-5">
      <BreadcrumbWithActions breadcrumbs={breadcrumbs} />
      <ViewPageInfo title="Organization Info" info={viewInfo} />
      {/* {highlights?.length ? <HighlightBox items={highlights || []} /> : null} */}
    </div>
  );
}

export default OrganizationViewPage;
