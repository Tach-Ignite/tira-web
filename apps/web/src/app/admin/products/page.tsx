'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '@src/atoms';
import { PlusIcon } from '@src/icons';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDeleteProduct, useGetAllProducts } from '@queries/useProductQuery';
import dynamic from 'next/dynamic';
import { ProductType } from '../../../types/modules';
import { addQueryParam } from '../../../lib/functions';
import { getProductColumns } from '../../../components/product/create/getProductColumns';

const SearchInput = dynamic(() => import('@src/atoms/Input/SearchInput'), {
  ssr: false,
});

const Table = dynamic(() => import('@src/atoms/Table/Table'), {
  ssr: false,
});

function ProductLandingPage() {
  const params = useSearchParams();
  const pageInQuery = params.get('page');
  const searchTermInQuery = params.get('search') || '';
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletedProduct, setDeletedProduct] = useState<
    ProductType | undefined
  >();

  const [currentPage, setCurrentPage] = useState(
    pageInQuery ? Number(pageInQuery) - 1 : 0,
  );
  const router = useRouter();

  const { title: deletedProductName, productId: deletedProductId = '' } =
    deletedProduct || {};

  const { data: products } = useGetAllProducts({
    page: currentPage + 1,
    perPage: 10,
    searchTerm: searchTermInQuery,
  });

  const { mutateAsync: deleteProduct } = useDeleteProduct({
    failureMessage: 'Failed to delete product.',
    successMessage: 'Product has been deleted.',
  });

  const { data, meta } = products || {};
  const { total = 0 } = meta || {};

  const handleDeleteProduct = useCallback(
    (productDetails: ProductType) => {
      setShowDeleteModal(!showDeleteModal);
      setDeletedProduct(productDetails);
    },
    [showDeleteModal],
  );

  const onEditButton = useCallback(
    (productId: string) => {
      router.push(`/admin/products/edit/${productId}`);
    },
    [router],
  );

  const onViewButton = useCallback(
    (productId: string) => {
      router.push(`/admin/products/view/${productId}`);
    },
    [router],
  );

  const columns = useMemo(
    () =>
      getProductColumns({
        onDeleteButton: handleDeleteProduct,
        onEditButton,
        onViewButton,
      }),
    [handleDeleteProduct, onEditButton, onViewButton],
  );

  const onCancelModel = () => {
    setShowDeleteModal(!showDeleteModal);
    setDeletedProduct(undefined);
  };

  const onConfirmDeleteProduct = async () => {
    await deleteProduct(deletedProductId);
    setShowDeleteModal(false);
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page - 1);
    addQueryParam('page', page.toString());
  };

  function renderHeader() {
    return (
      <div className="flex w-full px-6 max-[1100px]:flex-col max-[1100px]:gap-2">
        <div className="flex w-full gap-3 text-gray-700 dark:text-gray-200 items-center">
          <div className="font-medium text-xl">Products</div>
          {data?.length ? (
            <div className="text-xs mt-1">
              {data?.length || 0} of {total || 0} Products Shown
            </div>
          ) : null}
        </div>
        <div className="flex gap-4 max-[840px]:gap-2 max-[840px]:flex-col">
          <div className="min-w-max">
            <SearchInput searchValue={searchTermInQuery} />
          </div>
          <div className="min-w-max">
            <Link href="/admin/products/add">
              <Button gradientDuoTone="purpleToBlue">
                <PlusIcon size={20} className="mr-2" /> Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      data={data}
      paginationClassName="border-t-4"
      currentPage={currentPage}
      totalRows={total}
      withPageCount
      showDeleteModal={showDeleteModal}
      deletedName={deletedProductName}
      currentPageDataLength={data?.length}
      onPageChange={onPageChange}
      renderHeader={renderHeader()}
      onCancelModel={onCancelModel}
      modalDescription="Are you sure you want to cancel the product"
      onConfirmDeleteRow={onConfirmDeleteProduct}
      modalButtonNames={['Delete Product', 'Discard Change']}
    />
  );
}

export default ProductLandingPage;
