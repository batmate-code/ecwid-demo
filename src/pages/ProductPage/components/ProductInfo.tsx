import type { ProductDetails } from '@/api/apiTypes/shopApiTypes';
import { AddToCartControl } from '@/components';
import { sanitizeHtml } from '@utils';
import { Badge, Box, Card, Group, Title, Text } from '@mantine/core';
import { useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ProductInfoProps {
  productDetails: ProductDetails;
}

const ProductInfo: FC<ProductInfoProps> = ({ productDetails }) => {
  const { t } = useTranslation('product');

  const productPrice = productDetails.price;
  const productInStock = productDetails.inStock;
  const productBadgeText = productInStock ? t('productInStock') : t('productOutOfStock');

  const sanitizedDescription = useMemo(
    () => productDetails && sanitizeHtml(productDetails.description),
    [productDetails?.description],
  );

  return (
    <>
      <Title order={2}>{productDetails.name}</Title>
      <Group mt="xs" gap="sm">
        <Text fz="lg" fw={700}>
          {productPrice}$
        </Text>
        <Badge
          variant={productInStock ? 'light' : 'outline'}
          color={productInStock ? 'teal' : 'gray'}
        >
          {productBadgeText}
        </Badge>
      </Group>

      <Box mt="md">
        <AddToCartControl
          id={productDetails.id}
          name={productDetails.name}
          price={productPrice}
          imageUrl={productDetails.imageUrl}
          disabled={!productInStock}
        />
      </Box>
      {sanitizedDescription && (
        <Card withBorder radius="md" pb="xs" mt="md">
          <Title order={5} mb="xs">
            {t('description')}
          </Title>
          <Card>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          </Card>
        </Card>
      )}
    </>
  );
};

export default ProductInfo;
