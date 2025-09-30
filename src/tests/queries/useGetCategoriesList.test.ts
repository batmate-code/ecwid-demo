import { renderHook, waitFor } from '@testing-library/react';
import { createQueryWrapper } from '@/tests/queryWrapper';
import {
  useGetCategoriesList,
  getCategoriesListQueryOptions,
  categoriesListQueryCacheKey,
} from '@/queries/useGetCategoriesList';

vi.mock('@/api/shopApi', () => ({
  getCategoriesList: vi.fn(),
}));
import { getCategoriesList } from '@/api/shopApi';
import { Mock } from 'vitest';

beforeEach(() => {
  (getCategoriesList as Mock).mockReset();
});

describe('useGetCategoriesList', () => {
  it('Return items by select', async () => {
    (getCategoriesList as Mock).mockResolvedValue({
      total: 2,
      count: 2,
      offset: 0,
      limit: 10,
      items: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ],
    });

    const { Wrapper } = createQueryWrapper();
    const { result } = renderHook(() => useGetCategoriesList(), { wrapper: Wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ]);
  });

  it('error-handling: isError=true if API falls', async () => {
    (getCategoriesList as Mock).mockRejectedValue(new Error('boom'));

    const { Wrapper } = createQueryWrapper();
    const { result } = renderHook(() => useGetCategoriesList(), { wrapper: Wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it('queryOptions has expected queryKey', () => {
    const options = getCategoriesListQueryOptions();
    expect(options.queryKey).toEqual([categoriesListQueryCacheKey]);
  });
});
