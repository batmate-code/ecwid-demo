import type { MediaImage, ProductDetails } from '@/api/apiTypes/shopApiTypes';

export type GalleryImage = {
  url: string;
  alt: string;
  placeholderUrl?: string;
};

/** Return a new array with the main image first */
const sortMainFirst = (images: MediaImage[]): MediaImage[] =>
  [...images].sort((a, b) => Number(b.isMain) - Number(a.isMain));

/** Normalize API images to gallery format, setting alt from provided text. */
const toGalleryImages = (images: MediaImage[], altText: string): GalleryImage[] => {
  return images.map((img) => ({
    url: img.imageOriginalUrl,
    alt: altText,
    placeholderUrl: img.image160pxUrl,
  }));
};

/** Build gallery images for a product with fallbacks, returns [] if nothing available. */
export const getProductImages = (productDetails?: ProductDetails): GalleryImage[] => {
  if (!productDetails) return [];

  const mediaImages = productDetails.media?.images ?? [];
  const altText = productDetails.name;

  if (mediaImages.length === 0) {
    return productDetails.imageUrl ? [{ url: productDetails.imageUrl, alt: altText }] : [];
  }

  const ordered = sortMainFirst(mediaImages);
  const gallery = toGalleryImages(ordered, altText);

  return gallery;
};
