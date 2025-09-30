import { Container } from '@mantine/core';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/components';
import { useTranslation } from 'react-i18next';
import { ResultCard } from '@/components';

const EmptyCartScreen: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('cart');
  return (
    <Container size="lg">
      <BackButton onClick={() => navigate(-1)} mb="sm" />
      <ResultCard
        title={t('emptyCartMessageTitle')}
        text={t('emptyCartMessageDescription')}
        buttonConfig={{ label: t('emptyCartButtonText'), redirectPath: '/' }}
      />
    </Container>
  );
};
export default EmptyCartScreen;
