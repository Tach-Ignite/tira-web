'use client';

import {
  useAddToFavoriteProduct,
  useRemoveFromFavoriteProduct,
} from '@queries';
import { useAuthenticatedNavigation } from '@hooks';
import { Button } from '@src/atoms';
import { HeartOutlinedIcon, HeartSolidIcon } from '@src/icons';
import { useCallback } from 'react';
import { ProductFavoriteProps } from './types';

function ProductFavorite({
  productId,
  isFavorite = false,
  page = 'product-list',
}: ProductFavoriteProps) {
  const authNavigationHandler = useAuthenticatedNavigation();

  const { mutateAsync: addToFavorite } = useAddToFavoriteProduct({
    successMessage: 'Added to Favorites!',
    failureMessage: 'Error adding to favorites. Please try again.',
  });

  const { mutateAsync: removeFromFavorite } = useRemoveFromFavoriteProduct({
    successMessage: 'Removed from Favorites!',
    failureMessage: 'Error removing from favorites. Please try again.',
  });

  const onClickAddFavorite = useCallback(
    (event: any) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      addToFavorite({ productId });
    },
    [addToFavorite, productId],
  );

  const onClickRemoveFavorite = useCallback(
    (event: any) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      removeFromFavorite({ productId });
    },
    [removeFromFavorite, productId],
  );

  const onSaveButtonClick = useCallback(() => {
    isFavorite
      ? removeFromFavorite({ productId })
      : addToFavorite({ productId });
  }, [isFavorite, removeFromFavorite, addToFavorite, productId]);

  const getFavoriteButton = useCallback(() => {
    const buttonText = isFavorite ? 'Saved' : 'Save';
    const renderFavoriteIcons = isFavorite ? (
      <HeartSolidIcon
        size={20}
        className={
          page === 'product-list'
            ? 'absolute top-3 right-3 text-red-600 cursor-pointer'
            : 'mr-3 text-red-600'
        }
        onClick={authNavigationHandler(onClickRemoveFavorite)}
      />
    ) : (
      <HeartOutlinedIcon
        size={20}
        className={
          page === 'product-list'
            ? 'absolute top-3 right-3 text-gray-600 cursor-pointer'
            : 'mr-3'
        }
        onClick={authNavigationHandler(onClickAddFavorite)}
      />
    );

    if (page === 'product-view') {
      return (
        <Button
          onClick={authNavigationHandler(onSaveButtonClick)}
          fullSized
          outline
          className="mb-14"
        >
          {renderFavoriteIcons}
          <div className="mt-0.5">{buttonText}</div>
        </Button>
      );
    }
    if (page === 'cart') {
      return (
        <Button
          onClick={authNavigationHandler(onSaveButtonClick)}
          color="indigo"
          size="sm"
          theme={{
            size: { sm: 'px-3 py-2 font-medium text-xs leading-[18px]' },
            color: {
              indigo:
                'border bg-inherit border-indigo-300 dark:border-yellow-400 dark:text-yellow-400 ',
            },
          }}
        >
          {renderFavoriteIcons}
          <div className="mt-0.5">{buttonText}</div>
        </Button>
      );
    }
    return renderFavoriteIcons;
  }, [
    authNavigationHandler,
    isFavorite,
    onClickAddFavorite,
    onClickRemoveFavorite,
    onSaveButtonClick,
    page,
  ]);

  return <>{getFavoriteButton()}</>;
}

export default ProductFavorite;
