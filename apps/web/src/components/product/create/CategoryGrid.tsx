'use client';

import React from 'react';
import { Card } from '@src/flowbite';
import { ProductFieldProps } from './types';
import CategorySelect from './CategorySelect';

function CategoryGrid(props: ProductFieldProps) {
  const { productForm } = props || {};

  return (
    <Card>
      <CategorySelect form={productForm} />
    </Card>
  );
}

export default CategoryGrid;
