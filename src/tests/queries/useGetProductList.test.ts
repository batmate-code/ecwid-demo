import { Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { createQueryWrapper } from '@/tests/queryWrapper';
import { useGetProductsList, getProductsListQueryOptions } from '@/queries/useGetProductsList';

vi.mock('@/api/shopApi', () => ({
  getProductsList: vi.fn(),
}));
import { getProductsList } from '@/api/shopApi';

beforeEach(() => {
  (getProductsList as Mock).mockReset();
});

describe('useGetProductsList', () => {
  it('calls  API with params', async () => {
    (getProductsList as Mock).mockResolvedValue({
      total: 1,
      count: 1,
      offset: 0,
      limit: 10,
      items: [{ id: 1, name: 'A', price: 1, imageUrl: 'https://url', inStock: true }],
    });

    const params = { limit: 10, offset: 0, keyword: 'a' };
    const { Wrapper } = createQueryWrapper();
    const { result } = renderHook(() => useGetProductsList(params), { wrapper: Wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getProductsList).toHaveBeenCalledWith(params);
  });

  it('options has queryKey in params', () => {
    const params = { limit: 10, offset: 20, keyword: 'k' };
    const options = getProductsListQueryOptions(params);
    expect(options.queryKey).toEqual(expect.arrayContaining([expect.any(String), params]));
  });
});
