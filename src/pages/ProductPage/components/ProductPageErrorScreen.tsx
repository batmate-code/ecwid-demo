import BackButton from '@/components/BackButton';
import { Button, Card, Text, Container, Group, Title } from '@mantine/core';
import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductPageErrorScreen: FC = () => {
  const navigate = useNavigate();

  return (
    <Container size="lg">
      <BackButton onClick={() => navigate(-1)} mb="sm" />
      <Card withBorder radius="md" padding="lg">
        <Title order={3}>Product not found</Title>
        <Text c="dimmed" mt="xs">
          We couldn’t load this product. Try again or go back to the catalog.
        </Text>
        <Group mt="md">
          <Button component={Link} to="/">
            Go to catalog
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

export default ProductPageErrorScreen;
