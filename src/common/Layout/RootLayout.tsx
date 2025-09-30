import { AppShell, Container, Group, Anchor, Title, Indicator, ActionIcon } from '@mantine/core';
import { NavLink, Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import { selectCartCount } from '@/store/selectors';
import { IconShoppingCart } from '@tabler/icons-react';
import type { FC } from 'react';
import { LanguageToggle, ThemeToggle } from '@/components';
import { useTranslation } from 'react-i18next';
import useGetOppositeColor from '@/hooks/useGetOppositeColor';

const RootLayout: FC = () => {
  const count = useStore(selectCartCount);
  const { t } = useTranslation('layout');
  const { textColor: anchorColor } = useGetOppositeColor();

  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between" align="center">
            <Anchor component={NavLink} to="/" underline="never" c={anchorColor}>
              <Title order={4} fw={700}>
                {t('appTitle')}
              </Title>
            </Anchor>
            <Group gap="sm" align="center">
              <ThemeToggle />
              <LanguageToggle />
              <Indicator
                position="top-end"
                label={count}
                size={15}
                offset={0}
                radius="lg"
                disabled={count === 0}
                color="red"
              >
                <ActionIcon
                  component={NavLink}
                  to="/cart"
                  aria-label={t('cartIconAreaLabel')}
                  size="lg"
                  radius="md"
                  variant="transparent"
                >
                  <IconShoppingCart />
                </ActionIcon>
              </Indicator>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py="md">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout;
