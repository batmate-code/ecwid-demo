import { Theme } from '@/style/globalTypes';
import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const ICON_SIZE = 22;

const ThemeToggle: FC = () => {
  const { t } = useTranslation('common');

  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme(Theme.Light, { getInitialValueInEffect: true });
  const isLightTheme = computed === Theme.Light;
  const nextColorScheme = isLightTheme ? Theme.Dark : Theme.Light;
  const tooltipLabel = isLightTheme
    ? t('themeToggleTooltipLabelLight')
    : t('themeToggleTooltipLabelDark');

  return (
    <Tooltip label={tooltipLabel} withArrow>
      <ActionIcon
        variant="transparent"
        size="lg"
        aria-label={t('themeToggleAriaLabel')}
        onClick={() => setColorScheme(nextColorScheme)}
      >
        {isLightTheme ? <IconMoon size={ICON_SIZE} /> : <IconSun size={ICON_SIZE} />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeToggle;
