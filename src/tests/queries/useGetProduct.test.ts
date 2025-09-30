import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { createQueryWrapper } from '@/tests/queryWrapper';
import {
  useGetProduct,
  getCategoryInfoQueryOptions,
  productQueryCacheKey,
} from '@/queries/useGetProduct';

vi.mock('@/api/shopApi', () => ({
  getProduct: vi.fn(),
}));
import { getProduct } from '@/api/shopApi';

beforeEach(() => {
  (getProduct as Mock).mockReset();
});

describe('useGetProduct', () => {
  it('calls API with productId and returns data', async () => {
    (getProduct as Mock).mockResolvedValue({
      id: 123,
      name: 'Test',
      price: 19.95,
      imageUrl: 'https://url',
      inStock: true,
      description: 'desc',
      media: { images: [] },
    });

    const { Wrapper } = createQueryWrapper();
    const { result } = renderHook(() => useGetProduct(123), { wrapper: Wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getProduct).toHaveBeenCalledWith(123);
    expect(result.current.data?.id).toBe(123);
  });

  it('options makes queryKey with productId', () => {
    const options = getCategoryInfoQueryOptions(123);
    expect(options.queryKey).toEqual([productQueryCacheKey, 123]);
  });
});
