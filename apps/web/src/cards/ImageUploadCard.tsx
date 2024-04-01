import React from 'react';
import { TrashIcon } from '@src/icons';
import Image from 'next/image';
import { ImageUploadCardType } from './types';

function ImageUploadCard(props: ImageUploadCardType) {
  const {
    fileName,
    file,
    fileUrl = '',
    onHandleDelete,
    className = '',
    isMaximumSizeFile,
  } = props;

  const imageUrl = `${process.env.BUCKET_PREFIX}${fileUrl}`;

  return (
    <div
      className={`flex gap-5 image-card rounded-lg bg-gray-100 dark:bg-gray-600 p-2 pb-4 ${className}`}
    >
      <Image
        className="h-24	w-24 rounded-[50%]"
        alt="image"
        width={24}
        height={24}
        src={
          file ? URL.createObjectURL(file as unknown as MediaSource) : imageUrl
        }
      />
      <div className="flex justify-between w-full mr-6">
        <div className="font-medium">
          {/* <div className="text-black dark:text-white text-xs leading-[18px]">
            {fileName}
          </div> */}
          {isMaximumSizeFile ? (
            <div className="text-red-600 mt-3 dark:text-red-400 text-[10px] leading-[15px]">
              Photo Doesn’t Meet Size Requirements
            </div>
          ) : null}
        </div>
        <TrashIcon
          className="text-red-600 self-end cursor-pointer dark:text-red-400 h-6 w-6"
          onClick={onHandleDelete}
        />
      </div>
    </div>
  );
}

export default ImageUploadCard;
