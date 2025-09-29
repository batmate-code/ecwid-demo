import type { CartItem } from '@/store/slices/cart';
import { Group, ActionIcon, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CartItemControllerProps {
  item: CartItem;
  onIncrease(item: CartItem): void;
  onDecrease(item: CartItem): void;
}

const CartItemController: FC<CartItemControllerProps> = ({ item, onIncrease, onDecrease }) => {
  const { t: tCommon } = useTranslation();

  return (
    <Group gap={1} wrap="nowrap">
      <ActionIcon
        variant="light"
        color="dark"
        aria-label={tCommon('decreaseProductButtonAriaLabel')}
        onClick={() => onDecrease(item)}
      >
        <IconMinus size={16} />
      </ActionIcon>

      <Text fw={600} w={36} ta="center">
        {item.amount}
      </Text>

      <ActionIcon
        variant="light"
        color="dark"
        aria-label={tCommon('increaseProductButtonAriaLabel')}
        onClick={() => onIncrease(item)}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  );
};

export default CartItemController;
