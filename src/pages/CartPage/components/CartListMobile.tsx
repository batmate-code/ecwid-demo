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
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store';
import { selectAddProduct, selectCartTotal, selectRemoveProduct } from '@/store/selectors';
import type { CartItem } from '@/store/slices/cart';
import { formatCurrency } from '@/utils/curencyFormatter';
import { useTranslation } from 'react-i18next';

interface CartListMobileProps {
  cartProducts: CartItem[];
  onCheckout(): void;
}

const CartListMobile: FC<CartListMobileProps> = ({ cartProducts, onCheckout }) => {
  const { t } = useTranslation('cart');
  const { t: tCommon } = useTranslation('common');

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
          <Card key={item.id} withBorder radius="md" p="sm">
            <Group align="flex-start" wrap="nowrap">
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

              <Box style={{ flex: 1 }}>
                <Text
                  component={Link}
                  to={`/product/${item.id}`}
                  fw={600}
                  c="inherit"
                  style={{ textDecoration: 'none' }}
                >
                  {item.name}
                </Text>

                <Group mt={8} gap="xs">
                  <ActionIcon
                    variant="light"
                    color="dark"
                    aria-label={tCommon('decreaseProductButtonAriaLabel')}
                    onClick={() =>
                      handleDecrease({
                        id: item.id,
                        name: item.name,
                        imageUrl: item.imageUrl,
                        price: item.price,
                      })
                    }
                  >
                    <IconMinus size={16} />
                  </ActionIcon>

                  <Text fw={700} w={28} ta="center">
                    {item.amount}
                  </Text>

                  <ActionIcon
                    variant="light"
                    color="dark"
                    aria-label={tCommon('increaseProductButtonAriaLabel')}
                    onClick={() =>
                      handleIncrease({
                        id: item.id,
                        name: item.name,
                        imageUrl: item.imageUrl,
                        price: item.price,
                      })
                    }
                  >
                    <IconPlus size={16} />
                  </ActionIcon>
                </Group>
              </Box>

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
          </Card>
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
