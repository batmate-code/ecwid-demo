import { ActionIcon, Button, Group, Text } from '@mantine/core';
import { useStore } from '@/store';
import { selectAddProduct } from '@/store/selectors';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconMinus, IconPlus } from '@tabler/icons-react';

interface AddToCartControlsProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  disabled?: boolean;
}

const AddToCartControl: FC<AddToCartControlsProps> = ({ id, name, price, disabled, imageUrl }) => {
  const { t } = useTranslation('common');
  const currentProductAmount = useStore(
    (store) => store.cart.products.find((product) => product.id === id)?.amount ?? 0,
  );
  const handleAddProduct = useStore(selectAddProduct);

  if (currentProductAmount <= 0) {
    return (
      <Button
        fullWidth
        disabled={disabled}
        onClick={() => handleAddProduct({ id, name, price, imageUrl, amount: 1 })}
      >
        {disabled ? t('addToCartButtonTextOutOfStock') : t('addToCartButtonText')}
      </Button>
    );
  }

  return (
    <Group gap="xs" justify="space-between" align="center">
      <ActionIcon
        variant="default"
        aria-label={t('decreaseProductButtonAriaLabel')}
        onClick={() => handleAddProduct({ id, name, price, imageUrl, amount: -1 })}
      >
        <IconMinus size={12} />
      </ActionIcon>

      <Text ta="center" fw={600} w={32}>
        {currentProductAmount}
      </Text>

      <ActionIcon
        variant="default"
        aria-label={t('increaseProductButtonAriaLabel')}
        onClick={() => handleAddProduct({ id, name, price, imageUrl, amount: 1 })}
      >
        <IconPlus size={12} />
      </ActionIcon>
    </Group>
  );
};

export default AddToCartControl;
