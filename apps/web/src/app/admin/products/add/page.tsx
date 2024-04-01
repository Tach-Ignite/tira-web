'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ProductForm } from '../../../../components/product';
import { ProductType } from '../../../../types/modules';
import { useToast } from '../../../../context/ToastContext';

const formDefaultValues = {
  title: '',
  msrpPrice: '',
  description: '',
  categoryIds: [],
  productImageUrl: [],
  salePrice: '',
  quantity: '',
  brand: '',
  friendlyId: '',
  saleStartDate: '',
  saleEndDate: '',
  shippingDetails: '',
};

function CreateProductPage() {
  const productForm = useForm<ProductType>({
    mode: 'onChange',
    defaultValues: formDefaultValues,
  });

  const router = useRouter();
  const { showSuccessToast } = useToast();

  const { reset } = productForm;

  const onSuccessCreateProduct = (res: ProductType) => {
    reset({});
    showSuccessToast({ message: 'Product Has Been Created!' });
    router.push(`/admin/products/edit/${res?.productId}`);
  };
  const onDiscard = () => {
    reset(formDefaultValues);
  };

  return (
    <ProductForm
      form={productForm}
      onSuccessCallback={onSuccessCreateProduct}
      onDiscard={onDiscard}
    />
  );
}

export default CreateProductPage;
