import Image from 'next/image';

export interface ItemDetailsProps {
  price?: number;
  title?: string;
  children?: React.ReactNode;
  description?: string;
  label?: string;
  details?: string;
  detailsTitle?: string;
  duration?: number;
  categories?: Category[];
}

export interface Category {
  categoryId: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}
