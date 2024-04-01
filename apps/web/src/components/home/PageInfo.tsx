'use client';

import React from 'react';
import { Button } from '@src/atoms';
import { ArrowRightIcon } from '@src/icons';
import Link from 'next/link';
import { PageInfoProps } from './types';

function PageInfo(props: PageInfoProps) {
  const {
    title,
    description,
    buttonName = 'Enter',
    titleClassName,
    navigateUrl,
    navigateTarget = '_self',
  } = props || {};

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={`text-gray-900 text-center dark:text-white font-extrabold ${titleClassName}`}
      >
        {title}
      </div>
      <div>{description}</div>
      <Link href={`/${navigateUrl}`} target={navigateTarget} rel="noreferrer">
        <Button gradientDuoTone="purpleToBlue" className="flex items-center">
          {buttonName} <ArrowRightIcon size={20} className="ml-2" />
        </Button>
      </Link>
    </div>
  );
}

export default PageInfo;
