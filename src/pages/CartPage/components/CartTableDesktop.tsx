import useGetOppositeColor from '@/hooks/useGetOppositeColor';
import { useStore } from '@/store';
import { selectAddProduct, selectCartTotal, selectRemoveProduct } from '@/store/selectors';
import type { CartItem } from '@/store/slices/cart';
import { formatCurrency } from '@/utils';
import {
  Card,
  Table,
  Group,
  Box,
  Anchor,
  ActionIcon,
  Divider,
  Flex,
  Button,
  Text,
  Image as MantineImage,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CartItemController from './CartItemController';

interface CartTableProps {
  cartProducts: CartItem[];
  onCheckout(): void;
}

const CartTableDesktop: FC<CartTableProps> = ({ cartProducts, onCheckout }) => {
  const { t } = useTranslation('cart');
  const { textColor: anchorColor } = useGetOppositeColor();

  const addProduct = useStore(selectAddProduct);
  const removeProduct = useStore(selectRemoveProduct);
  const cartTotal = useStore(selectCartTotal);

  const handleDecrease = (item: CartItem): void => {
    addProduct({ ...item, amount: -1 });
  };

  const handleIncrease = (item: CartItem): void => {
    addProduct({ ...item, amount: +1 });
  };

  const handleRemove = (id: number): void => {
    removeProduct(id);
  };

  return (
    <Card withBorder radius="md" padding="md">
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: '50%' }}>{t('cartTableProduct')}</Table.Th>
            <Table.Th style={{ width: 120, textAlign: 'center' }}>
              {t('cartTableQuantity')}
            </Table.Th>
            <Table.Th style={{ width: 120, textAlign: 'right' }}>{t('cartTablePrice')}</Table.Th>
            <Table.Th style={{ width: 120, textAlign: 'right' }}>{t('cartTableSubtotal')}</Table.Th>
            <Table.Th style={{ width: 64 }} />
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {cartProducts.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                <Group wrap="nowrap">
                  {item.imageUrl ? (
                    <MantineImage
                      src={item.imageUrl}
                      alt={item.name}
                      w={40}
                      h={40}
                      fit="cover"
                      radius="sm"
                    />
                  ) : (
                    <Box w={40} h={40} style={{ borderRadius: 6, background: '#f1f3f5' }} />
                  )}
                  <Anchor underline="hover" to={`/product/${item.id}`} component={Link}>
                    <Text c={anchorColor}>{item.name}</Text>
                  </Anchor>
                </Group>
              </Table.Td>

              <Table.Td>
                <CartItemController
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              </Table.Td>

              <Table.Td ta="right">{formatCurrency(item.price)}</Table.Td>
              <Table.Td ta="right">{formatCurrency(item.price * item.amount)}</Table.Td>

              <Table.Td>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  aria-label={t('removeProductAriaLabel')}
                  onClick={() => handleRemove(item.id)}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Divider my="md" />

      <Flex justify="flex-end" align="center" gap="lg">
        <Text fz="lg">
          {t('cartTableTotal')}{' '}
          <Text span fw={700}>
            {formatCurrency(cartTotal)}
          </Text>
        </Text>
        <Button
          size="md"
          disabled={cartProducts.length === 0}
          aria-label={t('clearCheckoutButtonAriaLabel')}
          onClick={onCheckout}
        >
          {t('clearCheckoutButtonText')}
        </Button>
      </Flex>
    </Card>
  );
};

export default CartTableDesktop;
