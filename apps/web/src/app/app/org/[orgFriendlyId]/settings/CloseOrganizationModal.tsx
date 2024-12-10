/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-promise-executor-return */

'use client';

import { useAuthContext } from '@context/AuthContext';
import { useToast } from '@context/ToastContext';
import { useDeleteOrganization } from '@queries/useOrganizationsQuery';
import { Button, LabelInput, Spinner } from '@src/atoms';
import { Card, Modal, ModalBody } from '@src/flowbite';
import { TachColorShopConsoleRoutes } from '@src/routes';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CloseOrganizationConfirmationModalProps {
  showModal: boolean;
  onCloseModal?: () => void;
}

const deleteInfos = [
  'Remove all teams and users associated with this organization.',
  'Permanently delete all data related to the organization.',
  'This action cannot be undone.',
];

function CloseOrganizationConfirmationModal(
  props: CloseOrganizationConfirmationModalProps,
) {
  const { showModal, onCloseModal } = props || {};

  const [isDeleting, setIsDeleting] = useState(false);

  const { currentOrg } = useAuthContext();
  const router = useRouter();

  const { orgFriendlyId } = useParams() || {};

  const { showErrorToast } = useToast();

  const { control, watch } = useForm({ mode: 'all' });

  const { organizationName } = watch();

  const { name: selectedOrganizationName } = currentOrg || {};

  const { mutateAsync: deleteOrganization } = useDeleteOrganization({
    successMessage: 'You have successfully deleted the organization.',
    failureMessage: 'Failed to delete the organization.',
    onSuccessCallback: () => {
      router?.push(TachColorShopConsoleRoutes.Overview);
    },
  });

  const onConfirmDeleteOrganization = async () => {
    setIsDeleting(true);
    const response = await deleteOrganization(orgFriendlyId as string);
    if (response?.error) {
      showErrorToast({ message: response?.error });
      setIsDeleting(false);
    }
  };

  return (
    <Card className="hidden">
      <Modal
        show={showModal}
        size="xl"
        onClose={onCloseModal}
        popup
        theme={{
          content: {
            base: 'relative w-full p-4 md:h-auto',
            inner:
              'relative flex flex-col rounded-lg border dark:!border-0 border-gray-200 bg-white shadow-3xl dark:bg-gray-700',
          },
          root: {
            show: { on: 'flex bg-opacity-50 dark:bg-opacity-80' },
            sizes: { xl: 'max-w-[610px]' },
          },
        }}
      >
        <ModalBody className="mt-8 !text-neutral dark:!text-gray-100">
          <p className="mb-5">Deleting the organization will:</p>
          <ul className="pl-8 list-disc">
            {deleteInfos?.map((info) => <li key={info}>{info}</li>)}
          </ul>
          <p className="mt-10 mb-7">
            If you are certain, please type the organization name below to
            confirm.
          </p>
          <LabelInput
            control={control}
            name="organizationName"
            placeholder="Name"
            colorClass="dark:!bg-gray-800 h-[50px] !placeholder-opacity-50"
            rules={{
              validate: async (value: string) => {
                if (value !== selectedOrganizationName) {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return 'The entered organization name does not match.';
                }
                return true;
              },
            }}
          />
          <div className="flex mt-8 justify-end gap-4 flex-wrap">
            <Button
              className="py-3 !bg-transparent !text-neutral dark:!text-gray-100 border !border-neutral dark:!border-gray-100 hover:!bg-gray-100 dark:hover:!bg-gray-800"
              size="sm"
              onClick={onCloseModal}
              theme={{
                size: { sm: 'px-8 text-[16px] font-medium' },
              }}
            >
              Cancel
            </Button>
            <Button
              className="py-3 !bg-transparent !text-danger border !border-danger hover:!bg-danger-light"
              size="sm"
              disabled={selectedOrganizationName !== organizationName}
              onClick={onConfirmDeleteOrganization}
              theme={{
                size: { sm: 'px-8 text-[16px] font-medium' },
              }}
            >
              {isDeleting ? (
                <Spinner className="fill-primary-white dark:fill-primary-white" />
              ) : (
                'Delete Organization'
              )}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Card>
  );
}

export default CloseOrganizationConfirmationModal;
