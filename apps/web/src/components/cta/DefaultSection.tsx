/* eslint-disable react/no-danger */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OutlinedCircleCheckIcon, CrossCircleIcon } from '@src/icons';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Button } from '@src/atoms';
import { DefaultSectionProps } from './types';

interface ListItemType {
  checked?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

const _patternClass =
  'sm:before:bg-pattern-1 sm:before:absolute sm:before:h-[336px] sm:before:w-[336px] sm:before:top-[75px] sm:before:left-[85px]';

function DefaultSection({
  id,
  data,
  sectionProperties,
  className = '',
}: DefaultSectionProps) {
  const {
    title = '',
    subTitle = '',
    description1 = '',
    description2 = '',
    image,
    icon,
    listItems = [],
  } = data || {};

  const {
    rightSectionClassName = 'grid grid-col-1 items-center md:justify-center justify-start w-full',
    leftSectionClassName = 'grid grid-col-1 items-center md:justify-center justify-start w-full',
    leftComponentAnimation = '',
    rightComponentAnimation = '',
    imageClassName = '!w-full !h-full max-h-[300px] sm:max-h-[400px] aspect-[1.4] rounded-lg',
    imagePosition = 'right',
    linkType = '',
    isOpenInNewTab = false,
    titleClassName = 'lm:text-[42px] lm:leading-[50px] dark:text-[#CCC] text-[32px] mb-[16px] flex justify-start w-full text-black dark:text-white bg-clip-text to-primary from-primary2 bg-gradient-to-r',
    subTitleClassName = 'text-[18px] leading-[32px] text-[#333] dark:text-[#CCC] uppercase mb-4',
    descriptionClassName = 'w-full grid grid-col-1 items-center justify-center text-[#333] dark:text-[#CCC] text-[16px] !leading-[24px] mb-4 mt-2',
    checkListClassName = 'text-black dark:text-white text-[16px] leading-[24px]',
    linkClassName = `w-max grid grid-col-1 items-center justify-start text-[18px] leading-[30px] text-primary my-[16px]`,
    btnClassName = 'w-[160px] flex items-center focus:!ring-0 hover:opacity-80',
    btnGradient = 'purpleToBlue',
    showPattern = false,
    buttonLink = '',
    buttonText = '',
    buttonIcon = null,
    showDivider = true,
    ctaContainerClassName = '',
  } = sectionProperties || {};

  // console.log('sectionProperties ::', sectionProperties);

  const imageUrl = image?.data?.attributes?.url;
  const [imageSrc, setImageSrc] = useState(
    imageUrl || '/assets/placeholder-cta-sections.png',
  );

  const handleImageError = () => {
    setImageSrc('/assets/placeholder-cta-sections.png');
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const renderContent = (className: string, animationType: string) => (
    <div className={`${className} ${animationType}`}>
      <div className={subTitleClassName}>{subTitle}</div>
      <h2 className={titleClassName}>{title}</h2>
      <h3
        className={`${descriptionClassName}`}
        dangerouslySetInnerHTML={{ __html: description1 || '' }}
      />
      {showDivider ? (
        <div className="w-full h-[1.5px] bg-neutral-light opacity-5 mt-[10px] mb-[20px]" />
      ) : null}
      {listItems?.length ? (
        <ul className="space-y-2">
          {listItems?.map(
            ({ checked, description, icon: Icon }: ListItemType) => {
              const renderIcon = () =>
                checked ? (
                  <OutlinedCircleCheckIcon className="w-[24px] h-[24px] text-neutral-800 dark:text-white" />
                ) : (
                  <CrossCircleIcon className="w-[24px] h-[24px] text-neutral dark:text-neutral-light" />
                );
              return (
                <li className="flex items-center space-x-3" key={description}>
                  {Icon || renderIcon()}
                  <span className={checkListClassName}>{description}</span>
                </li>
              );
            },
          )}
        </ul>
      ) : null}
      <h3
        className={`${descriptionClassName} mt-4`}
        dangerouslySetInnerHTML={{ __html: description2 || '' }}
      />
      {buttonText ? (
        <Link
          target={isOpenInNewTab ? '_blank' : '_self'}
          href={buttonLink || '/'}
          className={`${linkClassName} ${linkType === 'button' ? '' : 'hover:underline'}`}
        >
          {linkType === 'button' ? (
            <Button gradientDuoTone={btnGradient} className={btnClassName}>
              {buttonText} {buttonIcon ? buttonIcon() : null}
            </Button>
          ) : (
            `${buttonText} >`
          )}
        </Link>
      ) : null}
    </div>
  );
  const renderImage = (className: string, animationType: string) => (
    <div
      className={`${className} ${showPattern ? _patternClass : ''} ${inView ? animationType : ''} ${imagePosition === 'left' ? 'justify-start' : 'justify-center'} hidden sm:grid ${icon && !image ? '!justify-center' : ''}`}
      ref={ref}
    >
      {icon && icon}
      {imageSrc && !icon && (
        <Image
          src={imageSrc}
          alt="About Image"
          width={500}
          height={300}
          quality={70}
          priority
          className={imageClassName}
          onError={handleImageError}
        />
      )}
    </div>
  );

  return (
    <div id={id || '#'} className={`${className}`}>
      <div className={`cta-container ${ctaContainerClassName}`}>
        <div className=" flex flex-col-reverse sm:grid sm:grid-cols-2 items-center justify-center gap-4">
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
    </div>
  );
}

export default DefaultSection;
