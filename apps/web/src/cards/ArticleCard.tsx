'use client';

import StrapiRichContent from '@components/strapi-richtext/StrapiRichTextContent';
import { AnnouncementArticleAttributeType } from '@services';
import Link from 'next/link';

function ArticleCard(props: AnnouncementArticleAttributeType) {
  const { Subtitle, Title, TopContentText, Slug } = props;

  return (
    <div className="border border-black dark:bg-black border-opacity-70 shadow-l pt-[57px] px-[30px] pb-[9px]">
      <p className="font-medium text-[24px] mb-3 leading-[36px] text-black dark:text-white">
        | {Subtitle}
      </p>
      <p className="font-semibold text-[36px] leading-[54px] text-black dark:text-white">
        {Title}
      </p>
      <p className="font-normal text-[24px] mb-8 leading-[36px] text-black dark:text-white">
        {TopContentText ? <StrapiRichContent content={TopContentText} /> : null}
      </p>
      <Link
        className="font-light text-[24px] underline leading-[36px] text-black dark:text-[#D9D9D9]"
        href={`article/${Slug}`}
      >{`More >`}</Link>
    </div>
  );
}

export default ArticleCard;
