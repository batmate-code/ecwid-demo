import type { FC } from 'react';
import { Box, Center, Container, Grid, Loader } from '@mantine/core';
import FiltersCard from './components/FiltersCard';
import ProductCard from './components/ProductCard';
import CatalogHeader from './components/ProductCatalogHeader';
import CategorySidebar from './components/CategoriesSidebar';
import ProductsGrid from './components/ProductGrid';
import { CatalogPagination, ResultCard, SearchInput } from '@/components';
import { useTranslation } from 'react-i18next';
import { useCatalogUrlState } from './hooks/useCatalogUrlState';
import { useProductsParams } from './hooks/useProductsParams';
import { useGetProductsList } from '@/queries/useGetProductsList';
import type { Product } from '@/api/apiTypes/shopApiTypes';
import { MobileFilters } from './components/MobileFilters';
import { useResponsive } from '@/hooks/useResponsive';
import { useGetCategoriesList } from '@/queries/useGetCategoriesList';
import { useCategoriesNavigation } from './hooks/useCategoriesNavigation';
import { useBuildUrl } from './hooks/useBuildUrl';
import { useDisclosure } from '@mantine/hooks';

const PAGE_SIZE = 6;

const ProductsCatalog: FC = () => {
  const { t } = useTranslation('catalog');
  const { isMobile, isTablet } = useResponsive();
  const { query, sort, page, priceFrom, priceTo, setParams } = useCatalogUrlState();
  const { buildUrl } = useBuildUrl();
  const [mobileFilterOpened, { open: openMobileFilter, close: closeMobileFilter }] =
    useDisclosure(false);

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesList();

  const { breadcrumbItems, visibleCategories, currentCategoryId, backHref } =
    useCategoriesNavigation(categories);

  const productsParams = useProductsParams({
    query,
    sort,
    page,
    pageSize: PAGE_SIZE,
    priceFrom,
    priceTo,
    categoryId: currentCategoryId,
  });

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsList(productsParams);

  const products: Product[] = productsData?.items ?? [];
  const totalProducts: number = productsData?.total ?? 0;
  const totalPages: number = Math.ceil(totalProducts / PAGE_SIZE);

  const categoryTitle: string = currentCategoryId ? t('subcategoriesTitle') : t('categoriesTitle');
  const categoryBackHref: string | null = currentCategoryId ? (backHref ?? '/') : null;
  const homeHref: string = buildUrl('/', { resetPage: true });

  return (
    <Container size="lg">
      <CatalogHeader homeHref={homeHref} crumbs={breadcrumbItems} />
      {isMobile && (
        <MobileFilters
          opened={mobileFilterOpened}
          open={openMobileFilter}
          close={closeMobileFilter}
        >
          <Box>
            <SearchInput value={query} onChange={(value) => setParams({ query: value })} />
          </Box>
          <CategorySidebar
            title={categoryTitle}
            isLoading={isCategoriesLoading}
            isError={isCategoriesError}
            categories={visibleCategories}
            backHref={categoryBackHref}
          />
          <FiltersCard onCloseMobileFilter={closeMobileFilter} />
        </MobileFilters>
      )}
      <Grid mt="xs">
        {!isMobile && (
          <Grid.Col span={isTablet ? 4 : 3}>
            <Box>
              <SearchInput value={query} onChange={(value) => setParams({ query: value })} />
            </Box>
            <CategorySidebar
              title={categoryTitle}
              isLoading={isCategoriesLoading}
              isError={isCategoriesError}
              categories={visibleCategories}
              backHref={categoryBackHref}
            />
            <FiltersCard />
          </Grid.Col>
        )}

        <Grid.Col span="auto">
          <Box>
            {isProductsLoading ? (
              <Center data-testid="catalog-loader">
                <Loader />
              </Center>
            ) : isProductsError ? (
              <ResultCard testId="error-products-result" text={t('productsFetchError')} isError />
            ) : (
              <>
                <ProductsGrid showEmpty={!products.length}>
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.imageUrl}
                      inStock={product.inStock}
                    />
                  ))}
                </ProductsGrid>
                <CatalogPagination
                  total={totalPages}
                  page={page}
                  onChange={(nextPage) => setParams({ page: nextPage })}
                />
              </>
            )}
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductsCatalog;
