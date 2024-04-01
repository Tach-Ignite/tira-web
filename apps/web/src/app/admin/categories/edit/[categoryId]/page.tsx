'use client';

import { CategoryForm } from '@components/categories';
import { useGetCategory } from '@queries/useCategoryQuery';
import { useParams } from 'next/navigation';

function EditCategory() {
  const { categoryId } = useParams() || {};
  const { data: { data: category } = {} } = useGetCategory(
    categoryId as string,
  );

  return <CategoryForm isEditing category={category} />;
}

export default EditCategory;
