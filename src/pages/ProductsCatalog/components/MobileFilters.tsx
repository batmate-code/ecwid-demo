import { Drawer, Button, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type MobileFiltersProps = {
  children: ReactNode;
};

export const MobileFilters: FC<MobileFiltersProps> = ({ children }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation('catalog');

  return (
    <>
      <Button
        onClick={open}
        fullWidth
        mt={'xs'}
        mb={'lg'}
        aria-label={t('filtersMobileButtonAriaLabel')}
      >
        {t('filtersMobileButtonText')}
      </Button>

      <Drawer opened={opened} onClose={close} position="left" size="md" padding="md">
        <Stack gap="md">{children}</Stack>
      </Drawer>
    </>
  );
};
