/* eslint-disable react/no-danger */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Button } from '@src/atoms';
import { AboutProps } from './types';

const _patternClass =
  'sm:before:bg-pattern-1 sm:before:absolute sm:before:h-[336px] sm:before:w-[336px] sm:before:top-[75px] sm:before:left-[85px]';

function About({ data, sectionProperties = {}, className = '' }: AboutProps) {
  const { title = '', subTitle = '', description = '', image } = data || {};

  const {
    rightSectionClassName = 'grid grid-col-1 items-center justify-center py-2',
    leftSectionClassName = 'grid grid-col-1 items-center justify-center py-2',
    rightComponentAnimation = '',
    leftComponentAnimation = '',
    imageClassName = '!w-full !h-full max-h-[300px] sm:max-h-[400px] aspect-[1.4] rounded-lg',
    imagePosition = 'right',
    titleClassName = 'lm:text-[42px] lm:leading-[50px] dark:text-[#CCC] text-[32px] mb-[16px] flex justify-center w-full text-black dark:text-white bg-clip-text to-primary from-primary2 bg-gradient-to-r',
    subTitleClassName = 'text-[18px] leading-[32px] text-[#333] dark:text-[#CCC] uppercase mb-4',
    descriptionClassName = 'w-full grid grid-col-1 items-center justify-center text-[#333] dark:text-[#CCC] text-2xl mb-4',
    linkClassName = 'w-full grid grid-col-1 items-center justify-center text-[18px] leading-[30px]',
    btnClassName = 'w-[100px] flex items-center',
    btnGradient = '',
    showPattern = false,
    linkType = '',
    buttonLink = '',
    buttonText = '',
    buttonIcon = null,
  } = sectionProperties || {};

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
        dangerouslySetInnerHTML={{ __html: description || '' }}
      />
      <Link href={buttonLink || '/'} className={linkClassName}>
        {linkType === 'button' ? (
          <Button gradientDuoTone={btnGradient} className={btnClassName}>
            {buttonText} {buttonIcon ? buttonIcon() : null}
          </Button>
        ) : (
          buttonText
        )}
      </Link>
    </div>
  );
  const renderImage = (className: string, animationType: string) => (
    <div
      className={`${className} ${showPattern ? _patternClass : ''} ${inView ? animationType : ''} ${imagePosition === 'left' ? 'justify-flex-start' : 'justify-flex-end'}`}
      ref={ref}
    >
      {imageSrc && (
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
    <div className={`${className}`}>
      <div className="cta-container">
        <div className=" flex flex-col-reverse sm:grid sm:grid-cols-2 items-center justify-center gap-2">
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

export default About;
