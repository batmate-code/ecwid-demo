import { Button, type ButtonProps } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import type { FC, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface BackButtonProps extends Omit<ButtonProps, 'variant'> {
  onClick: (e: SyntheticEvent) => void;
}
const BackButton: FC<BackButtonProps> = ({ onClick, ...rest }) => {
  const { t } = useTranslation('common');
  return (
    <Button
      variant="subtle"
      leftSection={<IconArrowLeft size={16} />}
      onClick={onClick}
      aria-label={t('backButtonAriaLabel')}
      {...rest}
    >
      {t('backButtonText')}
    </Button>
  );
};

export default BackButton;
