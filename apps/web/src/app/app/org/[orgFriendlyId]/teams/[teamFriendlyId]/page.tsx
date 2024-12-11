'use client';

import { useState } from 'react';
import { useToast } from '@context/ToastContext';
import { useGetSingleTeam, useLeaveTeam } from '@queries/useTeamsQuery';
import { Spinner, Button } from '@src/atoms';
import { useParams, useRouter } from 'next/navigation';
import { DeleteModal } from '@src/modals';
import { OrgConsoleRoutes } from '@src/routes';
import HighlightBox from '../components/HighlightBox';
import ViewPageInfo from '../components/ViewPageInfo';

function TeamViewPageInOrganizationLevel() {
  const { orgFriendlyId: organizationId, teamFriendlyId: teamId } =
    useParams() || {};
  const router = useRouter();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { showErrorToast } = useToast();

  const { data: teamDetails, isLoading: isTeamLoading } = useGetSingleTeam(
    teamId as string,
  );

  const { highlights, name, _count } = teamDetails || {};

  const viewInfo = [
    { key: 'Name', value: name },
    { key: 'Number of Members', value: `${_count?.teamUsers || 0}` },
  ];

  const { mutateAsync: leaveTeam } = useLeaveTeam({
    successMessage: 'You have successfully left the team.',
    onSuccessCallback: () => {
      router?.push(
        OrgConsoleRoutes.Overview?.replace(
          ':orgFriendlyId',
          organizationId as string,
        ),
      );
    },
  });

  const onToggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const onConfirmLeaveTeam = async () => {
    const response = await leaveTeam({ teamId: teamDetails?.id as string });
    setShowConfirmationModal(false);
    if (response?.error) {
      showErrorToast({ message: response?.error, duration: 10000 });
    }
  };

  return isTeamLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-indigo-600 dark:fill-yellow-400" />
    </div>
  ) : (
    <div className="space-y-5 w-full px-4">
      <ViewPageInfo title="Team Info" info={viewInfo} />
      {highlights?.length ? <HighlightBox items={highlights || []} /> : null}
      <div className="float-end pt-16">
        <Button
          className="py-3 hover:!bg-gray-100 dark:hover:!text-black !bg-transparent text-black border border-neutral-light dark:text-white dark:border-white hover:!bg-opacity-80"
          size="sm"
          onClick={onToggleConfirmationModal}
          theme={{
            size: { sm: 'px-8 text-[16px] font-medium' },
          }}
        >
          Leave this Team
        </Button>
      </div>
      {showConfirmationModal ? (
        <DeleteModal
          showModal={showConfirmationModal}
          onCloseModal={onToggleConfirmationModal}
          buttonNames={['Confirm', 'Cancel']}
          onHandleConfirm={onConfirmLeaveTeam}
          description="Are you sure you want to leave this team?"
        />
      ) : null}
    </div>
  );
}

export default TeamViewPageInOrganizationLevel;
