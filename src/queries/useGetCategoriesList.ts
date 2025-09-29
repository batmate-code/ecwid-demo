import { useQuery, queryOptions, type UseQueryResult } from '@tanstack/react-query';
import { getCategoriesList } from '@/api/shopApi';
import { DEFAULT_STALE_TIME_MS } from './config';
import type { Category, PagedResponse } from '@/api/apiTypes/shopApiTypes';
import type { AxiosError } from 'axios';

export const categoriesListQueryCacheKey = 'categoriesListQueryCacheKey';

export const getCategoriesListQueryOptions = () =>
  queryOptions<PagedResponse<Category>, AxiosError, Category[]>({
    queryKey: [categoriesListQueryCacheKey],
    queryFn: getCategoriesList,
    staleTime: DEFAULT_STALE_TIME_MS,
    select: (response) => response.items,
  });

export const useGetCategoriesList = (): UseQueryResult<Category[], AxiosError> => {
  return useQuery(getCategoriesListQueryOptions());
};
