import { renderHook } from '@testing-library/react';
import { useProductsParams } from '@/pages/ProductsCatalog/hooks/useProductsParams';
import { ProductSortingPaths } from '@/api/apiTypes/shopApiTypes';

const useDebounceMock = vi.fn((value: string) => value);
vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: (...args: string[]) => useDebounceMock(args[0]),
}));

beforeEach(() => {
  useDebounceMock.mockReset().mockImplementation((value: string) => value);
});

describe('useProductsParams', () => {
  it('maps state to correct params includes offset and limit', () => {
    const { result } = renderHook(() =>
      useProductsParams({
        query: '',
        sort: ProductSortingPaths.Relevance,
        page: 3,
        pageSize: 20,
        priceFrom: 10,
        priceTo: 200,
        categoryId: 42,
      }),
    );

    expect(result.current).toEqual({
      offset: 40,
      limit: 20,
      keyword: undefined,
      sortBy: ProductSortingPaths.Relevance,
      priceFrom: 10,
      priceTo: 200,
      category: 42,
    });
  });

  it('appends "*" to keyword when debounced query is non-empty', () => {
    useDebounceMock.mockReturnValue('test');
    const { result } = renderHook(() =>
      useProductsParams({
        query: 'test',
        sort: ProductSortingPaths.NameASC,
        page: 1,
        pageSize: 6,
        priceFrom: 0,
        priceTo: 100,
      }),
    );

    expect(result.current.keyword).toBe('test*');
    expect(result.current.sortBy).toBe(ProductSortingPaths.NameASC);
    expect(result.current.offset).toBe(0);
    expect(result.current.limit).toBe(6);
  });

  it('updates offset when page changes and saves other fields', () => {
    const { result, rerender } = renderHook((props) => useProductsParams(props), {
      initialProps: {
        query: '',
        sort: ProductSortingPaths.Relevance,
        page: 1,
        pageSize: 12,
        priceFrom: 0,
        priceTo: 200,
      },
    });

    expect(result.current.offset).toBe(0);

    rerender({
      query: '',
      sort: ProductSortingPaths.Relevance,
      page: 4,
      pageSize: 12,
      priceFrom: 0,
      priceTo: 200,
    });

    expect(result.current.offset).toBe(36);
    expect(result.current.limit).toBe(12);
    expect(result.current.sortBy).toBe(ProductSortingPaths.Relevance);
  });

  it('updates limit and offset when pageSize changes', () => {
    const { result, rerender } = renderHook((props) => useProductsParams(props), {
      initialProps: {
        query: '',
        sort: ProductSortingPaths.Relevance,
        page: 2,
        pageSize: 10,
        priceFrom: 0,
        priceTo: 200,
      },
    });

    expect(result.current.offset).toBe(10);
    expect(result.current.limit).toBe(10);

    rerender({
      query: '',
      sort: ProductSortingPaths.Relevance,
      page: 2,
      pageSize: 25,
      priceFrom: 0,
      priceTo: 200,
    });

    expect(result.current.offset).toBe(25);
    expect(result.current.limit).toBe(25);
  });

  it('omits category when categoryId is undefined', () => {
    const { result } = renderHook(() =>
      useProductsParams({
        query: '',
        sort: ProductSortingPaths.AddedASC,
        page: 1,
        pageSize: 5,
        priceFrom: 0,
        priceTo: 999,
      }),
    );

    expect(result.current.category).toBeUndefined();
    expect(result.current.sortBy).toBe(ProductSortingPaths.AddedASC);
  });
});
