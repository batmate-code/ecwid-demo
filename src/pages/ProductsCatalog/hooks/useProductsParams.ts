import { useMemo } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductSortingPaths, type GetProductsParams } from '@/api/apiTypes/shopApiTypes';

export interface ProductQueryParams {
  query: string;
  sort: ProductSortingPaths;
  page: number;
  pageSize: number;
  priceFrom: number;
  priceTo: number;
  categoryId?: number;
}

/** Builds stable Ecwid products query params from UI state (with debounced search). */
export const useProductsParams = ({
  query,
  sort,
  page,
  pageSize,
  priceFrom,
  priceTo,
  categoryId,
}: ProductQueryParams) => {
  const debouncedQuery = useDebounce(query, 300);

  const params = useMemo<GetProductsParams>(() => {
    const offset = (page - 1) * pageSize;
    return {
      offset,
      limit: pageSize,
      keyword: debouncedQuery ? `${debouncedQuery}*` : undefined,
      sortBy: sort,
      priceFrom,
      priceTo,
      category: categoryId,
    };
  }, [debouncedQuery, page, pageSize, sort, priceFrom, priceTo, categoryId]);

  return params;
};
