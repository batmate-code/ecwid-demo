import { Link } from 'react-router-dom';
import { Box, Card, Center, Flex, Loader, NavLink, Title, Text } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ResultCard } from '@/components';
import { IconArrowBack } from '@tabler/icons-react';
import type { CategoryItem } from '../hooks/useCategoriesNavigation';

interface CategorySidebarProps {
  title: string;
  isLoading: boolean;
  isError?: boolean;
  categories: CategoryItem[];
  backHref?: string | null;
}

const CategorySidebar: FC<CategorySidebarProps> = ({
  title,
  isLoading,
  isError,
  categories,
  backHref,
}) => {
  const { t } = useTranslation('catalog');

  return isError ? (
    <ResultCard text={t('categoriesFetchError')} isError mt="xs" />
  ) : (
    <Card padding="lg" radius="md" withBorder mt="xs">
      <Title order={3}>{title}</Title>
      <Box mt="xs">
        {isLoading ? (
          <Center m={'md'}>
            <Loader />
          </Center>
        ) : (
          <Flex mt="xs" direction="column">
            {categories.map((category) => (
              <NavLink
                key={category.id}
                label={<Text>{category.label}</Text>}
                component={Link}
                to={category.href}
              />
            ))}
            {!!backHref && (
              <NavLink
                label={
                  <Text>
                    <IconArrowBack />
                  </Text>
                }
                component={Link}
                to={backHref}
              />
            )}
          </Flex>
        )}
      </Box>
    </Card>
  );
};
export default CategorySidebar;
