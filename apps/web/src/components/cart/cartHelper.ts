export const formatPrice = (price?: number) =>
  price ? `$${price.toFixed(2)}` : undefined;
