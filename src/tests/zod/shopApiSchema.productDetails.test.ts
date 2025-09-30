import { ProductDetailsSchema } from '@/zod/schemas/shopApiSchema';

describe('ProductDetailsSchema', () => {
  it('accepts valid product details', () => {
    const input = {
      id: 1,
      name: 'Test',
      price: 19.95,
      imageUrl: 'https://cdn/x.png',
      inStock: true,
      description: 'Desc',
      media: {
        images: [
          {
            id: '1',
            isMain: true,
            image160pxUrl: 'https://cdn/160.png',
            image400pxUrl: 'https://cdn/400.png',
            image800pxUrl: 'https://cdn/800.png',
            image1500pxUrl: 'https://cdn/1500.png',
            imageOriginalUrl: 'https://cdn/orig.png',
          },
        ],
      },
    };

    const parsed = ProductDetailsSchema.parse(input);
    expect(parsed).toEqual(input);
  });

  it('rejects when media images invalid', () => {
    const bad = {
      id: 1,
      name: 'A',
      price: 1,
      imageUrl: 'https://test',
      inStock: true,
      description: 'x',
      media: { images: [{ id: 1, isMain: 'true' }] },
    };
    expect(() => ProductDetailsSchema.parse(bad)).toThrow();
  });
});
