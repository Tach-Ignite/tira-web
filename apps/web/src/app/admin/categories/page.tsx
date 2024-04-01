'use client';

import { getCategoryColumns } from '@components/categories';
import {
  useDeleteCategory,
  useGetAllCategories,
} from '@queries/useCategoryQuery';
import { CategoryType } from '@services';
import { SearchInput } from '@src/atoms/Input';
import { Table } from '@src/atoms/Table';
import { addQueryParam } from '@src/lib/functions';
import { PaginationMetaType } from '@src/types/modules/pagination';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { PlusIcon } from '@src/icons';
import { Button } from '@src/atoms';

function AdminCategoryListPage() {
  const params = useSearchParams();
  const pageInQuery = params.get('page');
  const searchTermInQuery = params.get('search') || '';

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    pageInQuery ? Number(pageInQuery) - 1 : 0,
  );
  const [deletedCategory, setDeletedCategory] = useState<
    CategoryType | undefined
  >();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const {
    data: {
      data: {
        data: categories = [] as CategoryType[],
        meta = {} as PaginationMetaType,
      } = {},
    } = {},
  } = useGetAllCategories({
    page: currentPage,
    perPage: 10,
    searchTerm: searchTermInQuery,
  });

  const { total = 0 } = meta;

  const onEditCategory = useCallback(
    (categoryId: string) => {
      router.push(`/admin/categories/edit/${categoryId}`);
    },
    [router],
  );

  const onDeleteCategory = useCallback(
    (category: CategoryType) => {
      setShowDeleteModal(!showDeleteModal);
      setDeletedCategory(category);
    },
    [showDeleteModal],
  );

  const columns = useMemo(
    () =>
      getCategoryColumns({
        onEdit: onEditCategory,
        onDelete: onDeleteCategory,
      }),
    [onDeleteCategory, onEditCategory],
  );

  const { mutateAsync: deleteCategory } = useDeleteCategory({
    failureMessage: true,
    successMessage: 'Category has been deleted!',
  });

  const onCancelModel = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page - 1);
    addQueryParam('page', page.toString());
  };

  const onConfirmDeleteCategory = async () => {
    if (deletedCategory?.categoryId) {
      await deleteCategory({ categoryId: deletedCategory?.categoryId });
      setShowDeleteModal(false);
    }
  };

  function renderHeader() {
    return (
      <div className="flex w-full px-6 justify-between gap-2">
        <SearchInput placeHolder="Search For Category" />
        <Link href="/admin/categories/add">
          <Button gradientDuoTone="purpleToBlue">
            <PlusIcon size={20} className="mr-2" /> Add Category
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <Table
      columns={columns}
      data={categories}
      paginationClassName="border-t-4"
      currentPage={currentPage - 1}
      totalRows={total}
      withPageCount
      showDeleteModal={showDeleteModal}
      deletedName={deletedCategory?.name}
      currentPageDataLength={categories?.length}
      onPageChange={onPageChange}
      renderHeader={renderHeader()}
      onCancelModel={onCancelModel}
      onConfirmDeleteRow={onConfirmDeleteCategory}
    />
  );
}

export default AdminCategoryListPage;
