'use client';

import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import {
  useCreateCategory,
  useDeleteCategory,
  useGetAllCategories,
  useUpdateCategory,
} from '@queries/useCategoryQuery';
import { CategoryResponseType, CategoryType } from '@services';
import { LabelInput } from '@src/atoms/Input';
import { useForm } from 'react-hook-form';
import { Button, Select } from '@src/atoms';
import { Label, Card } from '@src/flowbite';
import { TrashIcon } from '@src/icons';
import { useEffect, useState } from 'react';
import { DeleteModal } from '@src/modals';
import { useRouter } from 'next/navigation';
import { CategoryFormProps } from './type';

function CategoryForm({ isEditing, category }: CategoryFormProps) {
  const {
    handleSubmit,
    control,

    getValues,
    reset,
    formState: { isDirty },
  } = useForm<CategoryType>();

  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: { data: { data: categories = [] as CategoryType[] } = {} } = {},
  } = useGetAllCategories({
    parentOnly: true,
    categoryId: category?.categoryId,
  });

  const { mutateAsync: createCategory } = useCreateCategory({
    failureMessage: true,
    successMessage: 'Category has been created!',
    onSuccessCallback: (response: CategoryResponseType) => {
      router.push(`/admin/categories/edit/${response.data.categoryId}`);
    },
  });

  const { mutateAsync: editCategory } = useUpdateCategory({
    failureMessage: true,
    successMessage: 'Category has been updated!',
  });

  const { mutateAsync: deleteCategory } = useDeleteCategory({
    failureMessage: true,
    successMessage: 'Category has been deleted!',
    onSuccessCallback: () => {
      router.push(`/admin/categories`);
    },
  });

  useEffect(() => {
    if (isEditing && category) {
      reset(category);
    }
  }, [category, isEditing, reset]);

  const onClickDiscard = () => {
    if (isEditing) {
      reset(category);
    } else {
      reset({ name: '' });
    }
  };

  const handleSubmitCategory = () => {
    const { categoryId, name, parentId } = getValues();
    if (isEditing) {
      editCategory({ categoryId, name, parentId });
    } else {
      createCategory({ name, parentId });
    }
  };

  const onDeleteCategoryClick = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const onCancelModel = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const onDeleteCategoryConfirm = () => {
    if (category?.categoryId) {
      deleteCategory({ categoryId: category?.categoryId });
    }
  };

  const parentIds = categories?.map(({ categoryId, name }) => ({
    value: categoryId,
    label: name,
  }));

  return (
    <div className="w-100">
      <BreadcrumbWithActions
        onDiscard={onClickDiscard}
        shouldDisabledSaveButton={!isDirty}
        onSaveChange={handleSubmit(handleSubmitCategory)}
        pageName="Category"
        isEditing={isEditing}
      />
      <Card className="py-6  rounded-2xl mt-5 ">
        <div className="flex gap-4  flex-wrap items-start ">
          <div className="w-[100%] min-[560px]:w-[25%] min-w-52">
            <LabelInput
              name="name"
              label="Category Name"
              placeholder="Category Name"
              control={control}
              isRequired
            />
          </div>
          <div className="w-[100%] min-[560px]:w-[25%] min-w-52">
            <Label>Parent</Label>
            <Select
              control={control}
              options={parentIds}
              name="parentId"
              optionTitle="Select Parent category"
            />
          </div>
          {isEditing && (
            <Button
              color="gray"
              outline
              size="sm"
              theme={{
                size: { sm: 'px-3 py-2 font-small text-sm' },
                color: {
                  gray: 'border dark:bg-gray-700 border-gray-500',
                },
              }}
              onClick={onDeleteCategoryClick}
              className="w-[100%] min-[560px]:w-[25%] mt-4 min-w-52 !text-red-600  dark:!text-red-400 "
            >
              <TrashIcon className="text-red-500 h-6 w-6 mr-3" />
              <p className="text-red-500 pt-1">Delete Category</p>
            </Button>
          )}
        </div>
        {showDeleteModal ? (
          <DeleteModal
            showModal={showDeleteModal}
            onCloseModal={onCancelModel}
            onHandleConfirm={onDeleteCategoryConfirm}
            description={`Are you sure you want to delete
      ${category?.name}?`}
          />
        ) : null}
      </Card>
    </div>
  );
}

export default CategoryForm;
