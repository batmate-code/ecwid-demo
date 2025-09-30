import useGetOppositeColor from '@/hooks/useGetOppositeColor';
import { Drawer, Button, Stack } from '@mantine/core';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface MobileFiltersProps {
  children: ReactNode;
  opened: boolean;
  open(): void;
  close(): void;
}

export const MobileFilters: FC<MobileFiltersProps> = ({ children, open, close, opened }) => {
  const { t } = useTranslation('catalog');
  const { buttonVariant, textColor } = useGetOppositeColor();

  return (
    <>
      <Button
        onClick={open}
        fullWidth
        mt={'xs'}
        mb={'lg'}
        aria-label={t('filtersMobileButtonAriaLabel')}
        variant={buttonVariant}
        color={textColor}
      >
        {t('filtersMobileButtonText')}
      </Button>

      <Drawer opened={opened} onClose={close} position="left" size="md" padding="md">
        <Stack gap="md">{children}</Stack>
      </Drawer>
    </>
  );
};
