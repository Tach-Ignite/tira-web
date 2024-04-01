'use client';

import { getImageUrl } from '@src/app/common/util/common';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ItemsCard from './ItemsCard';
import { Category, ItemsCardProps, ServicesCardPrpos } from './types';

function ServicesCard(props: ServicesCardPrpos) {
  const {
    serviceId = '',
    imageUrls,
    price,
    serviceName,
    description,
    companyName,
    categories,
    duration,
  } = props?.data || {};

  const firstImageUrl = getImageUrl(imageUrls?.[0]);

  const router = useRouter();

  const cardProps = useMemo<ItemsCardProps>(
    () => ({
      id: serviceId,
      title: serviceName,
      description,
      imageUrl: firstImageUrl,
      label: companyName,
      price,
      showButton: true,
      categories: categories as Category[],
      buttonText: 'Book Now',
      duration: duration as number,
      onButtonClick: () => {
        router.push(`/services/booknow/${serviceId}`);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [companyName, description, firstImageUrl, price, serviceId, serviceName],
  );

  return <ItemsCard {...cardProps} />;
}

export default ServicesCard;
