import { useQuery, queryOptions } from '@tanstack/react-query';
import { getProduct } from '@/api/shopApi';
import { DEFAULT_STALE_TIME_MS } from './config';
import type { ProductDetails } from '@/api/apiTypes/shopApiTypes';
import type { AxiosError } from 'axios';

export const productQueryCacheKey = 'productQueryCacheKey';

export const getCategoryInfoQueryOptions = (productId: number | string) =>
  queryOptions<ProductDetails, AxiosError>({
    queryKey: [productQueryCacheKey, productId],
    queryFn: () => getProduct(productId),
    staleTime: DEFAULT_STALE_TIME_MS,
  });

export const useGetProduct = (productId: number | string) => {
  return useQuery(getCategoryInfoQueryOptions(productId));
};
