'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { CohortPageProps } from './types';

function Cohort({ data, sectionProperties }: CohortPageProps) {
  const {
    links,
    buttonLink = '',
    buttonName,
    image,
    subTitle,
    title,
  } = data || {};

  const {
    serviceImageClass = 'service-image flex md:justify-center lg:justify-end w-full lg:h-full h-[100px] md:h-[679px] relative',
    servicesListClass = 'fixed-md:grid fixed-md:grid-cols-2 grid',
    sectionHeaderStyle = `text-[32px] leading-[32px] text-[#33edf5] uppercase`,
    programItemStyle = 'pl-8 mt-4',
    boxedBtnClass = 'relative inline-flex text-[#111] py-[15px] px-[40px] overflow-hidden rounded-none !bg-[#33edf5] uppercase z-[2] content-none before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:opacity-0 before:bg-[#121212] before:transition before:duration-[0.4s] before:scale-x-[0.2] before:scale-y-[1] hover:before:opacity-100 hover:before:scale-100 hover:text-white text-[18px] leading-[30px] focus:!bg-transparent text-[18px] leading-[30px] mt-12 ',
  } = sectionProperties || {};

  const { url: imageUrl, name: imageName } = image?.data?.attributes || {};

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

  return (
    <div className="service-area md:py-160 py-[60px] relative before:bg-pattern-1 before:absolute before:h-[336px] before:w-[336px] before:top-[300px] before:left-[-168px] text-white">
      <div className="max-w-full lg:!pl-[70px] lg:pr-0">
        <div className="lg:!grid lg:!grid-cols-12 flex flex-col-reverse">
          <div className="lg:col-span-6 xl:mr-[140px] lg:mr-[40px] max-md:pt-[50px]">
            <div className="service-content xl:!w-[490px] w-full ml-auto md:pt-32">
              <span className={sectionHeaderStyle}>
                {title} <br /> <br />
                {subTitle}
              </span>
              <div
                className={`${servicesListClass} md:pt-14 ${
                  inView ? 'animate-slide-in-left delay3' : ''
                }`}
                ref={ref}
              >
                {links?.map(({ name, id, path }) => (
                  <div key={id} className="my-2">
                    <Link
                      href={path}
                      className="text-[18px] leading-[30px] xl:ml-0 w-[275px] text-black dark:text-white hover:text-[#111] dark:hover:text-[#33edf5] hover:underline underline-offset-[10px]"
                    >
                      <div
                        className={`text-xl md:text-2xl ${programItemStyle}`}
                      >
                        <span className="!text-[#111] dark:!text-[#33edf5]">
                          /
                        </span>
                        &nbsp;&nbsp;
                        {name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <Link href={buttonLink} className={boxedBtnClass}>
                {buttonName}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div
              className={`${serviceImageClass} ${
                inView ? 'animate-slide-in-right' : ''
              }`}
              ref={ref}
            >
              <Image
                className="hidden md:block"
                src={imageSrc}
                alt={imageName || ''}
                quality={70}
                height={500}
                width={679}
                priority
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cohort;
