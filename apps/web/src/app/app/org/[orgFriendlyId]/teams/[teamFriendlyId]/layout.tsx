'use client';

import { NavigationWizard } from '@components/common/navigation-wizard';
import { useParams, usePathname } from 'next/navigation';
import { useAuthContext } from '@context/AuthContext';
import { useGetSingleOrganizationByFriendlyId } from '@queries/useOrganizationsQuery';
import { useGetSingleTeam } from '@queries/useTeamsQuery';
import { UserRoles } from '@src/types/modules';
import { useEffect } from 'react';
import { TeamConsoleNavigationEnum, TeamConsoleNavigations } from './types';

function OrgTeamConsoleLayout({ children }: { children: React.ReactNode }) {
  const { orgFriendlyId, teamFriendlyId: teamId } = useParams() || {};
  const currentPathname = usePathname();

  const { currentOrg, setCurrentOrg, currentTeam, setCurrentTeam } =
    useAuthContext();

  const { name, id: orgIdFromContext } = currentOrg || {};

  const { name: teamName, id: teamIdFromContext } = currentTeam || {};

  const {
    data: organizationDetails,
    isLoading,
    isError,
  } = useGetSingleOrganizationByFriendlyId(orgFriendlyId as string);

  const { name: orgRoleName = '' } =
    organizationDetails?.orgUsers?.[0]?.role || {};

  const { data: teamDetails, isLoading: isTeamLoading } = useGetSingleTeam(
    teamId as string,
  );

  const { name: teamRoleName = '' } =
    teamDetails?.organization?.teams?.[0]?.teamUsers?.[0]?.role || {};

  const teamConsoleNavigationsWithId = TeamConsoleNavigations?.map(
    (navDetails) => ({
      ...navDetails,
      url:
        navDetails?.url &&
        navDetails?.url
          .replace(':orgFriendlyId', orgFriendlyId as string)
          ?.replace(':teamFriendlyId', teamId as string),
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

  useEffect(() => {
    if (!isTeamLoading) {
      if (teamDetails?.id) {
        const teamData = {
          id: teamDetails?.id || '',
          teamFriendlyId: teamDetails?.teamFriendlyId || '',
          name: teamDetails?.name || '',
          orgId: teamDetails?.orgId || '',
        };
        setCurrentTeam?.({ ...teamData });
      } else if (teamIdFromContext && !teamDetails?.id) {
        setCurrentTeam?.({});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamIdFromContext, teamDetails?.id, isTeamLoading]);

  const filteredOrgTeamNavigations =
    orgRoleName === UserRoles?.OrgAdmin || teamRoleName === UserRoles.TeamAdmin
      ? teamConsoleNavigationsWithId
      : teamConsoleNavigationsWithId?.filter(
          ({ name }) =>
            name !== TeamConsoleNavigationEnum.TeamSettings &&
            TeamConsoleNavigationEnum.TeamMembers,
        );

  const activePageIndex = TeamConsoleNavigations?.findIndex(({ url }) => {
    const resolvedPath = url
      ?.replace(':orgFriendlyId', orgFriendlyId as string)
      ?.replace(':teamFriendlyId', teamId as string);
    return resolvedPath === currentPathname;
  });

  if (isError || isLoading || isTeamLoading) {
    return <div className="pt-20">{children}</div>;
  }

  return (
    <NavigationWizard
      id="team-navigation-component"
      steps={filteredOrgTeamNavigations}
      currentStepIndex={activePageIndex}
      pageComponent={children}
      showCurrentPathBreadcrumb={
        TeamConsoleNavigations?.[activePageIndex]?.showCurrentPathBreadcrumb
      }
      showStepInfo={false}
      breadcrumbReplacements={[name || '', teamName || '']}
      splitSegment="/app/org"
      isNestedNavigationComponent
    />
  );
}

export default OrgTeamConsoleLayout;
