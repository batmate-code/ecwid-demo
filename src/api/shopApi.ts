import type {
  Category,
  GetProductsParams,
  PagedResponse,
  Product,
  ProductDetails,
} from './apiTypes/shopApiTypes';
import { ecwidService } from './services/ecwidClientService';
import { withZod } from '@/zod/withZod';
import {
  CategorySchema,
  GetProductsParamsSchema,
  PagedResponseSchema,
  ProductDetailsSchema,
  ProductSchema,
} from '@/zod/schemas/shopApiSchema';

const validateParams = (params?: GetProductsParams): GetProductsParams | undefined => {
  if (!params) return undefined;
  const result = GetProductsParamsSchema.safeParse(params);
  if (!result.success) {
    console.warn('[ecwid-api] invalid GetProductsParams', result.error.issues, params);
    return params;
  }
  return result.data;
};

export const getCategoriesList = async (): Promise<PagedResponse<Category>> => {
  return withZod(
    () => ecwidService.get('/categories', { params: { withSubcategories: true } }),
    PagedResponseSchema(CategorySchema),
    { label: 'GET /categories' },
  );
};

export const getProductsList = async (
  params?: GetProductsParams,
): Promise<PagedResponse<Product>> => {
  const safeParams = validateParams(params);

  return withZod(
    () => ecwidService.get('/products', { params: safeParams }),
    PagedResponseSchema(ProductSchema),
    { label: 'GET /products' },
  );
};

export const getProduct = async (productId: number | string): Promise<ProductDetails> => {
  return withZod(() => ecwidService.get(`/products/${productId}`), ProductDetailsSchema, {
    label: `GET /products/${productId}`,
  });
};
