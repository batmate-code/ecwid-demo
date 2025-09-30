import { ProductSchema } from '@/zod/schemas/shopApiSchema';

describe('ProductSchema', () => {
  it('accepts valid product', () => {
    const input = {
      id: 1,
      name: 'Test',
      price: 19.95,
      imageUrl: 'https://cdn/x.png',
      inStock: true,
    };
    const parsed = ProductSchema.parse(input);
    expect(parsed).toEqual(input);
  });

  it('rejects invalid product', () => {
    const bad = { id: '1', name: 123, price: 'x', imageUrl: 'not-url', inStock: 'yes' };
    expect(() => ProductSchema.parse(bad)).toThrow();
  });
});
