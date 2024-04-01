'use client';

import {
  useGetAnnouncement,
  useGetAnnouncementArticles,
  useGetAnnouncementTimeline,
} from '@queries/useAnnouncementQuery';
import { CustomerRoutes } from '@src/routes';
import LayoutSpinner from '@components/appSpinner/LayoutSpinner';
import { Button } from '@src/atoms';
import { ArticleCard, ProductCard, TimelineCard } from '@src/cards';
import { useGetFilteredFriendlyIdProducts } from '@queries';
import Link from 'next/link';

function AnnouncementPage() {
  const { data: announcement, isLoading } = useGetAnnouncement();

  const { data: announcementTemplate } = useGetAnnouncementTimeline();

  const { data: announcementArticles } = useGetAnnouncementArticles();

  const { Announcement } = announcement?.data?.attributes || {};
  const { data: articles } = announcementArticles || {};

  const { Timeline } = announcementTemplate?.data?.attributes || {};

  const { ProductFriendlyIds, Title, Subtitle } = Announcement || {};

  const productFriendlyIds = ProductFriendlyIds?.map(
    (id) => id?.ProductFriendlyId,
  );
  const friendlyIds = productFriendlyIds?.join(',') || '';

  const { data: products } = useGetFilteredFriendlyIdProducts(friendlyIds);

  const { data: productsList } = products || {};

  const renderAnnouncement = () =>
    Title ? (
      <>
        <div className="text-black dark:text-white font-semibold text-4xl	!leading-[54px]">
          {Title}
        </div>
        <div className="text-black dark:text-white font-normal mb-4 text-2xl !leading-[36px]">
          {Subtitle}
        </div>
        {productsList?.length ? (
          <div className="flex flex-wrap gap-8">
            {productsList?.map((productDetails) => (
              <Link
                key={productDetails?.productId}
                href={`/products/${productDetails.productId}`}
              >
                <ProductCard {...productDetails} withFavoriteIcon={false} />
              </Link>
            ))}
          </div>
        ) : null}
        <div className="flex justify-end mt-4">
          <Button href={CustomerRoutes.MarketPlace} className="mb-2 w-max">
            Shop For Products
          </Button>
        </div>
      </>
    ) : (
      <div className="text-center text-black dark:text-white font-semibold text-2xl !leading-[36px]">
        No Announcement Found!
      </div>
    );

  return (
    <div>
      <div className="shadow-l tab:!m-auto tab:w-[75%] w-[100%] bg-white dark:bg-black py-8 px-3">
        {isLoading ? <LayoutSpinner /> : renderAnnouncement()}
      </div>
      <div className="mt-10 flex flex-col gap-10">
        {articles?.map(({ attributes, id }) => (
          <ArticleCard key={id} {...attributes} />
        ))}
      </div>
      <div className="my-10 flex flex-col gap-10">
        {Timeline?.map((timeline) => (
          <TimelineCard key={timeline?.id} {...timeline} />
        ))}
      </div>
    </div>
  );
}

export default AnnouncementPage;
