import { Card, Flex, Title, Text, Button, type CardProps } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ResultCardProps extends CardProps {
  title?: string;
  text?: string;
  isError?: boolean;
  buttonConfig?: {
    label: string;
    redirectPath: string;
  };
}
const ResultCard: FC<ResultCardProps> = ({ title, text, isError, buttonConfig, ...rest }) => {
  const { t } = useTranslation('common');
  const resultTitle = title ?? t('resultCardDefaultTitle');
  const resultText = text ?? t('resultCardDefaultText');

  return (
    <Card withBorder {...rest}>
      <Flex direction="column" align={'center'} gap={'md'} ta="center">
        <Title order={2}>{resultTitle}</Title>
        <Text c={isError ? 'red' : 'dimmed'} ta="center">
          {resultText}
        </Text>
        {buttonConfig && (
          <Button component={Link} to={buttonConfig.redirectPath} aria-label={buttonConfig.label}>
            {buttonConfig.label}
          </Button>
        )}
      </Flex>
    </Card>
  );
};

export default ResultCard;
