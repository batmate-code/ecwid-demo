import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  DEFAULT_QUERY,
  useCatalogUrlState,
} from '@/pages/ProductsCatalog/hooks/useCatalogUrlState';
import { ProductSortingPaths } from '@/api/apiTypes/shopApiTypes';
import { ReactNode } from 'react';

const withRouter =
  (initialUrl: string) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initialUrl]}>{children}</MemoryRouter>
  );

describe('useCatalogUrlState', () => {
  it('reads defaults from empty URL', () => {
    const { result } = renderHook(() => useCatalogUrlState(), {
      wrapper: withRouter('/catalog'),
    });

    expect(result.current).toMatchObject(DEFAULT_QUERY);
  });

  it('reads values ​​from the URL and forces priceTo to be >= priceFrom', () => {
    const { result } = renderHook(() => useCatalogUrlState(), {
      wrapper: withRouter('/catalog?query=test&sort=PRICE_DESC&page=3&priceFrom=50&priceTo=20'),
    });

    const expectedResult = {
      query: 'test',
      sort: ProductSortingPaths.PriceDESC,
      page: 3,
      priceFrom: 50,
      priceTo: 50,
    };

    expect(result.current).toMatchObject(expectedResult);
  });

  it('setParams merges updates and resets page to 1 on filter changes', () => {
    const { result } = renderHook(() => useCatalogUrlState(), {
      wrapper: withRouter('/catalog?query=test&page=4&sort=RELEVANCE'),
    });

    act(() => {
      result.current.setParams({ sort: ProductSortingPaths.NameASC });
    });

    expect(result.current.query).toBe('test');
    expect(result.current.sort).toBe(ProductSortingPaths.NameASC);
  });

  it('resetFilters clears query, set defaults for sort and price, and sets page=1', () => {
    const { result } = renderHook(() => useCatalogUrlState(), {
      wrapper: withRouter('/catalog?query=hello&sort=NAME_DESC&page=7&priceFrom=15&priceTo=150'),
    });

    act(() => {
      result.current.resetFilters();
    });
    expect(result.current).toMatchObject(DEFAULT_QUERY);
  });
});
