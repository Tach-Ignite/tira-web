/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable prettier/prettier */

'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Button } from '@src/atoms';
import { ArrowDownIcon, ArrowUpIcon } from '@src/icons';
import ExtendedServices from './lib/ExtendedServices';
import getIconFromName from './lib/getIconFromName';
import { IServicesProps } from './types';

function Services(props: IServicesProps) {
  const { bgColor = '', service, sectionProperties = {} } = props || {};

  const {
    imagePosition = 'right',
    leftComponentAnimation = '',
    rightComponentAnimation = '',
    rightSectionClassName = '',
    leftSectionClassName = '',
    imageClassName = '',
    titleClassName = 'sub-title text-[#333] dark:text-[#CCC] text-[18px] leading-[32px] uppercase mb-4 block',
    serviceImageClass = 'flex justify-end w-full lg:!h-full h-[100px] md:!h-[679px] relative',
    servicesListClass = 'fixed-md:grid fixed-md:!grid-cols-2 grid max-md:gap-[25px]',
    serviceBoxClass = 'relative lg:mb-[30px] lg:last:mb-0 border border-[#888] bg-white dark:bg-[#111]',
    serviceBoxInner = 'relative py-[30px] lg:px-[50px] px-[30px] transition duration-[0.5s] before:absolute before:left-[-1px] before:top-0 before:bottom-0 before:w-[5px] before:opacity-0 before:bg-[#f2885e] before:scale-x-[1] before:scale-y-[0.2] before:transition before:duration-[0.5s] hover:shadow hover:before:opacity-100 hover:before:scale-100',
    serviceListItemClass = 'relative flex',
    serviceListIconClass = 'w-[65px]',
    serviceListIconSvgClass = 'text-[54px] text-[#800079] dark:text-white',
    serviceListContentClass = 'lg:pl-[45px] pl-[30px]',
    serviceListContentTitleClass = 'text-[20px] dark:text-[#CCC] leading-[26px] uppercase mb-[10px]',
    serviceListContentDescClass = 'w-full text-[#333] dark:text-[#CCC] text-[14px]',
    boxedBtnClass = 'relative inline-flex text-[#111] py-[15px] px-[40px] overflow-hidden rounded-none !bg-transparent uppercase z-[2] content-none before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:opacity-0 before:bg-transparent before:transition before:duration-[0.4s] before:scale-x-[0.2] before:scale-y-[1] hover:before:opacity-100 hover:before:scale-100 hover:text-white text-[18px] leading-[30px] focus:!bg-transparent',
    btnGradient = '',
  } = sectionProperties || {};

  const { image, items, title } = service || {};
  const imageUrl = image?.data?.attributes?.url || null;

  const [imageSrc, setImageSrc] = useState(
    imageUrl || '/assets/placeholder-cta-sections.png',
  );

  const handleImageError = () => {
    setImageSrc('/assets/placeholder-cta-sections.png');
  };

  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const pathName = usePathname();

  const firstFourServices = items?.slice(0, 4);
  const restServices = items?.slice(4, items?.length);

  const renderContent = (className: string, animationType: string) => (
    <div
      className={`lg:col-span-6 xl:!mr-[140px] lg:!mr-[40px] max-md:!pt-[50px] ${className}`}
    >
      <div className="xl:!w-[490px] w-full ml-auto">
        <span className={titleClassName}>{title}</span>
        <div
          className={`${servicesListClass} ${inView ? animationType : ''}`}
          ref={ref}
        >
          {firstFourServices?.map(
            ({ description, icon, id, showIcon, title }) => {
              const Icon = showIcon && icon ? getIconFromName(icon) : null;
              return (
                <div className={serviceBoxClass} key={id}>
                  <div className={serviceBoxInner}>
                    <div className={serviceListItemClass}>
                      {Icon ? (
                        <div className={serviceListIconClass}>
                          <Icon className={serviceListIconSvgClass} />
                        </div>
                      ) : null}
                      <div className={serviceListContentClass}>
                        <h3 className={serviceListContentTitleClass}>
                          <div>{title}</div>
                        </h3>
                        {description && description?.split('\n')?.length
                          ? description?.split('\n')?.map((line, index) => (
                              <p
                                key={index + 1}
                                className={serviceListContentDescClass}
                              >
                                {line}
                              </p>
                            ))
                          : ''}
                      </div>
                    </div>
                  </div>
                </div>
              );
            },
          )}
          {restServices?.length ? (
            <Button
              type="button"
              gradientDuoTone={btnGradient}
              aria-expanded="false"
              aria-controls="accordion-collapse-body-1"
              className={`${boxedBtnClass}`}
              onClick={toggleAccordion}
            >
              <div className="flex items-center justify-center">
                <span className="mr-4">{expanded ? 'Less' : 'More'}</span>
                {expanded ? (
                  <ArrowUpIcon size={25} />
                ) : (
                  <ArrowDownIcon size={25} />
                )}
              </div>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );

  const renderImage = (className: string, animationType: string) => (
    <div className="lg:!col-span-6">
      <div
        className={`${serviceImageClass} ${inView ? animationType : ''} ${className}`}
        ref={ref}
      >
        <Image
          src={imageSrc}
          alt="Service Image"
          quality={70}
          layout="fill"
          objectFit="cover"
          priority
          onError={handleImageError}
          className={imageClassName}
        />
      </div>
    </div>
  );

  return (
    <div
      key={pathName}
      className={`md:py-[150px] py-[60px] relative ${bgColor}`}
    >
      <div className="cta-container max-w-full lg:pl-[70px] lg:pr-0">
        <div className="lg:grid lg:!grid-cols-12 flex flex-col-reverse">
          {imagePosition === 'left' ? (
            <>
              {renderImage(leftSectionClassName, leftComponentAnimation)}
              {renderContent(rightSectionClassName, rightComponentAnimation)}
            </>
          ) : (
            <>
              {renderContent(leftSectionClassName, leftComponentAnimation)}
              {renderImage(rightSectionClassName, rightComponentAnimation)}
            </>
          )}
        </div>
      </div>
      {restServices?.length ? (
        <div
          id="accordion-collapse-body-1"
          className={`transition-[max-height] overflow-hidden duration-500 ease-in-out ${
            expanded ? 'max-h-[2400px] lg:max-h-[1200px]' : 'max-h-0'
          }`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <ExtendedServices
            services={restServices}
            serviceBoxClass={serviceBoxClass}
            serviceBoxInner={serviceBoxInner}
            serviceListContentTitleClass={serviceListContentTitleClass}
            serviceListContentDescClass={serviceListContentDescClass}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Services;
