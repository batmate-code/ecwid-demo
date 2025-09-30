import { describe, it, expect } from 'vitest';
import type { MediaImage, ProductDetails } from '@/api/apiTypes/shopApiTypes';
import { getProductImages } from '@/pages/ProductPage/utils';

const makeMediaImage = (overrides: Partial<MediaImage> = {}): MediaImage => ({
  id: 'img-1',
  isMain: false,
  image160pxUrl: 'https://url-160.jpg',
  image400pxUrl: 'https://url-400.jpg',
  image800pxUrl: 'https://url-800.jpg',
  image1500pxUrl: 'https://url-1500.jpg',
  imageOriginalUrl: 'https://url.jpg',
  ...overrides,
});

const makeProductDetails = (overrides: Partial<ProductDetails> = {}): ProductDetails => ({
  id: 111,
  name: 'Sample product',
  price: 10,
  imageUrl: '',
  inStock: true,
  description: '',
  media: { images: [] },
  ...overrides,
});

describe('getProductImages', () => {
  it('returns empty array when productDetails is undefined', () => {
    expect(getProductImages(undefined)).toEqual([]);
  });

  it('returns empty array when there are no media images and no imageUrl', () => {
    const product = makeProductDetails({ imageUrl: '', media: { images: [] } });
    expect(getProductImages(product)).toEqual([]);
  });

  it('returns single fallback image from product.imageUrl', () => {
    const product = makeProductDetails({
      name: 'Test',
      imageUrl: 'https://url.jpg',
      media: { images: [] },
    });
    expect(getProductImages(product)).toEqual([{ url: 'https://url.jpg', alt: 'Test' }]);
  });

  it('normalizes media.images into gallery items and places main image first', () => {
    const images: MediaImage[] = [
      makeMediaImage({
        isMain: false,
        imageOriginalUrl: 'https://url.jpg',
        image160pxUrl: 'https://url-160.jpg',
      }),
      makeMediaImage({
        isMain: true,
        imageOriginalUrl: 'https://url.jpg',
        image160pxUrl: 'https://url-160.jpg',
      }),
      makeMediaImage({
        isMain: false,
        imageOriginalUrl: 'https://url.jpg',
        image160pxUrl: 'https://url-160.jpg',
      }),
    ];

    const product = makeProductDetails({ name: 'Test', media: { images } });
    const result = getProductImages(product);

    expect(result[0]).toEqual({
      url: 'https://url.jpg',
      alt: 'Test',
      placeholderUrl: 'https://url-160.jpg',
    });

    expect(result).toEqual([
      {
        url: 'https://url.jpg',
        alt: 'Test',
        placeholderUrl: 'https://url-160.jpg',
      },
      {
        url: 'https://url.jpg',
        alt: 'Test',
        placeholderUrl: 'https://url-160.jpg',
      },
      {
        url: 'https://url.jpg',
        alt: 'Test',
        placeholderUrl: 'https://url-160.jpg',
      },
    ]);
  });

  it('does not mutate original media.images array (immutability)', () => {
    const original: MediaImage[] = [
      makeMediaImage({ isMain: false, imageOriginalUrl: 'a', image160pxUrl: 'a-160' }),
      makeMediaImage({ isMain: true, imageOriginalUrl: 'b', image160pxUrl: 'b-160' }),
      makeMediaImage({ isMain: false, imageOriginalUrl: 'c', image160pxUrl: 'c-160' }),
    ];
    const snapshot = original.map((item) => item);

    const product = makeProductDetails({ media: { images: original } });
    getProductImages(product);

    expect(original).toEqual(snapshot);
  });

  it('when multiple images are marked as main, the first main stays first after sorting', () => {
    const images: MediaImage[] = [
      makeMediaImage({ isMain: true, imageOriginalUrl: 'm1', image160pxUrl: 'm1-160' }),
      makeMediaImage({ isMain: true, imageOriginalUrl: 'm2', image160pxUrl: 'm2-160' }),
      makeMediaImage({ isMain: false, imageOriginalUrl: 'x', image160pxUrl: 'x-160' }),
    ];
    const product = makeProductDetails({ media: { images }, name: 'X' });
    const res = getProductImages(product);

    expect(res[0].url).toBe('m1');
    expect(res.map((i) => i.url)).toEqual(['m1', 'm2', 'x']);
  });
});
