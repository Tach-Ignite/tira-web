/* eslint-disable react/require-default-props */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TachIgniteLogo from '../../../../public/assets/tach-ignite-logo.svg';

function TachLogo({
  className = 'contents',
  isNotAuthenticated = false,
  showLogoName = true,
}: {
  className?: string;
  isNotAuthenticated?: boolean;
  showLogoName?: boolean;
}) {
  return (
    <Link href="/" className={`${className}`}>
      <Image alt="Tach-Ignite-Logo" width="0" height="0" src={TachIgniteLogo} />
      {showLogoName ? (
        <span
          className={`font-semibold text-2xl leading-9 ml-2 dark:text-white ${isNotAuthenticated ? 'max-[760px]:hidden max-[655px]:block max-[350px]:hidden' : 'max-[800px]:hidden'}`}
        >
          TIRA
        </span>
      ) : null}
    </Link>
  );
}

export default TachLogo;
