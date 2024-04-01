export default interface ProductType {
  productId: string;
  productImageUrl: string[];
  title: string;
  description?: string;
  brand: string;
  friendlyId: string;
  quantity?: string | number;
  files?: File[];
  msrpPrice?: string | number;
  saleEndDate?: Date | string;
  saleStartDate?: Date | string;
  shippingDetails?: string;
  salePrice?: string | number;
  categoryIds: string[];
}
