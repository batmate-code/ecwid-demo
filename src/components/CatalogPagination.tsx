import { Center, Pagination } from '@mantine/core';
import type { FC } from 'react';

interface CatalogPaginationProps {
  total: number;
  page: number;
  onChange: (next: number) => void;
}

const CatalogPagination: FC<CatalogPaginationProps> = ({ total, page, onChange }) => {
  if (total <= 1) return null;
  return (
    <Center mt="xs">
      <Pagination total={total} value={page} onChange={onChange} mt="xs" />
    </Center>
  );
};
export default CatalogPagination;
