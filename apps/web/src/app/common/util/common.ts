export const getImageUrl = (imageUrl?: string) => {
  if (!imageUrl) {
    return '';
  }
  return `${process.env.BUCKET_PREFIX}${imageUrl}`;
};
