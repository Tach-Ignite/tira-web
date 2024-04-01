/* eslint-disable no-unused-vars */

'use client';

import { UseFormReturn } from 'react-hook-form';

export interface EditPicturesGridProps {
  form: UseFormReturn<any>;
  onUpdateImage?: (data: any) => Promise<unknown>;
  label?: string;
  isSingleImage?: boolean;
  fileUrl?: string;
  gridTitle?: string;
  imageField?: string;
}
