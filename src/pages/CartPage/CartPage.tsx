import { useNavigate } from 'react-router-dom';
import { Badge, Button, Container, Group } from '@mantine/core';
import { useStore } from '@/store';
import { selectCartCount, selectCartProducts, selectClearCart } from '@/store/selectors';
import { useState, type FC } from 'react';
import EmptyCartScreen from './components/EmptyCartScreen';
import BackButton from '@/components/BackButton';
import { useTranslation } from 'react-i18next';
import CartView from './components/CartView';
import CheckoutModal from './components/CheckoutModal';

const CartPage: FC = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation('cart');

  const clearCart = useStore(selectClearCart);
  const cartCount = useStore(selectCartCount);
  const cartProducts = useStore(selectCartProducts);

  if (cartProducts.length === 0) {
    return <EmptyCartScreen />;
  }

  const handleBackToShop = () => {
    navigate('/');
    setCheckoutOpen(false);
    clearCart();
  };

  return (
    <Container size="lg">
      <Group justify="space-between" mb="md">
        <BackButton onClick={() => navigate(-1)} />
        <Group gap="xs">
          <Badge color="dark" variant="light">
            {t('itemsCount', { number: cartCount })}
          </Badge>
          <Button
            color="red"
            variant="light"
            onClick={() => clearCart()}
            aria-label={t('clearCartButtonAriaLabel')}
          >
            {t('clearCartButtonText')}
          </Button>
        </Group>
      </Group>
      <CartView cartProducts={cartProducts} onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal
        opened={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartProducts={cartProducts}
        onBackToShop={handleBackToShop}
      />
    </Container>
  );
};

export default CartPage;
