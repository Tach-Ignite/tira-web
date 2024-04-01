'use client';

import { useGetAnnouncementSingleArticle } from '@queries/useAnnouncementQuery';
import { useParams } from 'next/navigation';
import NextImage from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon } from '@src/icons';
import LayoutSpinner from '@components/appSpinner/LayoutSpinner';
import StrapiRichContent from '@components/strapi-richtext/StrapiRichTextContent';
import TachLogo from '../../../../public/assets/tach-logo.png';

const cmsUrl = process.env.CMS_URL;

const cmsDomain = cmsUrl?.split('/api')[0];

function SingleArticlePage() {
  const { articleSlug } = useParams() || {};

  const { data: announcementArticles, isLoading } =
    useGetAnnouncementSingleArticle(articleSlug as string);

  const { data: articles } = announcementArticles || {};

  const { BottomContentText, Image, Subtitle, Title, TopContentText } =
    articles?.[0]?.attributes || {};

  const { url } = Image?.data?.attributes || {};

  const src = `${cmsDomain}${url}`;

  return isLoading ? (
    <LayoutSpinner />
  ) : (
    <div>
      <Link href="/announcement">
        <ArrowLeftIcon className="text-black border p-[10px] mb-8 border-black dark:border-white w-[50px] h-[50px] shadow-l dark:text-white" />
      </Link>
      {Subtitle ? (
        <p className="font-medium text-[24px] mb-3 leading-[36px] text-black dark:text-white">
          | {Subtitle}
        </p>
      ) : null}
      <p className="font-semibold text-[36px] mb-10 leading-[54px] text-black dark:text-white">
        {Title}
      </p>
      <p className="font-normal text-[24px] mb-10 leading-[36px] text-black dark:text-white">
        {TopContentText ? <StrapiRichContent content={TopContentText} /> : null}
      </p>
      {url ? (
        <NextImage src={src} width={1250} height={550} alt="Timeline-Img" />
      ) : (
        <NextImage
          className="m-auto dark:border dark:border-white"
          width={300}
          height={300}
          src={TachLogo}
          alt="Timeline-Img"
        />
      )}
      <p
        className={`font-normal text-[24px] my-10 leading-[36px] text-black dark:text-white ${!url && 'pt-10'}`}
      >
        {BottomContentText ? (
          <StrapiRichContent content={BottomContentText} />
        ) : null}
      </p>
    </div>
  );
}

export default SingleArticlePage;
