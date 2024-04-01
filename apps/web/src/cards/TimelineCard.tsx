'use client';

import { AnnouncementTimelineAttributeType } from '@services';
import NextImage from 'next/image';
import TachLogo from '../../public/assets/tach-logo.png';

const cmsUrl = process.env.CMS_URL;

const cmsDomain = cmsUrl?.split('/api')[0];

function TimelineCard(props: AnnouncementTimelineAttributeType) {
  const { Content, Image, Title } = props;

  const { url } = Image?.data?.attributes || {};

  const src = `${cmsDomain}${url}`;

  return (
    <div className="border border-black dark:bg-black border-opacity-70 shadow-l pt-[57px] px-[30px] pb-[15px]">
      <p className="font-semibold text-[36px] mb-8 leading-[54px] text-black dark:text-white">
        {Title}
      </p>
      <div className="flex gap-10 items-center mb-8">
        {url ? (
          <NextImage src={src} width={250} height={250} alt="Timeline-Img" />
        ) : (
          <NextImage
            className="m-auto dark:border dark:border-white"
            width={228}
            height={228}
            src={TachLogo}
            alt="Timeline-Img"
          />
        )}
        <p className="font-normal text-[24px] leading-[36px] text-black dark:text-white">
          {Content}
        </p>
      </div>
    </div>
  );
}

export default TimelineCard;
