'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from '@src/flowbite';
import { Button } from '@src/atoms';
import { PencilLight } from '@src/icons';
import AppSpinner from '@components/appSpinner/AppSpinner';

import { useGetService } from '@queries/useServicesQuery';
import { convertToDollarAmount } from '@src/lib/numbers';

function ViewServicePage() {
  const [activeImage, setActiveImage] = useState<string>();
  const router = useRouter();

  const { serviceId } = useParams() || {};

  const { data: services, isLoading } = useGetService(serviceId as string);

  const {
    imageUrls,
    serviceName,
    price = 0,
    description,
    duration,
    categories,
    additionalDetails,
  } = services || {};

  const activeImageUrl = useMemo(
    () => `${process.env.BUCKET_PREFIX}${activeImage}`,
    [activeImage],
  );

  const activeFileName = useMemo(
    () => activeImage?.split('--')?.[0] || '',
    [activeImage],
  );

  useEffect(() => {
    if (imageUrls?.[0]) {
      setActiveImage(imageUrls[0]);
    }
  }, [imageUrls]);

  const onChangeImage = (fileUrl: string) => {
    setActiveImage(fileUrl);
  };

  const onEditService = () => {
    router.push(`/admin/services/edit/${serviceId}`);
  };

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="relative">
          <AppSpinner show />
        </div>
      ) : null}
      {services ? (
        <div className="flex gap-32 w-full max-[1000px]:flex-col max-w-[1300px] self-center">
          <div className="w-[50%] max-[1000px]:w-[100%]">
            <img
              src={activeImage && activeImageUrl}
              alt={activeFileName}
              className="w-[427px] rounded-[50%] flex items-center h-[427px] max-[450px]:h-[200px] max-[450px]:w-[200px] m-auto"
            />
            <div className="flex gap-4 mt-5 justify-center">
              {imageUrls?.length
                ? imageUrls?.map((url: string) => {
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
                : ''}
            </div>
          </div>
          <div className="w-[50%] mr-10 max-[1000px]:w-[100%]">
            <div className="text-black font-bold text-2xl leading-[36px] dark:text-white">
              {serviceName}
            </div>
            <div className="font-normal text-2xl leading-[36px] text-green-500 dark:text-green-400 mt-4 mb-12">
              {convertToDollarAmount(price)} per {duration?.toString()} minutes
            </div>

            <Button fullSized className="mb-14" onClick={onEditService}>
              <PencilLight size={20} className="mr-3" />
              Edit Service
            </Button>

            <div className="h-[2px] mb-6 bg-gray-200 dark:bg-gray-500" />
            {description ? (
              <div className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-6">
                {description}
              </div>
            ) : null}
            {categories?.map((element) => (
              <span
                key={element.categoryId}
                className="p-2.5 bg-primary-100 rounded-lg text-indigo-700 dark:text-indigo-300 dark:border-[0.5px] dark:border-indigo-300 dark:bg-gray-700 m-2"
              >
                {element.name}
              </span>
            ))}
            {additionalDetails && (
              <div className="mt-12">
                <Accordion>
                  <AccordionPanel>
                    <AccordionTitle>Additional Details</AccordionTitle>
                    <AccordionContent>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        {additionalDetails}
                      </p>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ViewServicePage;
