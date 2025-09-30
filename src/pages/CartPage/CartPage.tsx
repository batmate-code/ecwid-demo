import { useNavigate } from 'react-router-dom';
import { Badge, Button, Container, Flex } from '@mantine/core';
import { useStore } from '@/store';
import { selectCartCount, selectCartProducts, selectClearCart } from '@/store/selectors';
import { useState, type FC } from 'react';
import EmptyCartScreen from './components/EmptyCartScreen';
import { BackButton } from '@/components';
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

  const redirectBackToShop = () => {
    navigate('/');
    setCheckoutOpen(false);
    clearCart({ silent: true });
  };

  const handleClearCart = () => clearCart();

  return (
    <Container size="lg">
      <Flex justify="space-between" mb="md" wrap="wrap">
        <BackButton onClick={() => navigate(-1)} />
        <Flex gap="xs" justify="space-between" align="center">
          <Badge color="dark" variant="light">
            {t('itemsCount', { number: cartCount })}
          </Badge>
          <Button
            color="red"
            variant="light"
            onClick={handleClearCart}
            aria-label={t('clearCartButtonAriaLabel')}
          >
            {t('clearCartButtonText')}
          </Button>
        </Flex>
      </Flex>
      <CartView cartProducts={cartProducts} onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal
        opened={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartProducts={cartProducts}
        onBackToShop={redirectBackToShop}
      />
    </Container>
  );
};

export default CartPage;
