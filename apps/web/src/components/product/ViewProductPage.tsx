'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppSpinner from '@components/appSpinner/AppSpinner';
import { useAddToCart } from '@queries';
import { useGetProduct } from '@queries/useProductQuery';
import { useAuthenticatedNavigation } from '@hooks';
import DetailedImageView from '@components/common/DetailedImageView';
import ItemDetails from '@components/common/ItemDetails/ItemDetails';
import QuantityButton from '@components/cart/QuantityButton';
import { Button } from '@src/atoms';
import { CartPlusIcon, PencilLight } from '@src/icons';
import { PageView, ViewProductProps } from './types';
import ProductFavorite from './ProductFavorite';

interface Category {
  categoryId: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

function ViewProductPage(props: ViewProductProps) {
  const { pageView = PageView.Customer } = props;
  const router = useRouter();
  const [cartQuantity, setCartQuantity] = useState(1);

  const authNavigationHandler = useAuthenticatedNavigation();

  const { productId } = useParams() || {};

  const { data: product, isLoading } = useGetProduct(productId as string);

  const {
    productImageUrl,
    title,
    salePrice = 0,
    quantity,
    description,
    brand,
    shippingDetails,
    isFavorite,
    categories,
  } = product || {};

  const { mutateAsync: handleAddToCart } = useAddToCart({
    successMessage: 'Product has been added.',
    failureMessage: true,
  });

  const onEditProduct = () => {
    router.push(`/admin/products/edit/${productId}`);
  };

  const onAddToCart = async () => {
    await handleAddToCart({
      productId: productId as string,
      quantity: cartQuantity,
    });
  };

  const handleAddQuantity = () => {
    setCartQuantity(cartQuantity + 1);
  };

  const handleRemoveQuantity = () => {
    setCartQuantity(cartQuantity > 1 ? cartQuantity - 1 : 1);
  };

  const isCustomerView = pageView === PageView.Customer;

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="relative">
          <AppSpinner show />
        </div>
      ) : null}
      {product ? (
        <div className="flex gap-32 w-full max-[1000px]:flex-col max-w-[1300px] self-center">
          <DetailedImageView imageUrls={productImageUrl || []} />
          <ItemDetails
            description={description || ''}
            details={shippingDetails || ''}
            detailsTitle="Shipping Details"
            label={brand || ''}
            price={salePrice || 0}
            title={title || ''}
            categories={categories as Category[]}
          >
            {isCustomerView ? (
              <div className="mt-10 mb-4">
                <QuantityButton
                  addClick={handleAddQuantity}
                  removeClick={handleRemoveQuantity}
                  quantity={cartQuantity}
                />
              </div>
            ) : (
              <div className="mt-10 mb-4 border border-indigo-300 px-4 py-3 dark:border-gray-600 bg-white text-center dark:bg-gray-700 text-gray-900 dark:text-gray-400 rounded-lg w-[20%]">
                {quantity}
              </div>
            )}
            {isCustomerView ? (
              <>
                <Button
                  onClick={authNavigationHandler(onAddToCart)}
                  fullSized
                  className="mb-2"
                >
                  <CartPlusIcon size={20} className="mr-3" />
                  <div className="mt-0.5">Add to cart</div>
                </Button>
                <ProductFavorite
                  productId={productId as string}
                  isFavorite={isFavorite}
                  page="product-view"
                />
              </>
            ) : (
              <Button fullSized className="mb-14" onClick={onEditProduct}>
                <PencilLight size={20} className="mr-3" />
                Edit Product
              </Button>
            )}
          </ItemDetails>
        </div>
      ) : null}
    </div>
  );
}

export default ViewProductPage;
