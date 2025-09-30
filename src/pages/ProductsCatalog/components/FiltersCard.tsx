import type { ProductSortingPaths } from '@/api/apiTypes/shopApiTypes';
import { Button, Card, Flex, RangeSlider, Select, Title, Text, ActionIcon } from '@mantine/core';
import { useMemo, useState, type FC } from 'react';
import { getSortingDropdownOptions } from '../utils';
import { useCatalogUrlState } from '@/pages/ProductsCatalog/hooks/useCatalogUrlState';
import { IconReload } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface FiltersCardProps {
  onCloseMobileFilter?(): void;
}

const FiltersCard: FC<FiltersCardProps> = ({ onCloseMobileFilter }) => {
  const { sort, priceFrom, priceTo, setParams, resetFilters } = useCatalogUrlState();

  const [sortPath, setSortPath] = useState<ProductSortingPaths>(sort);
  const [priceRange, setPriceRange] = useState<[number, number]>([+priceFrom, +priceTo]);

  const { t } = useTranslation('catalog');

  const sortOptions = useMemo(() => getSortingDropdownOptions(t), [t]);

  const handleApplyFilters = () => {
    const [from, to] = priceRange;
    setParams({ sort: sortPath, priceFrom: from, priceTo: to });
    if (onCloseMobileFilter) onCloseMobileFilter();
  };

  const setDefaultState = () => {
    setSortPath(sort);
    setPriceRange([priceFrom, priceTo]);
  };

  const handleResetFilters = () => {
    setDefaultState();
    resetFilters();
  };

  return (
    <Card padding="lg" radius="md" withBorder mt={'xs'}>
      <Title order={3}>{t('filtersTitle')}</Title>

      <Flex mt={'xs'} gap={'xs'} direction={'column'}>
        <Text fw={500}> {t('filterSortingTitle')}</Text>
        <Select
          data={sortOptions}
          value={sortPath}
          onChange={(val) => val && setSortPath(val as ProductSortingPaths)}
        />
      </Flex>

      <Flex mt={'xs'} gap={'xs'} direction={'column'}>
        <Text fw={500}> {t('filterPriceTitle')}</Text>
        <RangeSlider value={priceRange} onChange={setPriceRange} min={0} max={200} step={1} />
      </Flex>

      <Flex mt="lg" gap="xs" align={'center'}>
        <Button flex={1} onClick={handleApplyFilters} aria-label={t('applyFiltersButtonAriaLabel')}>
          {t('applyFiltersButtonText')}
        </Button>

        <ActionIcon size="lg" onClick={handleResetFilters} variant="transparent">
          <IconReload size={24} aria-label={t('resetFiltersButtonAriaLabel')} />
        </ActionIcon>
      </Flex>
    </Card>
  );
};

export default FiltersCard;
