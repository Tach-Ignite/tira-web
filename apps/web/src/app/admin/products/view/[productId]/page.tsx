'use client';

import React from 'react';
import { ViewProductPage as ViewProduct } from '../../../../../components/product';
import { PageView } from '../../../../../components/product/types';

function ViewProductPage() {
  return <ViewProduct pageView={PageView.Admin} />;
}

export default ViewProductPage;
