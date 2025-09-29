import BackButton from '@/components/BackButton';
import { Container, Grid, Group, Skeleton } from '@mantine/core';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductPageSkeleton: FC = () => {
  const navigate = useNavigate();

  return (
    <Container size="lg">
      <BackButton onClick={() => navigate(-1)} mb="sm" />
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Skeleton height={420} radius="md" />
          <Group mt="xs" gap="xs">
            <Skeleton height={72} w="22%" />
            <Skeleton height={72} w="22%" />
            <Skeleton height={72} w="22%" />
            <Skeleton height={72} w="22%" />
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Skeleton height={36} mb="xs" />
          <Skeleton height={20} w="40%" mb="md" />
          <Skeleton height={24} mb="sm" />
          <Skeleton height={80} radius="md" />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductPageSkeleton;
