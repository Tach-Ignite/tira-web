'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ProductImage from '../../../public/assets/product-image.svg';

interface DetailedImageViewProps {
  imageUrls: string[];
}

function DetailedImageView({ imageUrls }: DetailedImageViewProps) {
  const [activeImage, setActiveImage] = useState<string>();

  const activeImageUrl = useMemo(
    () => `${process.env.BUCKET_PREFIX}${activeImage}`,
    [activeImage],
  );

  const activeFileName = useMemo(
    () => activeImage?.split('--')?.[0] || '',
    [activeImage],
  );

  const onChangeImage = (fileUrl: string) => {
    setActiveImage(fileUrl);
  };

  useEffect(() => {
    if (imageUrls?.[0]) {
      setActiveImage(imageUrls[0]);
    }
  }, [imageUrls]);

  return (
    <div className="w-[50%] max-[1000px]:w-[100%]">
      <img
        src={activeImage ? activeImageUrl : ProductImage.src}
        alt={activeFileName}
        className="w-[427px] rounded-[50%] flex items-center h-[427px] max-[450px]:h-[200px] max-[450px]:w-[200px] m-auto"
      />
      <div className="flex gap-4 mt-5 justify-center">
        {imageUrls?.length ? (
          imageUrls?.map((url: string) => {
            const fileUrl = `${process.env.BUCKET_PREFIX}${url}`;
            const fileName = activeImage?.split('--')?.[0] || '';

            const onChange = () => {
              onChangeImage(url);
            };

            return (
              <button type="button" onClick={onChange}>
                <img
                  src={fileUrl}
                  alt={fileName}
                  key={fileName}
                  className="h-[128px] w-[128px] cursor-pointer max-[450px]:h-[75px] max-[450px]:w-[75px] max-[1000px]:h-[100px] max-[1000px]:w-[100px] rounded-[50%]"
                />
              </button>
            );
          })
        ) : (
          <img
            src={ProductImage?.src}
            alt="View-product"
            className="h-[128px] w-[128px] cursor-pointer max-[450px]:h-[75px] max-[450px]:w-[75px] max-[700px]:h-[100px] max-[700px]:w-[100px] rounded-[50%]"
          />
        )}
      </div>
    </div>
  );
}

export default DetailedImageView;
