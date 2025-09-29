import {
  useQuery,
  queryOptions,
  keepPreviousData,
  type UseQueryResult,
} from '@tanstack/react-query';
import { getProductsList } from '@/api/shopApi';
import { DEFAULT_STALE_TIME_MS } from './config';
import type { GetProductsParams, PagedResponse, Product } from '@/api/apiTypes/shopApiTypes';
import type { AxiosError } from 'axios';

const productsListQueryCacheKey = 'productsListQueryCacheKey';

export const getProductsListQueryOptions = (params?: GetProductsParams) =>
  queryOptions<PagedResponse<Product>, AxiosError>({
    queryKey: [productsListQueryCacheKey, params],
    queryFn: () => getProductsList(params),
    placeholderData: keepPreviousData,
    staleTime: DEFAULT_STALE_TIME_MS,
  });

export const useGetProductsList = (
  params?: GetProductsParams,
): UseQueryResult<PagedResponse<Product>, AxiosError> => {
  return useQuery(getProductsListQueryOptions(params));
};
