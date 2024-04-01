'use client';

import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { ProductType } from '@src/types/modules';
import { useGetProduct } from '@queries/useProductQuery';
import { ProductForm } from '../../../../../components/product';
import { useToast } from '../../../../../context/ToastContext';

function EditProductPage() {
  const productForm = useForm<ProductType>({ mode: 'onChange' });

  const { reset } = productForm || {};
  const { showSuccessToast } = useToast();

  const { productId } = useParams() || {};

  const { data: products, refetch } = useGetProduct(productId as string);

  const onSuccessCallback = async () => {
    await refetch();
    showSuccessToast({ message: 'Changes have been saved!' });
  };

  const resetFormValues = useCallback(() => {
    const categoryIds = products?.categories?.map(
      (category) => category?.categoryId,
    );

    reset({
      ...products,
      title: products?.title,
      saleEndDate: products?.saleEndDate
        ? new Date(products?.saleEndDate)
        : undefined,
      saleStartDate: products?.saleStartDate
        ? new Date(products?.saleStartDate)
        : undefined,
      categoryIds,
    });
  }, [products, reset]);

  useEffect(() => {
    if (products?.productId) {
      resetFormValues();
    }
  }, [products?.productId, resetFormValues]);

  return (
    <ProductForm
      form={productForm}
      isEditing
      onSuccessCallback={onSuccessCallback}
      onDiscard={resetFormValues}
    />
  );
}

export default EditProductPage;
