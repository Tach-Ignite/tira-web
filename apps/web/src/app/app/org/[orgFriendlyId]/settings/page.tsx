'use client';

import { Button, Spinner } from '@src/atoms';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@context/AuthContext';
import { UserRoles } from '@src/types/modules';
import CloseOrganizationConfirmationModal from './CloseOrganizationModal';

function OrgConsoleSettingsPage() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const { currentOrg } = useAuthContext();

  const { orgFriendlyId, orgUsers } = currentOrg || {};

  const { name: orgUserRoleName } = orgUsers?.[0]?.role || {};

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const onToggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  if (isPageLoaded) {
    if (!orgFriendlyId) {
      return (
        <div className="text-danger text-center">
          No organizations exist with this ID
        </div>
      );
    }
    if (orgUserRoleName && orgUserRoleName !== UserRoles.OrgAdmin) {
      return (
        <div className="text-danger text-center">
          Only Admin can see the settings
        </div>
      );
    }
  }

  return !isPageLoaded || !orgUserRoleName ? (
    <div className="m-auto text-center">
      <Spinner className="fill-primary-dark dark:fill-primary-dark" />
    </div>
  ) : (
    <div className="border rounded-lg border-neutral-light dark:border-white sm:!px-10 !px-4 py-12 max-w-5xl">
      <p className="text-danger mb-5 font-semibold text-[24px]">
        Close the organization
      </p>
      <p className="mb-14 dark:text-gray-50">
        Deleting the organization is a permanent action that cannot be undone.
        This will remove all associated teams,users and data. Please proceed
        with caution
      </p>
      <Button
        className="py-3 !bg-transparent !text-danger border !border-danger hover:!bg-danger-light"
        size="sm"
        onClick={onToggleConfirmationModal}
        theme={{
          size: { sm: 'px-8 text-[16px] font-medium' },
        }}
      >
        Delete Organization
      </Button>
      {showConfirmationModal ? (
        <CloseOrganizationConfirmationModal
          showModal={showConfirmationModal}
          onCloseModal={onToggleConfirmationModal}
        />
      ) : null}
    </div>
  );
}

export default OrgConsoleSettingsPage;
