import type { FC } from 'react';
import type { CartItem } from '@/store/slices/cart';
import { useResponsive } from '@/hooks/useResponsive';
import CartTableDesktop from './CartTableDesktop';
import CartListMobile from './CartListMobile';

interface CartViewProps {
  cartProducts: CartItem[];
  onCheckout(): void;
}

const CartView: FC<CartViewProps> = ({ cartProducts, onCheckout }) => {
  const { isTablet, isMobile } = useResponsive();
  return isTablet || isMobile ? (
    <CartListMobile cartProducts={cartProducts} onCheckout={onCheckout} />
  ) : (
    <CartTableDesktop cartProducts={cartProducts} onCheckout={onCheckout} />
  );
};

export default CartView;
