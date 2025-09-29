import { useEffect, useState } from 'react';
import { Card, Image as MantineImage, SimpleGrid, Flex } from '@mantine/core';
import styled from 'styled-components';
import type { GalleryImage } from '../utils';

type ProductGalleryProps = {
  images: GalleryImage[];
  mainImageHeight?: number;
};

const MainImageShell = styled.div<{
  $placeholderUrl?: string;
  $isLoaded: boolean;
  $height: number;
}>`
  overflow: hidden;
  border-radius: var(--mantine-radius-md);
  height: ${({ $height }) => `${$height}px`};
  background-image: ${({ $placeholderUrl }) =>
    $placeholderUrl ? `url(${$placeholderUrl})` : 'none'};
  background-size: cover;

  filter: ${({ $isLoaded, $placeholderUrl }) =>
    !$isLoaded && $placeholderUrl ? 'blur(6px)' : 'none'};
  transition: filter 200ms ease;

  .main-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbShell = styled.div`
  cursor: pointer;
  overflow: hidden;
  border-radius: var(--mantine-radius-md);

  .thumb-img {
    width: 100%;
    height: 72px;
    object-fit: cover;
  }
`;

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, mainImageHeight = 720 }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMainLoaded, setIsMainLoaded] = useState(false);

  if (!images || images.length === 0) return null;

  const activeImage = images[activeImageIndex] ?? images[0];

  useEffect(() => {
    setIsMainLoaded(false);
  }, [activeImageIndex]);

  return (
    <Flex direction="column" gap="xs">
      <Card withBorder radius="md" padding={0}>
        <MainImageShell
          $placeholderUrl={activeImage.placeholderUrl}
          $isLoaded={isMainLoaded}
          $height={mainImageHeight}
        >
          <MantineImage
            className="main-img"
            src={activeImage.url}
            alt={activeImage.alt}
            onLoad={() => setIsMainLoaded(true)}
          />
        </MainImageShell>
      </Card>

      {images.length > 1 && (
        <SimpleGrid cols={{ base: 4, sm: 6 }} spacing="xs">
          {images.map((imageItem, imageIndex) => (
            <Card key={`${imageItem.url}-${imageIndex}`} withBorder padding={0} radius="md">
              <ThumbShell onClick={() => setActiveImageIndex(imageIndex)}>
                <MantineImage
                  className="thumb-img"
                  src={imageItem.placeholderUrl ?? imageItem.url}
                  alt={imageItem.alt}
                  loading="lazy"
                />
              </ThumbShell>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default ProductGallery;
