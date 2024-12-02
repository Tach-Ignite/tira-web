/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */

'use client';

import { ExtendedServiceProps } from '../types';

function ExtendedServices({
  services,
  serviceBoxClass,
  serviceBoxInner,
  serviceListContentTitleClass,
  serviceListContentDescClass,
}: ExtendedServiceProps) {
  return (
    <div className="cta-container max-lg:!max-w-full fixed-lg:!pr-0 pt-[30px] px-0 lg:!pl-8">
      <div className="flex flex-wrap justify-between">
        {services.map(({ description, id, title }) => (
          <div
            key={id}
            className="basis-full lg:!basis-1/2 lg:!h-[300px] py-3 px-4 lg:!pt-0 lg:!pl-0 lg:!pr-8 lg:!pb-8"
          >
            <div className={`${serviceBoxClass} h-full border border-[#888]`}>
              <div
                className={`${serviceBoxInner} h-full bg-white dark:bg-[#111]`}
              >
                <h3 className={serviceListContentTitleClass}>{title}</h3>
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
        ))}
      </div>
    </div>
  );
}

export default ExtendedServices;
