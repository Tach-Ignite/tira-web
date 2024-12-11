'use client';

import { ConsoleProgressCard, RecentActivities } from '@components/console';
import { useToast } from '@context/ToastContext';
import {
  useGetSingleOrganizationByFriendlyId,
  useLeaveOrganizationUser,
} from '@queries/useOrganizationsQuery';
import { Button, Spinner } from '@src/atoms';
import { getCompletionNumber } from '@src/lib/functions';
import { DeleteModal } from '@src/modals';
import { OrgConsoleRoutes, TachColorShopConsoleRoutes } from '@src/routes';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const totalOrganizationProfileFields = 15;

function OrdConsoleOverview() {
  const { orgFriendlyId } = useParams() || {};

  const router = useRouter();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { showErrorToast } = useToast();

  const {
    data: organizationDetails,
    isLoading,
    error,
    isError,
  } = useGetSingleOrganizationByFriendlyId(orgFriendlyId as string);

  const organizationProfileUrl = OrgConsoleRoutes.OrganizationProfile.replace(
    ':orgFriendlyId',
    orgFriendlyId as string,
  );

  const { mutateAsync: leaveOrganization } = useLeaveOrganizationUser({
    successMessage: 'You have successfully left the organization.',
    onSuccessCallback: () => {
      router?.push(TachColorShopConsoleRoutes.Overview);
    },
  });

  const {
    id,
    updatedAt,
    createdAt,
    orgFriendlyId: detailOrgFriendlyId,
    orgUsers,
    ...restDetails
  } = organizationDetails || {};

  const completionPercentage = getCompletionNumber(restDetails);

  const items = [
    { label: 'Name', content: organizationDetails?.name },
    { label: 'Company Email', content: organizationDetails?.companyEmail },
    { label: 'Company Phone', content: organizationDetails?.companyPhone },
  ]?.filter(({ content }) => Boolean(content));

  const onToggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  const onConfirmLeaveOrganization = async () => {
    const response = await leaveOrganization(orgFriendlyId as string);
    setShowConfirmationModal(false);
    if (response?.error) {
      showErrorToast({ message: response?.error, duration: 10000 });
    }
  };

  if (isError) {
    return (
      <div className="text-danger text-center">{(error as any)?.error}</div>
    );
  }

  return isLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-primary-dark dark:fill-primary-dark" />
    </div>
  ) : (
    <div className="space-y-10 lg:w-4/5">
      {completionPercentage !== totalOrganizationProfileFields ? (
        <ConsoleProgressCard
          label="Complete Organization Profile"
          url={organizationProfileUrl}
          isProgressChart
          isLoading={isLoading}
          completed={completionPercentage}
          total={totalOrganizationProfileFields}
        />
      ) : null}
      <div className="shadow-l rounded-lg dark:shadow-sm outline-3 outline outline-gray dark:outline-white py-8 px-4 w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-1">
        <p className="text-black dark:text-gray-50 font-bold text-[18px]">
          Org Info
        </p>
        <div className="space-y-3 mt-5">
          {items?.map(({ label, content }) => (
            <div
              className="flex gap-3 text-gray-500 dark:text-gray-300"
              key={content}
            >
              <p className="font-semibold">{label}: </p>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
      <RecentActivities userId="demo" />
      <div className="float-end pt-16">
        <Button
          className="py-3 hover:!bg-gray-100 dark:hover:!text-black !bg-transparent text-black border border-neutral-light dark:text-white dark:border-white hover:!bg-opacity-80"
          size="sm"
          onClick={onToggleConfirmationModal}
          theme={{
            size: { sm: 'px-8 text-[16px] font-medium' },
          }}
        >
          Leave this Organization
        </Button>
      </div>
      {showConfirmationModal ? (
        <DeleteModal
          showModal={showConfirmationModal}
          onCloseModal={onToggleConfirmationModal}
          buttonNames={['Confirm', 'Cancel']}
          onHandleConfirm={onConfirmLeaveOrganization}
          description="Are you sure you want to leave this organization?"
        />
      ) : null}
    </div>
  );
}

export default OrdConsoleOverview;
