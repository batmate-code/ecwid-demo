import type { FC } from 'react';
import {
  Card,
  Group,
  Box,
  Text,
  Image as MantineImage,
  ActionIcon,
  Stack,
  Divider,
  Button,
  Flex,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { selectAddProduct, selectCartTotal, selectRemoveProduct } from '@/store/selectors';
import type { CartItem } from '@/store/slices/cart';
import { formatCurrency } from '@/utils/curencyFormatter';
import { useTranslation } from 'react-i18next';
import CartItemController from './CartItemController';

interface CartListMobileProps {
  cartProducts: CartItem[];
  onCheckout(): void;
}

const CartListMobile: FC<CartListMobileProps> = ({ cartProducts, onCheckout }) => {
  const { t } = useTranslation('cart');
  const addProduct = useStore(selectAddProduct);
  const removeProduct = useStore(selectRemoveProduct);
  const cartTotal = useStore(selectCartTotal);

  const handleDecrease = (item: Omit<CartItem, 'amount'>): void => {
    addProduct({ ...item, amount: -1 });
  };

  const handleIncrease = (item: Omit<CartItem, 'amount'>): void => {
    addProduct({ ...item, amount: +1 });
  };

  const handleRemove = (id: number): void => {
    removeProduct(id);
  };

  return (
    <Card withBorder radius="md" p="md">
      <Stack gap="sm">
        {cartProducts.map((item) => (
          <Group align="flex-start" justify="space-between" wrap="nowrap" key={item.id}>
            {item.imageUrl ? (
              <MantineImage
                src={item.imageUrl}
                alt={item.name}
                w={64}
                h={64}
                fit="cover"
                radius="sm"
              />
            ) : (
              <Box w={64} h={64} style={{ borderRadius: 8, background: '#f1f3f5' }} />
            )}

            <Stack gap={'xs'}>
              <Text
                component={Link}
                to={`/product/${item.id}`}
                fw={600}
                c="inherit"
                style={{ textDecoration: 'none' }}
                lineClamp={1}
              >
                {item.name}
              </Text>

              <CartItemController
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            </Stack>

            <Stack gap={6} align="flex-end">
              <Text fw={600}>{formatCurrency(item.price)}</Text>
              <Text c="dimmed" fz="sm">
                {formatCurrency(item.price * item.amount)}
              </Text>

              <ActionIcon
                mt={4}
                variant="subtle"
                color="red"
                aria-label={t('removeProductAriaLabel')}
                onClick={() => handleRemove(item.id)}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Stack>
          </Group>
        ))}
      </Stack>

      <Divider my="md" />

      <Stack gap="sm">
        <Flex justify="space-between" align="center">
          <Text fz="lg">
            {t('cartTableTotal')}{' '}
            <Text span fw={700}>
              {formatCurrency(cartTotal)}
            </Text>
          </Text>
        </Flex>

        <Button
          size="md"
          fullWidth
          disabled={cartProducts.length === 0}
          aria-label={t('clearCheckoutButtonAriaLabel')}
          onClick={onCheckout}
        >
          {t('clearCheckoutButtonText')}
        </Button>
      </Stack>
    </Card>
  );
};

export default CartListMobile;
