'use client';

import { NavigationWizard } from '@components/common/navigation-wizard';
import { useParams, usePathname } from 'next/navigation';
import { useAuthContext } from '@context/AuthContext';
import { useGetSingleOrganizationByFriendlyId } from '@queries/useOrganizationsQuery';
import { UserRoles } from '@src/types/modules';
import { useEffect } from 'react';
import { OrgConsoleNavigationEnum, orgConsoleNavigations } from './types';

function OrgConsoleLayout({ children }: { children: React.ReactNode }) {
  const { orgFriendlyId, teamFriendlyId } = useParams() || {};
  const currentPathname = usePathname();

  const { currentOrg, setCurrentOrg } = useAuthContext();

  const { name, id: orgIdFromContext } = currentOrg || {};

  const {
    data: organizationDetails,
    isLoading,
    isError,
  } = useGetSingleOrganizationByFriendlyId(orgFriendlyId as string);

  const { name: roleName } = organizationDetails?.orgUsers?.[0]?.role || {};

  const orgConsoleNavigationsWithId = orgConsoleNavigations?.map(
    (navDetails) => ({
      ...navDetails,
      url:
        navDetails?.url &&
        navDetails?.url.replace(':orgFriendlyId', orgFriendlyId as string),
    }),
  );

  useEffect(() => {
    if (!isLoading) {
      if (organizationDetails?.id) {
        setCurrentOrg?.(organizationDetails);
      } else if (orgIdFromContext && !organizationDetails?.id) {
        setCurrentOrg?.({});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgIdFromContext, organizationDetails?.id, isLoading]);

  const filteredOrgNavigations =
    roleName === UserRoles?.OrgAdmin
      ? orgConsoleNavigationsWithId
      : orgConsoleNavigationsWithId?.filter(
          ({ name }) =>
            name !== OrgConsoleNavigationEnum.OrganizationProfile &&
            name !== OrgConsoleNavigationEnum.OrganizationSettings,
        );

  const activePageIndex = orgConsoleNavigations?.findIndex(({ url }) => {
    const resolvedProfilePath = url?.replace(
      ':orgFriendlyId',
      orgFriendlyId as string,
    );
    return resolvedProfilePath === currentPathname;
  });

  if (isError || isLoading) {
    return <div className="pt-20">{children}</div>;
  }

  const activeIndex =
    roleName &&
    roleName !== UserRoles.OrgAdmin &&
    currentPathname?.includes('profile')
      ? 10
      : activePageIndex;

  if (teamFriendlyId) {
    return children;
  }
  return (
    <NavigationWizard
      id="org-navigation-component"
      steps={filteredOrgNavigations}
      currentStepIndex={activeIndex}
      pageComponent={children}
      showCurrentPathBreadcrumb={
        orgConsoleNavigations?.[activePageIndex]?.showCurrentPathBreadcrumb
      }
      showStepInfo={false}
      breadcrumbReplacements={[name || '']}
      splitSegment="/app/org"
    />
  );
}

export default OrgConsoleLayout;
