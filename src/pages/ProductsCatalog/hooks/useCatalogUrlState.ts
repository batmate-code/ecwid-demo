import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductSortingPaths } from '@/api/apiTypes/shopApiTypes';

const DEFAULTS = {
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
 * - resetFilters() restores defaults (except 'query').
 */
export const useCatalogUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlState: CatalogUrlState = useMemo(() => {
    const query = searchParams.get('query') ?? DEFAULTS.query;
    const sortRaw = searchParams.get('sort') as ProductSortingPaths;
    const sort = sortRaw || DEFAULTS.sort;
    const page = Number(searchParams.get('page') ?? DEFAULTS.page);
    const priceFrom = Number(searchParams.get('priceFrom') ?? DEFAULTS.priceFrom);
    let priceTo = Number(searchParams.get('priceTo') ?? DEFAULTS.priceTo);
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
   * Resets URL filters to defaults:
   * - clears 'query'
   * - sets 'sort', 'priceFrom', 'priceTo' to DEFAULTS
   * - sets 'page' to "1"
   */
  const resetFilters = useCallback(
    (replace = true) => {
      setSearchParams(
        (prev) => {
          const updatedUrlParams = new URLSearchParams(prev);
          updatedUrlParams.delete('query');
          updatedUrlParams.set('sort', DEFAULTS.sort);
          updatedUrlParams.set('priceFrom', String(DEFAULTS.priceFrom));
          updatedUrlParams.set('priceTo', String(DEFAULTS.priceTo));
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
