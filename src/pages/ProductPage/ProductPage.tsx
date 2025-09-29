import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mantine/core';
import { useGetProduct } from '@/queries/useGetProduct';
import ProductGallery from './components/ProductGallery';
import { getProductImages } from './utils';
import { useMemo } from 'react';
import ProductPageSkeleton from './components/ProductPageSkeleton';
import ProductPageErrorScreen from './components/ProductPageErrorScreen';
import ProductInfo from './components/ProductInfo';
import BackButton from '@/components/BackButton';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: productDetails, isLoading, isError } = useGetProduct(id ?? '');

  const galleryImages = useMemo(() => getProductImages(productDetails), [productDetails]);

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (isError || !productDetails) {
    return <ProductPageErrorScreen />;
  }

  return (
    <Container size="lg">
      <BackButton onClick={() => navigate(-1)} mb="sm" />
      <Grid gutter="lg" align="start">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ProductGallery images={galleryImages} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ProductInfo productDetails={productDetails} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductPage;
