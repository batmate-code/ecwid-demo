import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductSortingPaths } from '@/api/apiTypes/shopApiTypes';

export const DEFAULT_QUERY = {
  query: '',
  sort: ProductSortingPaths.Relevance,
  page: 1,
  priceFrom: 0,
  priceTo: 200,
} as const;

type CatalogUrlState = {
  query: string;
  sort: ProductSortingPaths;
  page: number;
  priceFrom: number;
  priceTo: number;
};

type UrlQueryUpdates = Partial<CatalogUrlState>;

const RESET_PAGE_KEYS: (keyof UrlQueryUpdates)[] = ['query', 'sort', 'priceFrom', 'priceTo'];

/**
 * Hook that keeps catalog filters in the URL search params.
 * - Reads current state from URL.
 * - setParams(updates) merges new values, removes empty ones, and resets page when filters change.
 * - resetFilters() restores DEFAULT_QUERY (except 'query').
 */
interface UseCatalogUrlStateData extends CatalogUrlState {
  setParams(updates: UrlQueryUpdates, replace?: boolean): void;
  resetFilters(replace?: boolean): void;
}

export const useCatalogUrlState = (): UseCatalogUrlStateData => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlState: CatalogUrlState = useMemo(() => {
    const query = searchParams.get('query') ?? DEFAULT_QUERY.query;
    const sortRaw = searchParams.get('sort') as ProductSortingPaths;
    const sort = sortRaw || DEFAULT_QUERY.sort;
    const page = Number(searchParams.get('page') ?? DEFAULT_QUERY.page);
    const priceFrom = Number(searchParams.get('priceFrom') ?? DEFAULT_QUERY.priceFrom);
    let priceTo = Number(searchParams.get('priceTo') ?? DEFAULT_QUERY.priceTo);
    if (priceTo < priceFrom) priceTo = priceFrom;

    return { query, sort, page, priceFrom, priceTo };
  }, [searchParams]);

  /**
   * Merges provided updates into the current URL query.
   * - Empty/null/undefined values are removed from the URL.
   * - If any of RESET_PAGE_KEYS changes, 'page' is reset to 1.
   * - 'replace' controls history behavior.
   */
  const setParams = useCallback(
    (updates: UrlQueryUpdates, replace = true) => {
      setSearchParams(
        (prev) => {
          const updatedUrlParams = new URLSearchParams(prev);

          Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') updatedUrlParams.delete(key);
            else updatedUrlParams.set(key, String(value));
          });

          if (RESET_PAGE_KEYS.some((k) => k in updates)) {
            updatedUrlParams.set('page', '1');
          }
          return updatedUrlParams;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  /**
   * Resets URL filters to DEFAULT_QUERY:
   * - clears 'query'
   * - sets 'sort', 'priceFrom', 'priceTo' to DEFAULT_QUERY
   * - sets 'page' to "1"
   */
  const resetFilters = useCallback(
    (replace = true) => {
      setSearchParams(
        (prev) => {
          const updatedUrlParams = new URLSearchParams(prev);
          updatedUrlParams.delete('query');
          updatedUrlParams.set('sort', DEFAULT_QUERY.sort);
          updatedUrlParams.set('priceFrom', String(DEFAULT_QUERY.priceFrom));
          updatedUrlParams.set('priceTo', String(DEFAULT_QUERY.priceTo));
          updatedUrlParams.set('page', '1');
          return updatedUrlParams;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  return { ...urlState, setParams, resetFilters };
};
