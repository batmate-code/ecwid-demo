import { PagedResponseSchema, ProductSchema } from '@/zod/schemas/shopApiSchema';

describe('PagedResponseSchema(Product)', () => {
  const schema = PagedResponseSchema(ProductSchema);

  it('accepts valid page', () => {
    const input = {
      total: 1,
      count: 1,
      offset: 0,
      limit: 10,
      items: [{ id: 1, name: 'A', price: 1, imageUrl: 'https://x', inStock: true }],
    };
    expect(() => schema.parse(input)).not.toThrow();
  });

  it('rejects negative or missing counters', () => {
    const bad = { total: -1, count: 1, offset: 0, limit: 10, items: [] };
    expect(() => schema.parse(bad)).toThrow();
  });

  it('rejects when items are invalid for the inner schema', () => {
    const bad = { total: 1, count: 1, offset: 0, limit: 10, items: [{ id: 'x' }] };
    expect(() => schema.parse(bad)).toThrow();
  });
});
