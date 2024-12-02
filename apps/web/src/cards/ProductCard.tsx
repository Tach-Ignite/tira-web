'use client';

import { useAddToCart } from '@queries';
import { getImageUrl } from '@src/app/common/util/common';
import { useCallback, useMemo } from 'react';
import { Category, ItemsCardProps, ProductCardProps } from './types';
import ItemsCard from './ItemsCard';

function ProductCard(props: ProductCardProps) {
  const {
    productImageUrl,
    brand,
    title,
    description = '',
    salePrice = 0,
    productId,
    isFavorite,
    quantity = 0,
    withFavoriteIcon = true,
    categories = [],
    isAuthenticated = false,
  } = props || {};

  const firstImageUrl = getImageUrl(productImageUrl?.[0]);

  const { mutateAsync: handleAddToCart } = useAddToCart({
    successMessage: 'Product has been added.',
    failureMessage: true,
  });

  const onAddToCart = useCallback(async () => {
    await handleAddToCart({ productId, quantity: 1 });
  }, [handleAddToCart, productId]);

  const cardProps = useMemo<ItemsCardProps>(
    () => ({
      id: productId,
      title,
      description,
      imageUrl: firstImageUrl,
      label: brand,
      price: salePrice,
      isFavorite,
      showButton: quantity > 0,
      onButtonClick: onAddToCart,
      withFavoriteIcon,
      categories: categories as Category[],
      isAuthenticated,
    }),
    [
      isAuthenticated,
      brand,
      description,
      firstImageUrl,
      isFavorite,
      onAddToCart,
      productId,
      quantity,
      salePrice,
      title,
      withFavoriteIcon,
      categories,
    ],
  );

  return <ItemsCard {...cardProps} />;
}

export default ProductCard;
