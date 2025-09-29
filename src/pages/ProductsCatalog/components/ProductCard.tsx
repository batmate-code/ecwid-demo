import { Link } from 'react-router-dom';
import { Card, Image, Text, Box, Center } from '@mantine/core';
import styled from 'styled-components';
import type { FC } from 'react';
import { AddToCartControl } from '@/components';
import { useResponsive } from '@/hooks/useResponsive';

const CardRoot = styled.div`
  display: flex;
  flex-direction: column;
  transition: transform 150ms ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Cover = styled.div`
  overflow: hidden;

  .zoomable {
    transition: transform 300ms ease;
    transform-origin: center;
    will-change: transform;
  }

  ${CardRoot}:hover & .zoomable,
  ${CardRoot}:focus-within & .zoomable {
    transform: scale(1.06);
  }
`;

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  inStock?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ id, name, price, image, inStock }) => {
  const { isMobile, isTablet } = useResponsive();
  const cardHeight = isMobile ? 640 : isTablet ? 220 : 420;

  return (
    <Card component={CardRoot} shadow="sm" padding="md" h="100%" withBorder>
      <Card.Section>
        <Cover>
          <Link to={`/product/${id}`}>
            {image && <Image src={image} alt={name} h={cardHeight} className="zoomable" />}
          </Link>
        </Cover>
      </Card.Section>

      <Text mt="xs" lineClamp={2}>
        {name}
      </Text>
      <Center mt="auto">
        <Text mb="xs" fw={600}>
          {price}$
        </Text>
      </Center>
      <Box>
        <AddToCartControl
          id={id}
          name={name}
          price={price}
          imageUrl={image || ''}
          disabled={!inStock}
        />
      </Box>
    </Card>
  );
};

export default ProductCard;
