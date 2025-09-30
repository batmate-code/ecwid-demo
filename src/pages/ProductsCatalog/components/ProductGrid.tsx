import type { ReactNode, FC } from 'react';
import { SimpleGrid } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { ResultCard } from '@/components';

interface ProductsGridProps {
  cols?: { base: number; md: number; lg: number };
  children: ReactNode;
  showEmpty?: boolean;
}
const ProductsGrid: FC<ProductsGridProps> = ({
  cols = { xs: 2, sm: 2, md: 3, lg: 3 },
  children,
  showEmpty,
}) => {
  const { t } = useTranslation('catalog');
  const hasChildren = Array.isArray(children) ? children.length > 0 : !!children;
  if (!hasChildren && showEmpty) {
    return (
      <ResultCard
        title={t('productsNotFoundError')}
        text={t('productsNotFoundErrorDescription')}
        testId="empty-products-result"
      />
    );
  }
  return <SimpleGrid cols={cols}>{children}</SimpleGrid>;
};
export default ProductsGrid;
