import useGetOppositeColor from '@/hooks/useGetOppositeColor';
import { Anchor, Breadcrumbs, Box, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type Crumb = { name: string; path: string };

interface CatalogHeaderProps {
  homeHref: string;
  crumbs: Crumb[];
}

const CatalogHeader: FC<CatalogHeaderProps> = ({ homeHref, crumbs }) => {
  const { color: anchorColor } = useGetOppositeColor();
  const { t } = useTranslation('catalog');

  return (
    <Box mt="xs">
      <Breadcrumbs separatorMargin={'xs'}>
        <Anchor component={Link} to={homeHref} underline="never" c={anchorColor}>
          <Title order={2}>{t('title')}</Title>
        </Anchor>

        {crumbs.map((crumb) => (
          <Anchor key={crumb.path} component={Link} to={crumb.path} c={anchorColor}>
            <span style={{ fontWeight: 500, lineHeight: 1 }}>{crumb.name}</span>
          </Anchor>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default CatalogHeader;
