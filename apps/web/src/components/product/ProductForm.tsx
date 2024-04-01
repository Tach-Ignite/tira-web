'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateProduct, useUpdateProduct } from '@queries/useProductQuery';
import { ImageUpload } from '@src/atoms';
import { AddDescriptionGrid } from '@src/app/common/components';
import { ProductType } from '../../types/modules';
import { ProductPageProps } from './types';
import { CategoryGrid, ProductFieldsGrid } from './create';
import { BreadcrumbWithActions } from '../breadcrumbWithActions';

function ProductForm(props: ProductPageProps) {
  const { form, isEditing = false, onDiscard } = props || {};
  const [showDescriptionField, setShowDescriptionField] = useState(false);
  const [showShippingDetailsField, setShowShippingDetailsField] =
    useState(false);

  const router = useRouter();

  const { mutateAsync: updateProductAsync } = useUpdateProduct({
    successMessage: 'Product has been updated.',
    failureMessage: 'Failed to update product.',
  });

  const { mutateAsync: addProductAsync } = useCreateProduct({
    successMessage: 'Product has been created.',
    failureMessage: 'Failed to create product.',
  });

  const {
    handleSubmit,
    watch,
    formState: { isDirty },
  } = form || {};

  const { description, shippingDetails } = watch();

  const onAddDescriptionCard = () => {
    setShowDescriptionField(true);
  };

  const onAddShippingDetailsCard = () => {
    setShowShippingDetailsField(true);
  };

  useEffect(() => {
    description ? onAddDescriptionCard() : () => setShowDescriptionField(false);
    shippingDetails
      ? onAddShippingDetailsCard()
      : () => setShowShippingDetailsField(false);
  }, [description, shippingDetails]);

  const disabledSaveButton = isEditing ? !isDirty : isEditing;

  const onSaveChanges = useCallback(
    async (data: ProductType) => {
      const {
        msrpPrice,
        salePrice,
        quantity,
        saleEndDate,
        saleStartDate,
        ...rest
      } = data || {};

      try {
        if (isEditing) {
          await updateProductAsync({
            ...rest,
            saleEndDate: saleEndDate ? new Date(saleEndDate) : undefined,
            saleStartDate: saleStartDate ? new Date(saleStartDate) : undefined,
            msrpPrice: Number(msrpPrice),
            salePrice: Number(salePrice),
            quantity: Number(quantity),
          });
        } else {
          const res =
            (await addProductAsync({
              ...rest,
              saleEndDate: saleEndDate ? new Date(saleEndDate) : undefined,
              saleStartDate: saleStartDate
                ? new Date(saleStartDate)
                : undefined,
              msrpPrice: Number(msrpPrice),
              salePrice: Number(salePrice),
              quantity: Number(quantity),
            })) || {};

          router.push(`/admin/products/edit/${res?.productId}`);
        }
      } catch (e) {
        return e;
      }
      return '';
    },
    [router, isEditing, addProductAsync, updateProductAsync],
  );

  return (
    <div className="w-[100%]">
      <BreadcrumbWithActions
        isEditing={isEditing}
        pageName="Product"
        shouldDisabledSaveButton={disabledSaveButton}
        onDiscard={onDiscard}
        onSaveChange={handleSubmit(onSaveChanges)}
      />
      <div className="flex mt-5 gap-14 max-[1100px]:flex-col">
        <div className="w-[40%] flex flex-col gap-5 max-[1100px]:w-[100%]">
          <ImageUpload
            form={form}
            onUpdateImage={onSaveChanges}
            imageField="productImageUrl"
          />
          <CategoryGrid productForm={form} isEditing={isEditing} />
        </div>
        <div className="w-[60%] flex flex-col gap-5 max-[1100px]:w-[100%]">
          <ProductFieldsGrid productForm={form} isEditing={isEditing} />
          <AddDescriptionGrid
            form={form}
            addSectionName="New Product Description"
            label="Product Description"
            name="description"
            showField={showDescriptionField}
            setShowField={setShowDescriptionField}
          />
          <AddDescriptionGrid
            form={form}
            addSectionName="Shipping Details"
            label="Shipping Details Description"
            name="shippingDetails"
            showField={showShippingDetailsField}
            setShowField={setShowShippingDetailsField}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
