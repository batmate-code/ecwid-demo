import { ProductSortingPaths } from '@/api/apiTypes/shopApiTypes';
import type { ComboboxData } from '@mantine/core';
import type { TFunction } from 'i18next';

export const getSortingDropdownOptions = (t: TFunction<'catalog'>): ComboboxData => [
  {
    label: t('sortingLabelsByRelevance'),
    value: ProductSortingPaths.Relevance,
  },
  {
    label: t('sortingLabelsNewestFirst'),
    value: ProductSortingPaths.AddedASC,
  },
  {
    label: t('sortingLabelsOldestFirst'),
    value: ProductSortingPaths.AddedDESC,
  },
  {
    label: t('sortingLabelsPriceLowToHigh'),
    value: ProductSortingPaths.PriceASC,
  },
  {
    label: t('sortingLabelsPriceHighToLow'),
    value: ProductSortingPaths.PriceDESC,
  },
  {
    label: t('sortingLabelsNameAtoZ'),
    value: ProductSortingPaths.NameASC,
  },
  {
    label: t('sortingLabelsNameZtoA'),
    value: ProductSortingPaths.NameDESC,
  },
];

export const splitCategoryPathToSlugs = (path?: string): string[] => {
  if (!path) return [];
  return path.split('/').filter(Boolean);
};
