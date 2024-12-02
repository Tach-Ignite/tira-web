'use client';

import Link from 'next/link';
import { Button } from '@src/atoms';
import { FormLinksProps } from './types';

function FormLinks({
  data,
  className = 'bg-[#0a0a1e] text-white',
  withExtraSpace = false,
  sectionProperties,
}: FormLinksProps) {
  const { links, primaryTitle, secondaryTitle } = data || {};
  const { btnGradient = '', boxedBtnClass = 'text-[18px] leading-[30px]' } =
    sectionProperties || {};

  return (
    <div
      id="links"
      className={`text-center leading-[1.4] text-[18px]  py-[75px] md:py-[150px] px-4 ${className}`}
    >
      <div className="mt-[30px]">
        {primaryTitle}
        {secondaryTitle ? (
          <>
            <br />
            {withExtraSpace ? <br /> : null}
            {secondaryTitle}
          </>
        ) : null}
      </div>
      <div>
        {links?.map(({ id, name, path }) => (
          <Link key={id} href={path}>
            <Button
              type="button"
              gradientDuoTone={btnGradient}
              className={`relative inline-flex py-[15px] px-[40px] overflow-hidden rounded-none !bg-transparent uppercase z-[2] content-none before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-[-1] before:opacity-0 before:bg-gray-500 before:transition before:duration-[0.4s] before:scale-x-[0.2] before:scale-y-[1] hover:before:opacity-100 hover:before:scale-100 hover:text-white focus:!bg-transparent m-[30px] text-[#111] ${boxedBtnClass}`}
            >
              {name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FormLinks;
