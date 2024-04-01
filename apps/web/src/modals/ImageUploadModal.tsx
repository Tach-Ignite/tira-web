'use client';

import React from 'react';
import { Modal, ModalBody, ModalFooter, Label, FileInput } from '@src/flowbite';
import { Button } from '@src/atoms';
import { UploadBoldIcon } from '@src/icons';
import { ImageUploadCard } from '@src/cards';
import { usePathname } from 'next/navigation';
import { UploadImagesModalProps } from './types';

function getFileSizeInMB(file: File) {
  const fileSizeInBytes = file.size;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  return Number(fileSizeInMB.toFixed(2));
}

const maximumImageLength = 5;

const maximumImageSize = 5;

function ImageUploadModal(props: UploadImagesModalProps) {
  const { showModal, onCloseModal, form, onSaveModal, onHandleDelete } =
    props || {};

  const pathName = usePathname();

  const { setValue, watch } = form || {};

  const { files: imageFiles = [], productImageUrl = [] } = watch() || {};

  const filteredImageLength = productImageUrl?.length
    ? maximumImageLength - Number(productImageUrl?.length)
    : maximumImageLength - Number(imageFiles?.length);

  const canAddImage = productImageUrl?.length
    ? maximumImageLength - Number(productImageUrl?.length) !== 0
    : Number(imageFiles?.length) - filteredImageLength < maximumImageLength;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const fileNames = imageFiles?.map((file: File) => file?.name);

      let files = Object.values(event.target.files)
        ?.filter((file: File) => !fileNames?.includes(file?.name))
        .slice(0, filteredImageLength);

      if (pathName.includes('services')) {
        files = files.map((file: File) => {
          const newName = `services-${file.name}`;
          return new File([file], newName, { type: file.type });
        });
      } else if (pathName.includes('products')) {
        files = files.map((file: File) => {
          const newName = `products-${file.name}`;
          return new File([file], newName, { type: file.type });
        });
      }

      setValue('files', [...files, ...imageFiles]);
    }
  };

  return (
    <Modal
      show={showModal}
      onClose={onCloseModal}
      className="relative"
      popup
      theme={{
        root: {
          show: {
            on: 'flex bg-gray-50/75 dark:bg-gray-900/75',
          },
        },
        body: { base: 'flex-1 overflow-auto p-6 pb-0' },
      }}
    >
      <div className="w-full p-6">
        <div className="font-semibold text-sm text-black dark:text-white mb-3">
          Upload Product Photos
        </div>
        <Label className="rounded-lg h-44 m-auto justify-center text-gray-500 flex flex-col items-center bg-gray-100 dark:bg-gray-600 dark:text-gray-300 font-normal text-xs leading-[18px] mb-4">
          <UploadBoldIcon className="h-14 w-14" />
          <div>Click to upload photos</div>
          {canAddImage ? (
            <FileInput
              id="dropzone-file"
              className="hidden"
              multiple
              accept=".svg, .png, .jpg, .jpeg, .gif"
              onChange={handleChange}
            />
          ) : null}
        </Label>
      </div>
      <ModalBody>
        <div className="flex flex-col gap-3 sortable-image-card overflow-auto">
          {imageFiles?.map((file: File) => {
            const { name } = file || {};

            const onDelete = () => {
              onHandleDelete(file);
            };
            const fileSize = getFileSizeInMB(file);
            let className = '';
            if (fileSize >= maximumImageSize) {
              className = 'border border-red-600 dark:border-red-400';
            }

            return (
              <ImageUploadCard
                key={name}
                fileName={name}
                file={file}
                isMaximumSizeFile={fileSize >= maximumImageSize}
                className={className}
                onHandleDelete={onDelete}
              />
            );
          })}
        </div>
      </ModalBody>
      <div className="px-6 pt-2 pb-4 text-xs leading-[18px] text-gray-500 dark:text-gray-300">
        Maximum 5 images
      </div>
      <ModalFooter>
        <div className="flex justify-end place-content-end gap-3 w-full">
          <Button
            color="gray"
            theme={{
              color: {
                gray: 'border border-gray-600 bg-white text-gray-800 dark:border-gray-300 dark:bg-gray-700 dark:text-gray-300',
              },
            }}
            onClick={onCloseModal}
          >
            Discard Changes
          </Button>
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={onSaveModal}
            disabled={imageFiles.length === 0}
          >
            Save Changes
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default ImageUploadModal;
