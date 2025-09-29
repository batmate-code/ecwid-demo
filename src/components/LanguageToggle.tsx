import { ActionIcon, Menu, Tooltip } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import i18n from '@/i18n/i18n';
import { useState, useEffect, type FC } from 'react';
import { useTranslation } from 'react-i18next';

type Lang = { code: string; label: string };

const LANGS: Lang[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

const LanguageToggle: FC = () => {
  const [_, setLng] = useState(i18n.language);
  const { t } = useTranslation('common');

  useEffect(() => {
    const handler = (l: string) => setLng(l);
    i18n.on('languageChanged', handler);
    return () => i18n.off('languageChanged', handler);
  }, []);

  return (
    <Menu withinPortal position="bottom-end">
      <Tooltip label={i18n.t('languageToggleAriaLabel')} withArrow>
        <Menu.Target>
          <ActionIcon
            aria-label={t('languageToggleAriaLabel')}
            variant="transparent"
            size="lg"
            radius="md"
          >
            <IconLanguage size={22} />
          </ActionIcon>
        </Menu.Target>
      </Tooltip>

      <Menu.Dropdown>
        {LANGS.map((language) => (
          <Menu.Item
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            rightSection={<small style={{ opacity: 0.6 }}>{language.code.toUpperCase()}</small>}
          >
            {language.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageToggle;
