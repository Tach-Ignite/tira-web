'use client';

import { Button } from '@src/atoms';
import { Modal, ModalHeader, ModalBody, Card } from '@src/flowbite';
import { ExclamationWarningIcon } from '@src/icons';
import { DeleteModalProps } from './types';

function DeleteModal(props: DeleteModalProps) {
  const { showModal, onCloseModal, onHandleConfirm, description, buttonNames } =
    props || {};

  return (
    <Card>
      <Modal
        show={showModal}
        size="md"
        onClose={onCloseModal}
        popup
        theme={{
          content: {
            inner:
              'relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow-3xl dark:bg-gray-700',
          },
          root: {
            show: { on: 'flex bg-opacity-50 dark:bg-opacity-80' },
          },
        }}
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <ExclamationWarningIcon className="mx-auto mb-4 h-10 w-10 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {description}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                outline
                color="failure"
                onClick={onHandleConfirm}
                theme={{
                  outline: {
                    on: 'flex w-full justify-center bg-white text-red-600 transition-all duration-75 ease-in dark:bg-gray-700 dark:text-red-400',
                  },
                }}
              >
                {buttonNames?.[0] || 'Delete'}
              </Button>
              <Button
                outline
                color="dark"
                onClick={onCloseModal}
                theme={{
                  outline: {
                    on: 'flex w-full justify-center bg-white text-gray-800 transition-all duration-75 ease-in dark:bg-gray-700 dark:text-gray-400',
                  },
                  color: {
                    dark: 'border border-transparent bg-gray-800 text-white focus:ring-0 focus:ring-0 dark:border-gray-400 dark:bg-gray-400',
                  },
                }}
              >
                {buttonNames?.[1] || 'Cancel'}
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Card>
  );
}

export default DeleteModal;
