'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Label, FileInput, Card } from '@src/flowbite';
import { CloseCircleIcon } from '@src/icons';
import { FileService } from '@services';
import { ImageUploadCard } from '@src/cards';
import { ImageUploadModal } from '@src/modals';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { EditPicturesGridProps } from './types';
import { Button } from '../Button';

function getFileTypeFromUrl(fileUrl: string) {
  const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
  const fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
  return fileType;
}

function ImageUpload(props: EditPicturesGridProps) {
  const {
    form,
    onUpdateImage,
    label = 'Upload photos',
    isSingleImage = false,
    gridTitle = 'Edit Pictures',
    fileUrl,
    imageField = '',
    isError = false,
    errorMessage = '',
    isProfilePhoto = false,
    acceptedFiles,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathName = usePathname();

  const { setValue, watch } = form || {};

  const { files = [], [imageField]: imageUrls = [] } = watch();

  useEffect(() => {
    if (isError && errorMessage?.length && !imageUrls?.length) {
      setShowErrors(true);
    } else {
      setShowErrors(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, errorMessage, watch]);

  const onCancelModel = () => {
    setShowModal(!showModal);
    setValue('files', []);
  };

  const onSaveModal = async () => {
    if (!files.length) {
      return;
    }
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append('files', file);
    });

    const res = await FileService.uploadMultiImage(formData);
    const uploadedImageUrls = res?.data || [];

    setValue(imageField, [...uploadedImageUrls, ...imageUrls], {
      shouldDirty: true,
    });
    setValue('files', []);
    form.clearErrors('imageUrls');
    setShowModal(false);
  };

  const onDeleteFileUrl = async (fileUrl: string) => {
    const res = await FileService.deleteImageUrl(fileUrl);
    const filteredImageUrls = imageUrls?.filter(
      (url: string) => url !== fileUrl,
    );
    if (res.status === 200) {
      setValue(imageField, filteredImageUrls);
      await onUpdateImage?.(watch());
    }
  };

  const onHandleUploadPhotos = () => {
    setShowModal(true);
  };

  const onHandleDelete = (deleteFile: File) => {
    const filteredFile = files?.filter(
      (file: File) => file?.name !== deleteFile.name,
    );
    setValue('files', filteredFile);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file) {
      let newFile = file;

      if (pathName.includes('account')) {
        const newName = `profile-${file.name}`;
        newFile = new File([file], newName, { type: file.type });
      }

      setValue('files[0]', newFile, { shouldDirty: true });
    }
  };

  const onUploadPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { name: fileName } = files?.[0] || {};

  const onRemoveFile = () => {
    fileUrl
      ? setValue('profileImage', '', { shouldDirty: true })
      : setValue('files', undefined, { shouldDirty: true });
  };

  const imageUrl = `${process.env.BUCKET_PREFIX}${fileUrl}`;

  function renderImageUpload() {
    return (isSingleImage && files?.[0]) || fileUrl ? (
      <div className="relative inline-block">
        <Image
          className="h-80 max-w-[405px] w-full bg-gray-200 dark:bg-gray-700"
          alt={fileName}
          width={10}
          height={10}
          src={
            files?.[0]
              ? URL.createObjectURL(files?.[0] as unknown as MediaSource)
              : imageUrl
          }
        />
        <CloseCircleIcon
          className="h-[30px] w-[30px] absolute top-[-10px] right-[-10px] cursor-pointer text-indigo-600 dark:text-yellow-400"
          onClick={onRemoveFile}
        />
      </div>
    ) : (
      <Label
        htmlFor="dropzone-file"
        className="h-80 bg-gray-200 dark:bg-gray-700 flex justify-center items-center text-xs leading-[18px] text-gray-500 dark:text-gray-400"
      >
        {label}
      </Label>
    );
  }

  return (
    <>
      <Card>
        <Label>{gridTitle}</Label>
        {!isSingleImage && imageUrls?.length ? (
          <div className="flex flex-col h-80 gap-3 sortable-image-card overflow-auto">
            {imageUrls?.map((fileUrl: string) => {
              const onDelete = async () => {
                await onDeleteFileUrl(fileUrl);
              };
              const fileType = getFileTypeFromUrl(fileUrl);

              const fileName = fileUrl.split('--')[0];

              return (
                <ImageUploadCard
                  className="bg-gray-100 dark:bg-gray-700"
                  key={fileUrl}
                  fileUrl={fileUrl}
                  fileName={`${fileName}.${fileType}`}
                  onHandleDelete={onDelete}
                />
              );
            })}
          </div>
        ) : (
          renderImageUpload()
        )}

        <Button
          color="gray"
          theme={{
            color: {
              gray: 'border border-gray-600 bg-transparent text-gray-600 dark:border-gray-300 dark:text-gray-300',
            },
          }}
          disabled={imageUrls?.length === 5}
          onClick={isSingleImage ? onUploadPhoto : onHandleUploadPhotos}
        >
          Upload {isSingleImage ? 'Photo' : 'Photos'}
        </Button>
        {isSingleImage ? (
          <FileInput
            id="dropzone-file"
            className="hidden"
            multiple
            // accept=".svg, .png, .jpg, .jpeg, .gif"
            accept={acceptedFiles || '.svg, .png, .jpg, .jpeg, .gif'}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        ) : null}
        <div className="text-gray-500 dark:text-gray-300 text-xs leading-[18px]">
          Supported types: {acceptedFiles || 'svg, png, jpeg'}., Maximum size:
          1MB
        </div>
        {showErrors ? (
          <div className="text-red-500 dark:text-red-400 text-xs leading-[18px]">
            {errorMessage}
          </div>
        ) : null}
      </Card>
      {!isSingleImage && showModal ? (
        <ImageUploadModal
          showModal={showModal}
          onCloseModal={onCancelModel}
          onSaveModal={onSaveModal}
          onHandleDelete={onHandleDelete}
          form={form}
        />
      ) : null}
    </>
  );
}

export default ImageUpload;
