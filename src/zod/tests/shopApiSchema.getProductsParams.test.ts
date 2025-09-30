import { GetProductsParamsSchema } from '@/zod/schemas/shopApiSchema';

describe('GetProductsParamsSchema', () => {
  it('accepts empty or consistent ranges', () => {
    expect(() => GetProductsParamsSchema.parse({})).not.toThrow();
    expect(() => GetProductsParamsSchema.parse({ priceFrom: 10, priceTo: 20 })).not.toThrow();
    expect(() =>
      GetProductsParamsSchema.parse({ keyword: 'test', limit: 12, offset: 0 }),
    ).not.toThrow();
  });

  it('rejects when priceFrom > priceTo', () => {
    const res = GetProductsParamsSchema.safeParse({ priceFrom: 30, priceTo: 10 });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.issues[0].path).toEqual(['priceFrom']);
      expect(res.error.issues[0].message).toMatch(/<=/);
    }
  });
});
